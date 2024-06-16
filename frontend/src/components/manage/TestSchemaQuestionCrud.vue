<script setup>
import {computed, nextTick, onMounted, reactive, ref, watch} from 'vue';

const testSchemas = ref([]);
const chosenTestSchema = ref(null);

const dialog = ref(false);
const dialogDelete = ref(false);
const headers = [
  {title: 'Pytanie', key: 'question'},
  {title: 'Odpowiedzi', key: 'answers', sortable: false},
  {title: 'Poprawna odpowiedź', key: 'correctAnswerIndex'},
  {title: 'Akcje', key: 'actions', sortable: false},
];
const testSchemaQuestions = ref([]);
const editedIndex = ref(-1);
const editedItem = reactive({
  question: '',
  answers: [],
  correctAnswerIndex: 0,
});
const defaultItem = {
  question: '',
  answers: [],
  correctAnswerIndex: 0,
};

const formTitle = computed(() => (editedIndex.value === -1 ? 'Dodaj nowe' : 'Edytuj'));

watch(dialog, (value) => {
  if (!value) close();
});
watch(dialogDelete, (value) => {
  if (!value) closeDelete();
});

watch(chosenTestSchema, (value) => {
  testSchemaQuestions.value = [
    {
      id: '1bcef399-5c17-40e0-af0f-aa62b2727f3e',
      question: 'Gdzie leży Polska?',
      answers: ['W Europie', 'W Azji', 'W Afryce', 'A Ameryce Płd.'],
      correctAnswerIndex: 0,
      schemaId: '83c630f4-a4a6-452a-8bd3-7cd9b0ba7fa1'
    },
    {
      id: '1bcef399-5c17-40e0-af0f-aa62b2727f3f',
      question: 'Gdzie leżą Czechy?',
      answers: ['W Europie', 'W Azji', 'W Afryce', 'A Ameryce Płd.'],
      correctAnswerIndex: 0,
      schemaId: '83c630f4-a4a6-452a-8bd3-7cd9b0ba7fa1'
    },
  ];
});

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
  editedIndex.value = testSchemaQuestions.value.indexOf(item);
  Object.assign(editedItem, item);
  dialog.value = true;
};

const deleteItem = (item) => {
  editedIndex.value = testSchemaQuestions.value.indexOf(item);
  Object.assign(editedItem, item);
  dialogDelete.value = true;
};

const deleteItemConfirm = () => {
  testSchemaQuestions.value.splice(editedIndex.value, 1);
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

const save = () => {
  if (editedIndex.value > -1) {
    Object.assign(testSchemaQuestions.value[editedIndex.value], editedItem);
  } else {
    testSchemaQuestions.value.push({...editedItem});
  }
  close();
};
</script>

<template>
  <v-data-table
    :headers="headers"
    :items="testSchemaQuestions"
    :sort-by="[{ key: 'question', order: 'asc' }]"
  >
    <template v-slot:top>
      <v-toolbar flat color="white">
        <v-toolbar-title>Pytania w schemacie testu</v-toolbar-title>
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
        >
        </v-select>
        <v-dialog v-model="dialog" max-width="500px">
          <template v-slot:activator="{ props }">
            <v-btn class="mb-2 ml-4" color="primary" variant="elevated" v-bind="props" :disabled="!chosenTestSchema">
              Dodaj nowe
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
                    <v-text-field variant="outlined" v-model="editedItem.question" label="Question"></v-text-field>
                  </v-col>
                </v-row>
                <v-row>
                  <v-col>
                    <v-combobox
                      v-model="editedItem.answers"
                      :hide-no-data="false"
                      label="Pytania"
                      hide-selected
                      multiple
                      small-chips
                    >
                      <template v-slot:no-data>
                        <v-list-item>
                          <v-list-item-title>
                            Naciśnij <kbd>enter</kbd> aby dodać nowe pytanie.
                          </v-list-item-title>
                        </v-list-item>
                      </template>
                    </v-combobox>
                  </v-col>
                </v-row>
                <v-row>
                  <v-col>
                    <v-text-field variant="outlined" v-model="editedItem.correctAnswerIndex" label="Poprawna odpowiedź"></v-text-field>
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
      </v-toolbar>
    </template>
    <template v-slot:item.actions="{ item }">
      <v-icon class="me-2" size="small" @click="editItem(item)">
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
