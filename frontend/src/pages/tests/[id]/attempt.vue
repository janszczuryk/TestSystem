<script setup lang="ts">
import { onMounted, ref } from "vue";
import { useRoute, useRouter } from "vue-router";
import Breadcrumbs, { BreadcrumbItem } from "@/components/Breadcrumbs.vue";
import { useAccount } from "@/composables/account";
import { TestInstance } from "@/types/learner/test-instance";
import { TestInstanceStatus } from "@/types/test-instance";
import { TestInstanceLearnerStatus } from "@/types/test-instance-learner";
import { TestInstanceLearnerAnswer } from "@/types/learner/test-instance-learner-answer";
import { TestInstanceLearnerAnswerStatus } from "@/types/test-instance-learner-answer";
import { ApiClientHttpStatusError, useApiClient, useResponse } from "@/utils/api";
import { getAnswerLetter } from "@/utils/test-instance-question";

const api = useApiClient();
const route = useRoute();
const router = useRouter();
const { account, isLoggedAccount, isAccountLearner } = useAccount();

/**
 *  DATA
 */

const instanceId = String(route.params.id);
const instance = ref<TestInstance>({
  id: '',
  questionsCount: 0,
  isEnabled: false,
  status: TestInstanceStatus.CREATED,
  schema: {
    id: '',
    name: ''
  },
  subject: {
    id: '',
    name: '',
    fieldOfStudy: '',
  },
  learner: null,
  teacher: {
    id: '',
    email: '',
    isVerified: true,
  },
  endedAt: null,
  startedAt: null,
  createdAt: '',
  updatedAt: ''
});
const attemptIsEnded = ref(false);
const attemptTimeIsOver = ref(false);
const isAnswerFormValid = ref(false);
const inputChosenAnswer = ref('');

const breadcrumbs = ref<BreadcrumbItem[]>([
  { title: 'Test System', href: '/', disabled: true },
  { title: 'Testy', href: '/tests', disabled: false },
]);

const currentQuestion = ref<TestInstanceLearnerAnswer>({
  id: '',
  instanceId: '',
  learnerId: '',
  question: {
    id: '',
    question: '—',
    answers: [ '', '', '', '' ],
  },
  questionNumber: 1,
  status: TestInstanceLearnerAnswerStatus.SHOWN,
  submittedAnswerIndex: null,
  shownAt: null,
  answerSubmittedAt: null,
  updatedAt: '',
  createdAt: '',
});

/**
 *  RULES
 */

const checkboxRule = (value?: number | string) => {
  if (typeof value === 'string' && value === '') {
    return '';
  }

  return typeof value === 'number' || 'Proszę zaznaczyć odpowiedź';
};

/**
 *  API REQUESTS
 */

const getTestInstance = async (instanceId: string) => {
  const url = `learner/instances/${ instanceId }`;
  const auth = { token: account.value!.jwtToken };

  const response = await api.get(url, { auth });
  return await useResponse<TestInstance>(response);
};

// 409 -> Test has ended
// 422 -> All answers has been answered
const getCurrentQuestion = async (instanceId: string) => {
  const url = `learner/instances/${ instanceId }/question`;
  const auth = { token: account.value!.jwtToken };

  const response = await api.get(url, { auth });
  return await useResponse<TestInstanceLearnerAnswer>(response);
};

// 409 -> Test has ended
const answerCurrentQuestion = async (instanceId: string, answerIndex: number) => {
  const url = `learner/instances/${ instanceId }/answer`;
  const auth = { token: account.value!.jwtToken };
  const body = { answerIndex };

  const response = await api.post(url, { auth, body });
  return response.status === 204;
};

/**
 *  REDIRECTS
 */

const redirectIfNotLearner = () => {
  if (!isLoggedAccount() || !isAccountLearner) {
    router.push('/');
    return true;
  }
  return false;
};

const redirectBasedOnInstance = async (testInstance: TestInstance) => {
  if (!testInstance.learner) {
    await router.push('/tests');
    return true;
  }

  switch (testInstance.learner.status) {
    case TestInstanceLearnerStatus.JOINED:
      await router.push(`/tests/${ testInstance.id }`);
      return true;
    case TestInstanceLearnerStatus.STARTED:
      return false;
    case TestInstanceLearnerStatus.FINISHED:
      await router.push(`/tests/${ testInstance.id }/results`);
      return true;
  }
}

/**
 *  LOGIC
 */

const refreshCurrentQuestion = async (instanceId: string) => {
  try {
    currentQuestion.value = await getCurrentQuestion(instanceId);
  } catch (error) {
    if (error instanceof ApiClientHttpStatusError) {
      if (error.statusCode === 409) {
        attemptIsEnded.value = true;
        attemptTimeIsOver.value = true;
        return;
      } else if (error.statusCode === 422) {
        attemptIsEnded.value = true;
        attemptTimeIsOver.value = false;
        return;
      }
    }

    throw error;
  }
};

