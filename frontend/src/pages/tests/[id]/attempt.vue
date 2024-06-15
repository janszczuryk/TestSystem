<script setup lang="ts">
import {ref} from "vue";
import Breadcrumbs from "@/components/Breadcrumbs.vue";
import {getAnswerLetter} from "@/utils/test-instance-question";

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

const instanceLearner = ref({
  status: 'started',
});

const currentQuestion = ref({
  questionNumber: 1,
  question: 'Gdzie leży Polska?',
  answers: [
    'W Europie',
    'W Azji',
    'W Afryce',
    'W Ameryce Płd.',
  ],
});

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
  href: `/tests/${instance.id}/attempt`
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
            <h1 class="text-h5 font-weight-bold text-center">Test: {{ instance.schemaName }} </h1>
            <p class="text-subtitle-1 text-center">Przystąpiono do rozwiązywania testu.</p>
          </template>
          <template #append>
            <v-btn icon="mdi-close" density="comfortable" title="Zakończ podejście"></v-btn>
          </template>
        </v-card>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12">
        <v-card class="mx-auto my-4 py-4" max-width="960">
          <v-card-item>
            <v-card-title>{{ currentQuestion.questionNumber }}. {{ currentQuestion.question }}</v-card-title>
          </v-card-item>
          <v-card-text class="py-0">
            <v-radio-group class="pl-10">
              <v-radio
                v-for="(answer, answerIndex) in currentQuestion.answers"
                :key="answerIndex"
                :value="answerIndex"
              >
                <template #label>{{ getAnswerLetter(answerIndex) }}) {{ answer }}</template>
              </v-radio>
            </v-radio-group>
          </v-card-text>
          <v-card-actions>
            <v-btn variant="elevated" color="primary" block>Potwierdź odpowiedź</v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
    <v-row>
      <v-col col="12">
        <v-card class="mx-auto py-4" max-width="960" color="green-lighten-4" border>
          <v-card-item>
            <v-card-title class="text-center">
              Dziękujemy! Odpowiedziałeś(aś) na wszystkie pytania!
            </v-card-title>
          </v-card-item>
          <v-card-actions>
            <v-btn variant="elevated" color="primary" block>Zakończ podejście</v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
    <v-row>
      <v-col col="12">
        <v-card class="mx-auto py-4" max-width="960" color="orange-lighten-4" border>
          <v-card-item>
            <v-card-title class="text-center">
              Dziękujemy! Niestety, czas na przesyłanie odpowiedzi się skończył!
            </v-card-title>
          </v-card-item>
          <v-card-actions>
            <v-btn variant="elevated" color="primary" block>Zakończ podejście</v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<style scoped>

</style>
