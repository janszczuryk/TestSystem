<script setup lang="ts">
import {onMounted, ref, watch} from "vue";
import {useRouter} from "vue-router";
import Breadcrumbs from "@/components/Breadcrumbs.vue";
import {useAccount} from "@/composables/account";
import {TestInstanceStatus} from "@/types/test-instance";
import {getTestInstanceStatusName} from "@/utils/test-instance";
import {getLocalizedDate} from "@/utils/date";
import {useApiClient, useResponse} from "@/utils/api";
import {TestInstance} from "@/types/learner/test-instance";
import {Subject} from "@/types/learner/subject";

const breadcrumbs = [
  {title: 'Test System', disabled: true, href: '/'},
  {title: 'Testy', disabled: false, href: '/tests'},
];

const api = useApiClient();
const router = useRouter();
const {account, isLoggedAccount, isAccountLearner} = useAccount();

const subjects = ref<Subject[]>([]);
const expandedSubjects = ref<number[]>([]);

const canJoinInstance = (instanceStatus: TestInstanceStatus) => [TestInstanceStatus.CREATED, TestInstanceStatus.STARTED].includes(instanceStatus);

const redirectIfNotLearner = () => {
  if (!isLoggedAccount() || !isAccountLearner) {
    router.push('/');
  }
};

const fetchSubjects = async () => {
  const auth = { token: account.value!.jwtToken };
  const response = await api.get('learner/instances', {auth});
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

watch(subjects, (value) => {
  expandedSubjects.value = value.map((_, index) => index);
})

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
                  <v-row>
                    <v-col cols="4">
                      <v-text-field type="number" density="compact" variant="outlined" label="Numer uczestnika"/>
                    </v-col>
                    <v-col cols="8">
                      <v-btn variant="elevated" color="primary" block>Dołącz do testu</v-btn>
                    </v-col>
                  </v-row>
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
