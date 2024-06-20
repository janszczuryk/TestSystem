<script setup lang="ts">
import { computed, nextTick, ref, watch } from 'vue';
import { useAccount } from "@/composables/account";
import { useTestSchemaList } from "@/composables/test-schema";
import { useTestSchemaQuestionList } from "@/composables/test-schema-question";
import { useApiClient } from "@/utils/api";
import { TestSchemaQuestionApiService } from "@/utils/api-services/test-schema-question";
import { deepToRaw } from "@/utils/ref";
import { getAnswerLetter } from "@/utils/test-instance-question";
import { TestSchemaQuestion } from "@/types/test-schema-question";

/**
 *  DATA
 */

const api = useApiClient();
const { account } = useAccount();

const { testSchemaList } = useTestSchemaList();
const testSchemaId = ref<string | null>(null);

const { testSchemaQuestionList } = useTestSchemaQuestionList();
const headers = [
  { title: 'Pytanie', key: 'question' },
  { title: 'Odpowiedzi', key: 'answers', sortable: false },
  { title: 'Poprawna odpowiedź', key: 'correctAnswerIndex' },
  { title: 'Akcje', key: 'actions', sortable: false },
];

const dialogUniversalTitle = computed(() => (actionItemIndex.value === -1 ? 'Dodaj nowe' : 'Edytuj'));
const dialogUniversal = ref(false);
const dialogDelete = ref(false);
const actionItemIndex = ref(-1);
const actionItem = ref<TestSchemaQuestion>({
  id: '',
  question: '',
  answers: [],
  correctAnswerIndex: 0,
  schema: {
    id: '',
  },
  instanceQuestions: [],
  updatedAt: '',
  createdAt: '',
});
const defaultItem = {
  question: '',
  answers: [],
  correctAnswerIndex: 0,
};

/**
 *  API SERVICES
 */
const testSchemaQuestionApiService = new TestSchemaQuestionApiService(account.value!, api);

/**
 *  DOM Event handlers
 */

const onActionEditItem = (item: TestSchemaQuestion) => {
  actionItemIndex.value = testSchemaQuestionList.value.indexOf(item);
  Object.assign(actionItem.value, deepToRaw(item));
  dialogUniversal.value = true;
};

const onActionDeleteItem = (item: TestSchemaQuestion) => {
  actionItemIndex.value = testSchemaQuestionList.value.indexOf(item);
  Object.assign(actionItem.value, deepToRaw(item));
  dialogDelete.value = true;
};

const onCloseUniversalDialog = () => {
  dialogUniversal.value = false;
  nextTick(() => {
    Object.assign(actionItem.value, defaultItem);
    actionItemIndex.value = -1;
  });
};

const onCloseDeleteDialog = () => {
  dialogDelete.value = false;
  nextTick(() => {
    Object.assign(actionItem.value, defaultItem);
    actionItemIndex.value = -1;
  });
};

const onSaveItem = async () => {
  if (actionItemIndex.value > -1) {
    const updatedTestSchemaQuestion = await testSchemaQuestionApiService.update(
      testSchemaId.value!,
      actionItem.value.id,
      {
        question: actionItem.value.question,
        answers: actionItem.value.answers,
        correctAnswerIndex: Number(actionItem.value.correctAnswerIndex),
      }
    );

    Object.assign(testSchemaQuestionList.value[actionItemIndex.value], updatedTestSchemaQuestion);
  } else {
    const createdTestSchemaQuestion = await testSchemaQuestionApiService.create(
      testSchemaId.value!,
      {
        question: actionItem.value.question,
        answers: actionItem.value.answers,
        correctAnswerIndex: Number(actionItem.value.correctAnswerIndex),
      }
    );

    testSchemaQuestionList.value.push(createdTestSchemaQuestion);
  }

  onCloseUniversalDialog();
};

const onDeleteItem = async () => {
  await testSchemaQuestionApiService.remove(actionItem.value.schema.id, actionItem.value.id);

  testSchemaQuestionList.value.splice(actionItemIndex.value, 1);

  onCloseDeleteDialog();
};

/**
 *  HOOKS
 */