/**
 *  DOM Event handlers
 */

const onTimeIsOverClick = async (instanceId: string) => {
  await router.push(`/tests/${ instanceId }/results`);
}

const onFinishAttemptClick = async (instanceId: string) => {
  const url = `learner/instances/${ instanceId }/finish`;
  const auth = { token: account.value!.jwtToken };

  await api.post(url, { auth });

  await router.push(`/tests/${ instanceId }/results`);
}

const onFormAnswerSubmit = async (instanceId: string) => {
  try {
    const answerIndex = parseInt(inputChosenAnswer.value, 10);

    await answerCurrentQuestion(instanceId, answerIndex);
  } catch (error) {
    if (error instanceof ApiClientHttpStatusError) {
      if (error.statusCode === 409) {
        attemptIsEnded.value = true;
        attemptTimeIsOver.value = true;
        return;
      }
    }

    throw error;
  }

  await refreshCurrentQuestion(instanceId);

  inputChosenAnswer.value = '';
};

/**
 *  HOOKS
 */

onMounted(async () => {
  let redirected = redirectIfNotLearner();
  if (redirected) {
    return;
  }

  instance.value = await getTestInstance(instanceId);

  redirected = await redirectBasedOnInstance(instance.value);
  if (redirected) {
    return;
  }

  breadcrumbs.value.push({
    title: instance.value.schema.name,
    href: `/tests/${ instanceId }/attempt`,
    disabled: false,
  });

  await refreshCurrentQuestion(instanceId);
});
</script>

<template>
  <v-container>
    <v-row>
      <v-col cols="12">
        <Breadcrumbs :breadcrumbs="breadcrumbs"/>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12">
        <v-card class="mx-auto py-4" color="accent3" max-width="960">
          <template #title>
            <h1 class="text-h5 font-weight-bold text-center">Test: {{ instance.schema.name }} </h1>
            <p class="text-subtitle-1 text-center">Przystąpiono do rozwiązywania testu.</p>
          </template>
          <template #append>
            <v-btn
              icon="mdi-close"
              density="comfortable"
              title="Zakończ podejście"
              @click="onFinishAttemptClick(instanceId)"
            ></v-btn>
          </template>
        </v-card>
      </v-col>
    </v-row>
    <v-row v-if="!attemptIsEnded">
      <v-col cols="12">
        <v-form v-model="isAnswerFormValid" @submit.prevent="onFormAnswerSubmit(instanceId)">
          <v-card class="mx-auto my-4 py-4" max-width="960">
            <v-card-item>
              <v-card-title>{{ currentQuestion.questionNumber }}. {{ currentQuestion.question.question }}</v-card-title>
            </v-card-item>
            <v-card-text class="py-0">
              <v-radio-group class="pl-10" v-model="inputChosenAnswer" :rules="[checkboxRule]">
                <v-radio
                  v-for="(answer, answerIndex) in currentQuestion.question.answers"
                  :key="answerIndex"
                  :value="answerIndex"
                >
                  <template #label>{{ getAnswerLetter(answerIndex) }}) {{ answer }}</template>
                </v-radio>
              </v-radio-group>
            </v-card-text>
            <v-card-actions>
              <v-btn
                type="submit"
                variant="elevated"
                color="primary"
                block
                :disabled="!isAnswerFormValid"
              >Potwierdź odpowiedź
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-form>
      </v-col>
    </v-row>
    <v-row v-else>
      <v-col col="12">

        <v-card v-if="attemptTimeIsOver" class="mx-auto py-4" max-width="960" color="orange-lighten-4" border>
          <v-card-item>
            <v-card-title class="text-center">
              Dziękujemy! Niestety, czas na przesyłanie odpowiedzi się skończył!
            </v-card-title>
          </v-card-item>
          <v-card-actions>
            <v-btn
              variant="elevated"
              color="primary"
              block
              @click="onTimeIsOverClick(instanceId)"
            >Zakończ podejście
            </v-btn>
          </v-card-actions>
        </v-card>

        <v-card v-else class="mx-auto py-4" max-width="960" color="green-lighten-4" border>
          <v-card-item>
            <v-card-title class="text-center">
              Dziękujemy! Odpowiedziałeś(aś) na wszystkie pytania!
            </v-card-title>
          </v-card-item>
          <v-card-actions>
            <v-btn
              variant="elevated"
              color="primary"
              block
              @click="onFinishAttemptClick(instanceId)"
            >Zakończ podejście
            </v-btn>
          </v-card-actions>
        </v-card>

      </v-col>
    </v-row>
  </v-container>
</template>

<style scoped>

</style>
