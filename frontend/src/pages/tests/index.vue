<script setup lang="ts">
import { onMounted, ref, watch } from "vue";
import { useRouter } from "vue-router";
import Breadcrumbs from "@/components/Breadcrumbs.vue";
import { useAccount } from "@/composables/account";
import { TestInstanceStatus } from "@/types/test-instance";
import { ApiClientHttpStatusError, useApiClient, useResponse } from "@/utils/api";
import { TestInstance } from "@/types/learner/test-instance";
import { Subject } from "@/types/learner/subject";
import { rules } from "@/utils/form-validation";
import { TestInstanceLearnerStatus } from "@/types/test-instance-learner";
import { getLocalizedDate } from "@/utils/date";
import { getTestInstanceStatusName } from "@/utils/test-instance";

const breadcrumbs = [
  { title: 'Test System', href: '/', disabled: true },
  { title: 'Testy', href: '/tests', disabled: false },
];

const api = useApiClient();
const router = useRouter();
const { account, isLoggedAccount, isAccountLearner } = useAccount();

const subjects = ref<Subject[]>([]);
const expandedSubjects = ref<number[]>([]);
const isJoinFormValid = ref(false);
const inputLearnerNumber = ref('');
const inputLearnerNumberError = ref('');

const canJoinInstance = (instanceStatus: TestInstanceStatus) => [ TestInstanceStatus.CREATED, TestInstanceStatus.STARTED ].includes(instanceStatus);

const redirectIfNotLearner = () => {
  if (!isLoggedAccount() || !isAccountLearner) {
    router.push('/');
  }
};

const fetchSubjects = async () => {
  const auth = { token: account.value!.jwtToken };
  const response = await api.get('learner/instances', { auth });
  const testInstances = await useResponse<TestInstance[]>(response);

  subjects.value = mapTestInstancesToSubjects(testInstances);
};

const mapTestInstancesToSubjects = (testInstances: TestInstance[]): Subject[] => {
  const subjectsMap = new Map<string, Subject>();

  for (const testInstance of testInstances) {
    const instance = {
      id: testInstance.id,
      status: testInstance.status,
      schemaName: testInstance.schema.name,
      startedAt: testInstance.startedAt ? new Date(testInstance.startedAt) : null,
      endedAt: testInstance.endedAt ? new Date(testInstance.endedAt) : null,
    };

    if (!subjectsMap.has(testInstance.subject.id)) {
      subjectsMap.set(testInstance.subject.id, {
        id: testInstance.subject.id,
        questionsCount: testInstance.questionsCount,
        subjectName: testInstance.subject.name,
        fieldOfStudy: testInstance.subject.fieldOfStudy,
        instances: [ instance ],
      });
    } else {
      const subject = subjectsMap.get(testInstance.subject.id)!;
      subject.instances.push(instance);
      subjectsMap.set(testInstance.subject.id, subject);
    }
  }

  return Array.from(subjectsMap.values());
};

const onJoinFormSubmit = async (instanceId: string) => {
  const testInstance = await getTestInstance(instanceId);

  // FIXME: This should be checked when fetchSubjects happens
  //        However, backend does not handle learner property
  //        on an instance list.
  if (testInstance.learner) {
    let redirectPath: string;

    switch (testInstance.learner.status) {
      case TestInstanceLearnerStatus.JOINED:
        redirectPath = `/tests/${ instanceId }`;
        break;
      case TestInstanceLearnerStatus.STARTED:
        redirectPath = `/tests/${ instanceId }/attempt`;
        break;
      case TestInstanceLearnerStatus.FINISHED:
        redirectPath = `/tests/${ instanceId }/results`;
        break;
    }

    await router.push(redirectPath);
    return;
  }

  await joinTestInstance(instanceId);
};

const getTestInstance = async (instanceId: string) => {
  const url = `learner/instances/${ instanceId }`;
  const auth = { token: account.value!.jwtToken };

  const response = await api.get(url, { auth });
  return await useResponse<TestInstance>(response);
}

const joinTestInstance = async (instanceId: string) => {
  const url = `learner/instances/${ instanceId }/join`;
  const auth = { token: account.value!.jwtToken };
  const body = { learnerNumber: parseInt(inputLearnerNumber.value) };

  try {
    await api.post(url, { auth, body });
  } catch (error) {
    if (error instanceof ApiClientHttpStatusError) {
      if (error.statusCode === 409) {
        inputLearnerNumberError.value = 'Numer uczestnika jest już zajęty';
        return;
      }
    }

    throw error;
  }

  await router.push(`/tests/${ instanceId }`);
}

watch(subjects, (value) => {
  expandedSubjects.value = value.map((_, index) => index);
});
watch(inputLearnerNumber, () => {
  inputLearnerNumberError.value = '';
});

onMounted(() => {
  redirectIfNotLearner();
  fetchSubjects();
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
            <h1 class="text-h5 font-weight-bold text-center">Lista dostępnych testów</h1>
          </template>
        </v-card>
      </v-col>
    </v-row>
    <v-row justify="center">
      <v-col>
        <v-expansion-panels multiple v-model="expandedSubjects" class="mx-auto">
          <v-expansion-panel
            v-for="(subject, subjectIndex) in subjects"
            :key="subjectIndex"
          >
            <v-expansion-panel-title>
              <h2 class="text-h6">{{ subject.subjectName }}</h2>
              <p class="text-subtitle-1 ml-3">({{ subject.fieldOfStudy }})</p>
            </v-expansion-panel-title>
            <v-expansion-panel-text>
              <v-card
                v-for="(instance, instanceIndex) in subject.instances"
                :key="instanceIndex"
                class="mx-auto my-4 py-4"
              >
                <v-card-item>
                  <v-card-title>{{ instance.schemaName }}</v-card-title>
                  <v-card-subtitle>Test z przedmiotu: {{ subject.subjectName }}</v-card-subtitle>
                </v-card-item>

                <v-card-text>
                  <v-container class="pa-0 mt-4">
                    <v-row>
                      <v-col>
                        <p class="text-grey-darken-1">
                          <v-icon icon="mdi-information"/>
                          Status: {{ getTestInstanceStatusName(instance.status as TestInstanceStatus) }}
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
                  </v-container>
                </v-card-text>

                <v-container v-if="canJoinInstance(instance.status as TestInstanceStatus)">
                  <v-form v-model="isJoinFormValid" @submit.prevent="onJoinFormSubmit(instance.id)">
                    <v-row>
                      <v-col cols="4">
                        <v-text-field
                          v-model="inputLearnerNumber"
                          type="number"
                          density="compact"
                          variant="outlined"
                          label="Numer uczestnika"
                          :rules="[rules.required, rules.isInteger, rules.learnerNumber]"
                          :error-messages="inputLearnerNumberError"
                        />
                      </v-col>
                      <v-col cols="8">
                        <v-btn
                          type="submit"
                          variant="elevated"
                          color="primary"
                          block
                          :disabled="!isJoinFormValid"
                        >Dołącz do testu
                        </v-btn>
                      </v-col>
                    </v-row>
                  </v-form>
                </v-container>
              </v-card>
            </v-expansion-panel-text>
          </v-expansion-panel>
        </v-expansion-panels>
      </v-col>
    </v-row>
  </v-container>
</template>

<style scoped>
.v-expansion-panels {
  max-width: 960px;
}
</style>
