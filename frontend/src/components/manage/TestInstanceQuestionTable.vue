<script setup lang="ts">
import { getAnswerLetter } from "@/utils/test-instance-question";
import { TestInstanceQuestion } from "@/types/test-instance-question";

defineProps<{ questionsPool: TestInstanceQuestion[] }>();

const headers = [
  { title: 'Pytanie', key: 'question' },
  { title: 'Odpowiedzi', key: 'answers' },
  { title: 'Poprawna odpowiedź', key: 'correctAnswerIndex' },
];
</script>

<template>
  <v-data-table
    :headers="headers"
    :items="questionsPool"
    :sortBy="[{ key: 'question', order: 'asc' }]"
  >
    <template v-slot:item.answers="{ item }">
      <span
        v-for="(answer, answerIndex) in item.answers"
        :key="answerIndex"
      >
        <span>{{ getAnswerLetter(answerIndex) }}) {{ answer }}</span>&nbsp;
      </span>
    </template>
    <template v-slot:item.correctAnswerIndex="{ item }">
      <span>{{ getAnswerLetter(item.correctAnswerIndex) }}</span>&nbsp;
    </template>
  </v-data-table>
</template>

<style scoped>

</style>
