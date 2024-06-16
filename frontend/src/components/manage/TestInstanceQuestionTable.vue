<script setup lang="ts">
import {getAnswerLetter} from "@/utils/test-instance-question";

defineProps<{ testInstanceQuestions: object[] }>();

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
];
</script>

<template>
  <v-data-table
    :headers="headers"
    :items="testInstanceQuestions"
    :sortBy="[{ key: 'question', order: 'asc' }]"
  >
    <template v-slot:item.answers="{ item }">
      <span
        v-for="(answer, answerIndex) in item.answers"
        :key="answerIndex"
      >
        <span>{{ getAnswerLetter(answerIndex)}}) {{ answer }}</span>&nbsp;
      </span>
    </template>
  </v-data-table>
</template>

<style scoped>

</style>