watch(dialogUniversal, (value) => {
  if (!value) onCloseUniversalDialog();
});
watch(dialogDelete, (value) => {
  if (!value) onCloseDeleteDialog();
});

watch(testSchemaId, async () => {
  if (testSchemaId.value) {
    testSchemaQuestionList.value = await testSchemaQuestionApiService.findAll(testSchemaId.value);
  }
});
</script>

<template>
  <v-data-table
    :headers="headers"
    :items="testSchemaQuestionList"
    :sort-by="[{ key: 'question', order: 'asc' }]"
  >
    <template v-slot:top>
      <v-toolbar flat color="white">
        <v-toolbar-title>Pytania w schemacie testu</v-toolbar-title>
        <v-divider class="mx-4" inset vertical></v-divider>
        <v-select
          v-model="testSchemaId"
          :items="testSchemaList"
          item-value="id"
          item-title="name"
          variant="outlined"
          density="compact"
          label="Schemat testu"
          hide-details
          max-width="360"
        >
        </v-select>
        <v-dialog v-model="dialogUniversal" max-width="500px">
          <template v-slot:activator="{ props }">
            <v-btn class="mb-2 ml-4" color="primary" variant="elevated" v-bind="props" :disabled="!testSchemaId">
              Dodaj nowe
            </v-btn>
          </template>
          <v-card>
            <v-card-title>
              <span class="text-h5">{{ dialogUniversalTitle }}</span>
            </v-card-title>
            <v-card-text>
              <v-container>
                <v-row>
                  <v-col>
                    <v-text-field
                      v-model="actionItem.question"
                      variant="outlined"
                      label="Pytanie"
                    ></v-text-field>
                  </v-col>
                </v-row>
                <v-row>
                  <v-col>
                    <v-combobox
                      v-model="actionItem.answers"
                      :hide-no-data="false"
                      label="Odpowiedzi"
                      variant="outlined"
                      hide-selected
                      multiple
                      small-chips
                    >
                      <template v-slot:no-data>
                        <v-list-item>
                          <v-list-item-title>
                            Naciśnij <kbd>enter</kbd> aby dodać nową odpowiedź.
                          </v-list-item-title>
                        </v-list-item>
                      </template>
                    </v-combobox>
                  </v-col>
                </v-row>
                <v-row>
                  <v-col>
                    <v-text-field
                      v-model="actionItem.correctAnswerIndex"
                      type="number"
                      variant="outlined"
                      label="Poprawna odpowiedź"
                      hint="Wprowadź indeks odpowiedzi (A → 0; B → 1; C → 2; D → 3; ...)"
                      :persistent-hint="true"
                    ></v-text-field>
                  </v-col>
                </v-row>
              </v-container>
            </v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="blue-darken-1" variant="text" @click="onCloseUniversalDialog">Anuluj</v-btn>
              <v-btn color="blue-darken-1" variant="text" @click="onSaveItem">Zapisz</v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
        <v-dialog v-model="dialogDelete" max-width="500px">
          <v-card>
            <v-card-title class="text-h5">Jesteś pewien, że chcesz usunąc ten wpis?</v-card-title>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="blue-darken-1" variant="text" @click="onCloseDeleteDialog">Anuluj</v-btn>
              <v-btn color="blue-darken-1" variant="text" @click="onDeleteItem">Potwiedź</v-btn>
              <v-spacer></v-spacer>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-toolbar>
    </template>
    <template v-slot:item.answers="{ item }">
      <span
        v-for="(answer, answerIndex) in item.answers"
        :key="answerIndex"
      >
        <span>{{ getAnswerLetter(answerIndex) }}) {{ answer }}</span>&nbsp;
      </span>
    </template>
    <template v-slot:item.correctAnswerIndex="{ item }">
      {{ getAnswerLetter(item.correctAnswerIndex) }}
    </template>
    <template v-slot:item.actions="{ item }">
      <v-icon class="me-2" size="small" @click="onActionEditItem(item)">
        mdi-pencil
      </v-icon>
      <v-icon size="small" @click="onActionDeleteItem(item)">
        mdi-delete
      </v-icon>
    </template>
  </v-data-table>
</template>

<style scoped>

</style>
