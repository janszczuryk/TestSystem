<script setup lang="ts">
import { nextTick, onMounted, reactive, ref, watch } from 'vue';
import { getTestInstanceStatusName } from "@/utils/test-instance";
import { getLocalizedDate } from "@/utils/date";
import { getTestInstanceLearnerStatusName } from "@/utils/test-instance-learner";
import TestInstanceLearnerAnswerTable from "@/components/manage/TestInstanceLearnerAnswerTable.vue";

const testInstances = ref([]);
const chosenTestInstance = ref(null);

const testInstanceLearnerAnswers = ref([]);
const dialogAnswersLearnerId = ref(null);

const dialogEdit = ref(false);
const dialogDelete = ref(false);
const dialogAnswers = ref(false);
const headers = [
  { title: 'Numer uczestnika', key: 'learnerNumber' },
  { title: 'Status', key: 'status' },
  { title: 'Rozpoczęto podejście', key: 'startedAt' },
  { title: 'Zakończono podejście', key: 'finishedAt' },
  { title: 'Odpowiedzi', key: 'answersDialog' },
  { title: 'Wynik', key: 'resultSummary' },
  { title: 'Akcje', key: 'actions', sortable: false },
];
const testInstanceLearners = ref([]);
const editedIndex = ref(-1);
const editedItem = reactive({
  learnerNumber: 0,
});
const defaultItem = {
  learnerNumber: 0,
};

watch(dialogEdit, (value) => {
  if (!value) closeEdit();
});
watch(dialogDelete, (value) => {
  if (!value) closeDelete();
});
watch(dialogAnswers, (value) => {
  if (!value) closeAnswers();
});

watch(chosenTestInstance, (value) => {
  testInstanceLearners.value = [
    {
      instanceId: 'bf9074b8-956d-435e-9a37-7b369aee04bc',
      learnerId: '89d26689-4eaa-4594-a546-949e358b89f1',
      learnerNumber: 1,
      status: 'joined',
      startedAt: null,
      finishedAt: null,
      resultSummary: {
        achieved: 0,
        toAchieve: 10,
        percentage: 0,
      },
    },
    {
      instanceId: 'bf9074b8-956d-435e-9a37-7b369aee04bc',
      learnerId: '89d26689-4eaa-4594-a546-949e358b89f2',
      learnerNumber: 2,
      status: 'started',
      startedAt: new Date(),
      finishedAt: null,
      resultSummary: {
        achieved: 3,
        toAchieve: 10,
        percentage: 30,
      },
    },
    {
      instanceId: 'bf9074b8-956d-435e-9a37-7b369aee04bc',
      learnerId: '89d26689-4eaa-4594-a546-949e358b89f3',
      learnerNumber: 3,
      status: 'finished',
      startedAt: new Date(),
      finishedAt: new Date(),
      resultSummary: {
        achieved: 7,
        toAchieve: 10,
        percentage: 70,
      },
    },
  ];
});

watch(dialogAnswersLearnerId, (value) => {
  if (!value) {
    testInstanceLearnerAnswers.value = [];
    return;
  }

  testInstanceLearnerAnswers.value = [
    {
      id: '46d86b76-0458-4832-815b-422ae15f97ef',
      question: 'Gdzie leży Polska?',
      answers: [ 'W Europie', 'W Azji', 'W Afryce', 'A Ameryce Płd.' ],
      correctAnswerIndex: 0,
      submittedAnswerIndex: 0,
      status: 'correct_answer_submitted',
      shownAt: new Date(),
      submittedAt: new Date(),
    },
    {
      id: '46d86b76-0458-4832-815b-422ae15f97f0',
      question: 'Gdzie leżą Czechy?',
      answers: [ 'W Europie', 'W Azji', 'W Afryce', 'A Ameryce Płd.' ],
      correctAnswerIndex: 0,
      submittedAnswerIndex: 1,
      status: 'incorrect_answer_submitted',
      shownAt: new Date(),
      submittedAt: new Date(),
    },
  ];
})

onMounted(() => {
  initialize();
});

const initialize = () => {
  testInstances.value = [
    {
      id: '1bcef399-5c17-40e0-af0f-aa62b2727f3e',
      schemaId: '83c630f4-a4a6-452a-8bd3-7cd9b0ba7fa1',
      schemaName: 'Kolokwium nr 1',
      questionsCount: 3,
      isEnabled: true,
      status: 'created',
      startedAt: null,
      endedAt: null,
    },
    {
      id: '1bcef399-5c17-40e0-af0f-aa62b2727f3f',
      schemaId: '83c630f4-a4a6-452a-8bd3-7cd9b0ba7fa1',
      schemaName: 'Kolokwium nr 2',
      questionsCount: 5,
      isEnabled: true,
      status: 'started',
      startedAt: new Date(),
      endedAt: null,
    },
  ];
};

