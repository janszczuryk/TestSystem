<script setup lang="ts">
import Breadcrumbs, { BreadcrumbItem } from "@/components/Breadcrumbs.vue";
import { useApiClient, useResponse } from "@/utils/api";
import { useRoute, useRouter } from "vue-router";
import { useAccount } from "@/composables/account";
import { onMounted, ref } from "vue";
import { TestInstance } from "@/types/learner/test-instance";
import { TestInstanceStatus } from "@/types/test-instance";
import { TestInstanceLearnerResultSummary, TestInstanceLearnerStatus } from "@/types/test-instance-learner";

const api = useApiClient();
const route = useRoute();
const router = useRouter();
const { account, isLoggedAccount, isAccountLearner } = useAccount();

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
const resultSummary = ref<TestInstanceLearnerResultSummary>({
  pointsToAchieve: 0,
  pointsAchieved: 0,
  percentage: 0,
});

const breadcrumbs = ref<BreadcrumbItem[]>([
  { title: 'Test System', href: '/', disabled: true },
  { title: 'Testy', href: '/tests', disabled: false },
]);

const getTestInstance = async (instanceId: string) => {
  const url = `learner/instances/${ instanceId }`;
  const auth = { token: account.value!.jwtToken };

  const response = await api.get(url, { auth });
  return await useResponse<TestInstance>(response);
};

const getTestInstanceResultSummary = async (instanceId: string) => {
  const url = `learner/instances/${ instanceId }/results`;
  const auth = { token: account.value!.jwtToken };

  const response = await api.get(url, { auth });
  return await useResponse<TestInstanceLearnerResultSummary>(response);
}

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
      await router.push(`/tests/${ testInstance.id }/attempt`);
      return true;
    case TestInstanceLearnerStatus.FINISHED:
      return false;
  }
}

const onBackButtonClick = async () => {
  await router.push('/tests');
}

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
    href: `/tests/${ instanceId }/results`,
    disabled: false,
  });

  resultSummary.value = await getTestInstanceResultSummary(instanceId);
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
            <h1 class="text-h5 font-weight-bold text-center">Test: {{ instance.schema.name }}</h1>
          </template>
        </v-card>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12">
        <v-card class="mx-auto my-4 py-4" max-width="960">
          <v-card-item>
            <v-card-title>Wyniki testu</v-card-title>
            <v-card-subtitle>Test został zakończony &mdash; poniżej zaprezentowano wyniki.</v-card-subtitle>
          </v-card-item>

          <v-card-text>
            <v-container class="pa-0 mt-4">
              <v-row>
                <v-col>
                  <p class="text-grey-darken-1">
                    <v-icon icon="mdi-school"/>
                    Nazwa testu: {{ instance.schema.name }}
                  </p>
                </v-col>
              </v-row>
              <v-row>
                <v-col>
                  <p class="text-grey-darken-1">
                    <v-icon icon="mdi-table-account"/>
                    Przedmiot: {{ instance?.subject.name }} ({{ instance?.subject.fieldOfStudy }})
                  </p>
                </v-col>
              </v-row>
              <v-row>
                <v-col>
                  <p class="text-grey-darken-1">
                    <v-icon icon="mdi-account"/>
                    Uczestnik: {{ account?.email }} (Nr: {{ instance?.learner?.learnerNumber }})
                  </p>
                </v-col>
              </v-row>
              <v-row>
                <v-col>
                  <p class="text-grey-darken-1">
                    <v-icon icon="mdi-help-box"/>
                    Wszystkie pytania: {{ resultSummary.pointsToAchieve }}
                  </p>
                </v-col>
                <v-col>
                  <p class="text-grey-darken-1">
                    <v-icon icon="mdi-checkbox-marked"/>
                    Poprawne odpowiedzi: {{ resultSummary.pointsAchieved }}
                  </p>
                </v-col>
                <v-col>
                  <p class="text-grey-darken-1">
                    <v-icon icon="mdi-percent-outline"/>
                    Wynik procentowy: {{ resultSummary.percentage }}%
                  </p>
                </v-col>
              </v-row>
            </v-container>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12">
        <v-card class="mx-auto py-4" max-width="960">
          <v-card-item>
            <v-btn
              type="submit"
              variant="elevated"
              color="primary"
              block
              @click="onBackButtonClick"
            >Powrót
            </v-btn>
          </v-card-item>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<style scoped>

</style>
