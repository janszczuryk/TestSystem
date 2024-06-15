<script setup lang="ts">
import Breadcrumbs from "@/components/Breadcrumbs.vue";
import {TestInstanceStatus} from "@/types/test-instance";
import {getStatusName} from "@/utils/test-instance";

const instance = {
  id: '123-123-123-123',
  questionsCount: 3,
  status: 'started',
  subjectName: 'Sieci komputerowe 1',
  fieldOfStudy: '2 EF-DI',
  schemaName: 'Kolokwium nr 1',
  teacher: {
    email: 'jan.szczuryk@gmail.com',
  },
  learner: {
    email: 'jan.szczuryk+learner1@gmail.com',
    number: 42,
  },
  startedAt: new Date(),
  endedAt: null,
};

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
breadcrumbs.push({
  title: instance.schemaName,
  disabled: false,
  href: `/tests/${instance.id}`
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
            <h1 class="text-h5 font-weight-bold text-center">Test: {{ instance.schemaName }}</h1>
          </template>
        </v-card>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12">
        <v-card class="mx-auto my-4 py-4" max-width="960">
          <v-card-item>
            <v-card-title>Przystąpienie do testu</v-card-title>
            <v-card-subtitle>Aby przystąpić do testu, naciśnij przycisk <span class="font-weight-bold">rozpocznij podejście</span>.</v-card-subtitle>
          </v-card-item>

          <v-card-text>
            <v-container class="pa-0 mt-4">
              <v-row>
                <v-col>
                  <p class="text-grey-darken-1">
                    <v-icon icon="mdi-school"/>
                    Nazwa testu: {{ instance.schemaName }}
                  </p>
                </v-col>
              </v-row>
              <v-row>
                <v-col>
                  <p class="text-grey-darken-1">
                    <v-icon icon="mdi-account-multiple"/>
                    Kierunek studiów: {{ instance.fieldOfStudy }}
                  </p>
                </v-col>
              </v-row>
              <v-row>
                <v-col>
                  <p class="text-grey-darken-1">
                    <v-icon icon="mdi-information"/>
                    Status: {{ getStatusName(instance.status as TestInstanceStatus) }}
                  </p>
                </v-col>
                <v-col>
                  <p class="text-grey-darken-1">
                    <v-icon icon="mdi-clock-time-three"/>
                    Rozpoczęto: {{ instance.startedAt ? instance.startedAt.toLocaleString() : '&mdash;' }}
                  </p>
                </v-col>
                <v-col>
                  <p class="text-grey-darken-1">
                    <v-icon icon="mdi-clock-time-eight"/>
                    Zakończono: {{ instance.endedAt ? instance.endedAt.toLocaleString() : '&mdash;' }}
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
                    Uczestnik: {{ instance.learner.email }} (Nr: {{ instance.learner.number }})
                  </p>
                </v-col>
              </v-row>
            </v-container>
          </v-card-text>

          <v-container>
            <v-row>
              <v-col>
                <v-btn variant="elevated" color="primary" block>Rozpocznij podejście</v-btn>
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
