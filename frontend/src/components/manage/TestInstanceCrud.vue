<script setup>
import {computed, nextTick, onMounted, reactive, ref, watch} from 'vue';
import {TestInstanceStatus} from "@/types/test-instance";
import {getStatusName} from "@/utils/test-instance";
import {getLocalizedDate} from "@/utils/date";
import TestInstanceQuestionTable from './TestInstanceQuestionTable.vue';

const testSchemas = ref([]);
const chosenTestSchema = ref(null);

const testInstanceQuestions = ref([]);
const dialogQuestionsInstanceId = ref(null);

const dialog = ref(false);
const dialogDelete = ref(false);
const dialogQuestions = ref(false);
const headers = [
  {title: 'Ilość pytań', key: 'questionsCount'},
  {title: 'Pytania', key: 'questionsDialog', sortable: false},
  {title: 'Włączona', key: 'isEnabled'},
  {title: 'Status', key: 'status'},
  {title: 'Rozpoczęto', key: 'startedAt'},
  {title: 'Zakończono', key: 'endedAt'},
  {title: 'Akcje', key: 'actions', sortable: false},
];
const testInstances = ref([]);
const editedIndex = ref(-1);
const editedItem = reactive({
  questionsCount: 0,
  isEnabled: false,
});
const defaultItem = {
  questionsCount: 0,
  isEnabled: false,
};

const formTitle = computed(() => (editedIndex.value === -1 ? 'Dodaj nowe' : 'Edytuj'));

watch(dialog, (value) => {
  if (!value) close();
});
watch(dialogDelete, (value) => {
  if (!value) closeDelete();
});
watch(dialogQuestions, (value) => {
  if (!value) closeQuestions();
});

watch(chosenTestSchema, (value) => {
  testInstances.value = [
    {
      id: '1bcef399-5c17-40e0-af0f-aa62b2727f3e',
      schemaId: '83c630f4-a4a6-452a-8bd3-7cd9b0ba7fa1',
      questionsCount: 3,
      isEnabled: true,
      status: 'created',
      startedAt: null,
      endedAt: null,
    },
    {
      id: '1bcef399-5c17-40e0-af0f-aa62b2727f3e',
      schemaId: '83c630f4-a4a6-452a-8bd3-7cd9b0ba7fa1',
      questionsCount: 5,
      isEnabled: true,
      status: 'started',
      startedAt: new Date(),
      endedAt: null,
    },
    {
      id: '1bcef399-5c17-40e0-af0f-aa62b2727f3e',
      schemaId: '83c630f4-a4a6-452a-8bd3-7cd9b0ba7fa1',
      questionsCount: 7,
      isEnabled: false,
      status: 'ended',
      startedAt: new Date(),
      endedAt: new Date(),
    },
  ];
});

watch(dialogQuestionsInstanceId, (value) => {
  if (!value) {
    testInstanceQuestions.value = [];
    return;
  }

  testInstanceQuestions.value = [
    {
      id: '46d86b76-0458-4832-815b-422ae15f97ef',
      question: 'Gdzie leży Polska?',
      answers: [ 'W Europie', 'W Azji', 'W Afryce', 'A Ameryce Płd.' ],
      correctAnswerIndex: 0,
    },
    {
      id: '46d86b76-0458-4832-815b-422ae15f97f0',
      question: 'Gdzie leżą Czechy?',
      answers: [ 'W Europie', 'W Azji', 'W Afryce', 'A Ameryce Płd.' ],
      correctAnswerIndex: 0,
    },
  ];
})

onMounted(() => {
  initialize();
});

const initialize = () => {
  testSchemas.value = [
    {
      id: '83c630f4-a4a6-452a-8bd3-7cd9b0ba7fa1',
      name: 'Kolokwium nr 1',
      subject: 'Sieci komputerowe 1',
      subjectId: '103b07a3-e67b-4e25-95f4-6a6061add688'
    },
    {
      id: '83c630f4-a4a6-452a-8bd3-7cd9b0ba7fa2',
      name: 'Kolokwium nr 2',
      subject: 'Sieci komputerowe 2',
      subjectId: '103b07a3-e67b-4e25-95f4-6a6061add689'
    },
  ];
};

