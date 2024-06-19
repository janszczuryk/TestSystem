<script setup lang="ts">
import { getLocalizedDate } from "@/utils/date";
import { getAnswerLetter } from "@/utils/test-instance-question";
import { getTestInstanceLearnerAnswerStatusName } from "@/utils/test-instance-learner-answer";

defineProps<{ testInstanceLearnerAnswers: object[] }>();

const headers = [
  {
    title: 'Pytanie',
    key: 'question',
  },
  {
    title: 'Odpowiedzi',
    key: 'answers',
  },
  {
    title: 'Poprawna odpowiedź',
    key: 'correctAnswerIndex',
  },
  {
    title: 'Wskazana odpowiedź',
    key: 'submittedAnswerIndex',
  },
  {
    title: 'Status',
    key: 'status',
  },
  {
    title: 'Pokazano o',
    key: 'shownAt',
  },
  {
    title: 'Odpowiedziano o',
    key: 'submittedAt',
  },
];
</script>

<template>
  <v-data-table
    :headers="headers"
    :items="testInstanceLearnerAnswers"
    :sortBy="[{ key: 'shownAt', order: 'asc' }]"
  >
    <template v-slot:item.answers="{ item }">
      <span
        v-for="(answer, answerIndex) in item.answers"
        :key="answerIndex"
      >
        <span>{{ getAnswerLetter(answerIndex) }}) {{ answer }}</span>&nbsp;
      </span>
    </template>
    <template v-slot:item.status="{ item }">
      {{ getTestInstanceLearnerAnswerStatusName(item.status) }}
    </template>
    <template v-slot:item.shownAt="{ item }">
      {{ getLocalizedDate(item.shownAt) }}
    </template>
    <template v-slot:item.submittedAt="{ item }">
      {{ getLocalizedDate(item.submittedAt) }}
    </template>
  </v-data-table>
</template>

<style scoped>

</style>
