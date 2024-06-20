<script setup lang="ts">
import { TestInstanceLearnerAnswer } from "@/types/test-instance-learner-answer";
import { getLocalizedDate } from "@/utils/date";
import { getAnswerLetter } from "@/utils/test-instance-question";
import { getTestInstanceLearnerAnswerStatusName } from "@/utils/test-instance-learner-answer";

defineProps<{ testInstanceLearnerAnswers: TestInstanceLearnerAnswer[] }>();

const headers = [
  { title: 'Pytanie', key: 'instanceQuestion.question' },
  { title: 'Odpowiedzi', key: 'instanceQuestion.answers' },
  { title: 'Poprawna odpowiedź', key: 'instanceQuestion.correctAnswerIndex' },
  { title: 'Wskazana odpowiedź', key: 'submittedAnswerIndex' },
  { title: 'Status', key: 'status' },
  { title: 'Pokazano o', key: 'shownAt' },
  { title: 'Odpowiedziano o', key: 'answerSubmittedAt' },
];
</script>

<template>
  <v-data-table
    :headers="headers"
    :items="testInstanceLearnerAnswers"
    :sortBy="[{ key: 'shownAt', order: 'asc' }]"
  >
    <template v-slot:item.instanceQuestion.answers="{ item }">
      <span
        v-for="(answer, answerIndex) in item.instanceQuestion.answers"
        :key="answerIndex"
      >
        <span>{{ getAnswerLetter(answerIndex) }}) {{ answer }}</span>&nbsp;
      </span>
    </template>
    <template v-slot:item.instanceQuestion.correctAnswerIndex="{ item }">
      {{ getAnswerLetter(item.instanceQuestion.correctAnswerIndex) }}
    </template>
    <template v-slot:item.submittedAnswerIndex="{ item }">
      {{ getAnswerLetter(item.submittedAnswerIndex) }}
    </template>
    <template v-slot:item.status="{ item }">
      {{ getTestInstanceLearnerAnswerStatusName(item.status) }}
    </template>
    <template v-slot:item.shownAt="{ item }">
      {{ getLocalizedDate(item.shownAt) }}
    </template>
    <template v-slot:item.answerSubmittedAt="{ item }">
      {{ getLocalizedDate(item.answerSubmittedAt) }}
    </template>
  </v-data-table>
</template>

<style scoped>

</style>
