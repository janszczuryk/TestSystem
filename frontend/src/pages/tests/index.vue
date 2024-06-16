<script setup lang="ts">
import {ref} from "vue";
import Breadcrumbs from "@/components/Breadcrumbs.vue";
import {TestInstanceStatus} from "@/types/test-instance";
import {getTestInstanceStatusName} from "@/utils/test-instance";
import {getLocalizedDate} from "@/utils/date";

const breadcrumbs = [
  {
    title: 'Test System',
    disabled: true,
    href: '/',
  },
  {
    title: 'Testy',
    disabled: false,
    href: '/tests',
  },
];

const subjects = [
  {
    subjectName: 'Sieci komputerowe 1',
    fieldOfStudy: '2 EF-DI',
    instances: [
      {
        id: '123-123-123-123',
        status: 'created',
        schemaName: 'Kolokwium nr 1',
        startedAt: null,
        endedAt: null,
      }
    ]
  },
  {
    subjectName: 'Sieci komputerowe 2',
    fieldOfStudy: '3 EF-DI',
    instances: [
      {
        id: '123-123-123-123',
        status: 'ended',
        schemaName: 'Kolokwium nr 1',
        startedAt: new Date(),
        endedAt: new Date(),
      }
    ]
  },
  {
    subjectName: 'ELiAK',
    fieldOfStudy: '1 EF-DI',
    instances: [
      {
        id: '123-123-123-123',
        status: 'started',
        schemaName: 'Kolokwium nr 1',
        startedAt: new Date(),
        endedAt: null,
      }
    ]
  },
];

const panel = ref(subjects.map((_, index) => index));
const canJoinInstance = (instanceStatus: TestInstanceStatus) => [TestInstanceStatus.CREATED, TestInstanceStatus.STARTED].includes(instanceStatus);

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
        <v-expansion-panels multiple v-model="panel" class="mx-auto">
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