const editItem = (item) => {
  editedIndex.value = testInstances.value.indexOf(item);
  Object.assign(editedItem, item);
  dialog.value = true;
};

const deleteItem = (item) => {
  editedIndex.value = testInstances.value.indexOf(item);
  Object.assign(editedItem, item);
  dialogDelete.value = true;
};

const startInstance = (item) => {
  editedIndex.value = testInstances.value.indexOf(item);
  item.status = TestInstanceStatus.STARTED;
  Object.assign(editedItem, item);
  save();
};

const endInstance = (item) => {
  editedIndex.value = testInstances.value.indexOf(item);
  item.status = TestInstanceStatus.ENDED;
  Object.assign(editedItem, item);
  save();
}

const showInstanceQuestions = (item) => {
  dialogQuestionsInstanceId.value = item.id;
  dialogQuestions.value = true;
};

const deleteItemConfirm = () => {
  testInstances.value.splice(editedIndex.value, 1);
  closeDelete();
};

const close = () => {
  dialog.value = false;
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

const closeQuestions = () => {
  dialogQuestions.value = false;
  nextTick(() => {
    dialogQuestionsInstanceId.value = null;
  });
};

const save = () => {
  if (editedIndex.value > -1) {
    Object.assign(testInstances.value[editedIndex.value], editedItem);
  } else {
    testInstances.value.push({...editedItem});
  }
  close();
};
</script>

<template>
  <v-data-table
    :headers="headers"
    :items="testInstances"
    :sort-by="[{ key: 'isEnabled', order: 'desc' }]"
  >
    <template v-slot:top>
      <v-toolbar flat color="white">
        <v-toolbar-title>Instance testów</v-toolbar-title>
        <v-divider class="mx-4" inset vertical></v-divider>
        <v-select
          v-model="chosenTestSchema"
          :items="testSchemas"
          item-value="id"
          item-title="name"
          variant="outlined"
          density="compact"
          label="Schemat testu"
          hide-details
          max-width="360"
        >
        </v-select>
        <v-dialog v-model="dialog" max-width="500px">
          <template v-slot:activator="{ props }">
            <v-btn class="mb-2 ml-4" color="primary" variant="elevated" v-bind="props" :disabled="!chosenTestSchema">
              Dodaj nową
            </v-btn>
          </template>
          <v-card>
            <v-card-title>
              <span class="text-h5">{{ formTitle }}</span>
            </v-card-title>
            <v-card-text>
              <v-container>
                <v-row>
                  <v-col>
                    <v-text-field type="number" variant="outlined" v-model="editedItem.questionsCount"
                                  label="Ilość pytań"></v-text-field>
                  </v-col>
                </v-row>
                <v-row>
                  <v-col>
                    <v-checkbox v-model="editedItem.isEnabled" label="Włączona"></v-checkbox>
                  </v-col>
                </v-row>
              </v-container>
            </v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="blue-darken-1" variant="text" @click="close">Anuluj</v-btn>
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
        <v-dialog v-model="dialogQuestions" max-width="960px">
          <v-card>
            <v-card-title class="text-h5">Pytania</v-card-title>
            <v-card-text>
              <TestInstanceQuestionTable :testInstanceQuestions="testInstanceQuestions"/>
            </v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="blue-darken-1" variant="text" @click="closeQuestions">Zamknij</v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-toolbar>
    </template>
    <template v-slot:item.questionsDialog="{ item }">
      <v-btn density="compact" @click="showInstanceQuestions(item)">Zobacz</v-btn>
    </template>
    <template v-slot:item.isEnabled="{ item }">
      {{ item.isEnabled ? 'Tak' : 'Nie' }}
    </template>
    <template v-slot:item.status="{ item }">
      {{ getStatusName(item.status) }}
    </template>
    <template v-slot:item.startedAt="{ item }">
      {{ getLocalizedDate(item.startedAt) }}
    </template>
    <template v-slot:item.endedAt="{ item }">
      {{ getLocalizedDate(item.endedAt) }}
    </template>
    <template v-slot:item.actions="{ item }">
      <v-icon size="small" class="mr-2" @click="startInstance(item)">
        mdi-play-circle
      </v-icon>
      <v-icon size="small" class="mr-2" @click="endInstance(item)">
        mdi-stop-circle
      </v-icon>
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