const editItem = (item) => {
  editedIndex.value = testInstanceLearners.value.indexOf(item);
  Object.assign(editedItem, item);
  dialogEdit.value = true;
};

const deleteItem = (item) => {
  editedIndex.value = testInstanceLearners.value.indexOf(item);
  Object.assign(editedItem, item);
  dialogDelete.value = true;
};

const showInstanceLearnersAnswers = (item) => {
  dialogAnswersLearnerId.value = item.learnerId;
  dialogAnswers.value = true;
};

const deleteItemConfirm = () => {
  testInstanceLearners.value.splice(editedIndex.value, 1);
  closeDelete();
};

const closeEdit = () => {
  dialogEdit.value = false;
  nextTick(() => {
    Object.assign(editedItem, defaultItem);
    editedIndex.value = -1;
  });
};

const closeDelete = () => {
  dialogDelete.value = false;
  nextTick(() => {
    Object.assign(editedItem, defaultItem);
    editedIndex.value = -1;
  });
};

const closeAnswers = () => {
  dialogAnswers.value = false;
  nextTick(() => {
    dialogAnswersLearnerId.value = null;
  });
};

const save = () => {
  if (editedIndex.value > -1) {
    Object.assign(testInstanceLearners.value[editedIndex.value], editedItem);
  }
  closeEdit();
};
</script>

<template>
  <v-data-table
    :headers="headers"
    :items="testInstanceLearners"
    :sort-by="[{ key: 'learnerNumber', order: 'asc' }]"
  >
    <template v-slot:top>
      <v-toolbar flat color="white">
        <v-toolbar-title>Uczestnicy w instancji testu</v-toolbar-title>
        <v-divider class="mx-4" inset vertical></v-divider>
        <v-select
          v-model="chosenTestInstance"
          :items="testInstances"
          item-value="id"
          :item-props="(item) => ({
            title: item.schemaName,
            subtitle: `Status: ${getTestInstanceStatusName(item.status)} (Rozpoczęto: ${getLocalizedDate(item.startedAt)})`,
          })"
          variant="outlined"
          density="compact"
          label="Instancja testu"
          hide-details
          max-width="360"
        >
        </v-select>
        <v-spacer></v-spacer>
        <v-dialog v-model="dialogEdit" max-width="500px">
          <v-card>
            <v-card-title>
              <span class="text-h5">Edytuj</span>
            </v-card-title>
            <v-card-text>
              <v-container>
                <v-row>
                  <v-col>
                    <v-text-field
                      type="number"
                      variant="outlined"
                      v-model="editedItem.learnerNumber"
                      label="Number uczestnitka"
                    ></v-text-field>
                  </v-col>
                </v-row>
              </v-container>
            </v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="blue-darken-1" variant="text" @click="closeEdit">Anuluj</v-btn>
              <v-btn color="blue-darken-1" variant="text" @click="save">Zapisz</v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
        <v-dialog v-model="dialogDelete" max-width="500px">
          <v-card>
            <v-card-title class="text-h5">Jesteś pewien, że chcesz usunąc ten wpis?</v-card-title>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="blue-darken-1" variant="text" @click="closeDelete">Anuluj</v-btn>
              <v-btn color="blue-darken-1" variant="text" @click="deleteItemConfirm">Potwiedź</v-btn>
              <v-spacer></v-spacer>
            </v-card-actions>
          </v-card>
        </v-dialog>
        <v-dialog v-model="dialogAnswers" max-width="1280px">
          <v-card>
            <v-card-title class="text-h5">Odpowiedzi uczestnika</v-card-title>
            <v-card-text>
              <TestInstanceLearnerAnswerTable :testInstanceLearnerAnswers="testInstanceLearnerAnswers"/>
            </v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="blue-darken-1" variant="text" @click="closeAnswers">Zamknij</v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-toolbar>
    </template>
    <template v-slot:item.status="{ item }">
      {{ getTestInstanceLearnerStatusName(item.status) }}
    </template>
    <template v-slot:item.startedAt="{ item }">
      {{ getLocalizedDate(item.startedAt) }}
    </template>
    <template v-slot:item.finishedAt="{ item }">
      {{ getLocalizedDate(item.finishedAt) }}
    </template>
    <template v-slot:item.answersDialog="{ item }">
      <v-btn density="compact" @click="showInstanceLearnersAnswers(item)">Zobacz</v-btn>
    </template>
    <template v-slot:item.resultSummary="{ item }">
      {{ item.resultSummary.achieved }} / {{ item.resultSummary.toAchieve }} ({{ item.resultSummary.percentage }}%)
    </template>
    <template v-slot:item.actions="{ item }">
      <v-icon size="small" class="mr-2" @click="editItem(item)">
        mdi-pencil
      </v-icon>
      <v-icon size="small" @click="deleteItem(item)">
        mdi-delete
      </v-icon>
    </template>
  </v-data-table>
</template>

<style scoped>

</style>
