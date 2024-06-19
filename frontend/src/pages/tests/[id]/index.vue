<script setup lang="ts">
import { onMounted, ref } from "vue";
import { useRoute, useRouter } from "vue-router";
import Breadcrumbs, { BreadcrumbItem } from "@/components/Breadcrumbs.vue";
import { TestInstance } from "@/types/learner/test-instance";
import { useAccount } from "@/composables/account";
import { useApiClient, useResponse } from "@/utils/api";
import { TestInstanceStatus } from "@/types/test-instance";
import { TestInstanceLearnerStatus } from "@/types/test-instance-learner";
import { getTestInstanceStatusName } from "@/utils/test-instance";
import { getLocalizedDate } from "@/utils/date";

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

const getTestInstance = async (instanceId: string) => {
  const url = `learner/instances/${ instanceId }`;
  const auth = { token: account.value!.jwtToken };

  const response = await api.get(url, { auth });
  return await useResponse<TestInstance>(response);
};

const breadcrumbs = ref<BreadcrumbItem[]>([
  { title: 'Test System', href: '/', disabled: true },
  { title: 'Testy', href: '/tests', disabled: false },
]);

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
      return false;
    case TestInstanceLearnerStatus.STARTED:
      await router.push(`/tests/${ testInstance.id }/attempt`);
      return true;
    case TestInstanceLearnerStatus.FINISHED:
      await router.push(`/tests/${ testInstance.id }/results`);
      return true;
  }
}

const onStartAttemptClick = async (instanceId: string) => {
  const url = `learner/instances/${ instanceId }/start`;
  const auth = { token: account.value!.jwtToken };

  await api.post(url, { auth });

  await router.push(`/tests/${ instanceId }/attempt`);
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
    href: `/tests/${ instanceId }`,
    disabled: false,
  });
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
            <h1 class="text-h5 font-weight-bold text-center">Test: {{ instance?.schema.name }}</h1>
          </template>
        </v-card>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12">
        <v-card class="mx-auto my-4 py-4" max-width="960">
          <v-card-item>
            <v-card-title>Przystąpienie do testu</v-card-title>
            <v-card-subtitle>
              Aby przystąpić do testu, naciśnij przycisk <span class="font-weight-bold">rozpocznij podejście</span>.
            </v-card-subtitle>
          </v-card-item>

          <v-card-text>
            <v-container class="pa-0 mt-4">
              <v-row>
                <v-col>
                  <p class="text-grey-darken-1">
                    <v-icon icon="mdi-school"/>
                    Nazwa testu: {{ instance?.schema.name }}
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
                    <v-icon icon="mdi-information"/>
                    Status: {{ getTestInstanceStatusName(instance.status) }}
                  </p>
                </v-col>
                <v-col>
                  <p class="text-grey-darken-1">
                    <v-icon icon="mdi-clock-time-three"/>
                    Rozpoczęto: {{ getLocalizedDate(instance.startedAt) }}
                  </p>
                </v-col>
                <v-col>
                  <p class="text-grey-darken-1">
                    <v-icon icon="mdi-clock-time-eight"/>
                    Zakończono: {{ getLocalizedDate(instance.endedAt) }}
                  </p>
                </v-col>
              </v-row>
              <v-row>
                <v-col>
                  <p class="text-grey-darken-1">
                    <v-icon icon="mdi-help-box"/>
                    Ilość pytań: {{ instance.questionsCount }}
                  </p>
                </v-col>
              </v-row>
              <v-row>
                <v-col>
                  <p class="text-grey-darken-1">
                    <v-icon icon="mdi-human-male-board"/>
                    Prowadzący: {{ instance.teacher.email }}
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
            </v-container>
          </v-card-text>

          <v-container>
            <v-row>
              <v-col>
                <v-btn
                  variant="elevated"
                  color="primary"
                  block
                  @click="onStartAttemptClick(instance.id)"
                >Rozpocznij podejście</v-btn>
              </v-col>
            </v-row>
          </v-container>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<style scoped>

</style>
