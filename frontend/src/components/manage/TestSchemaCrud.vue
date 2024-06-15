<script setup>
import {computed, nextTick, onMounted, reactive, ref, watch} from 'vue';

const subjects = ref([]);

const dialog = ref(false);
const dialogDelete = ref(false);
const headers = [
  {title: 'Nazwa', key: 'name'},
  {title: 'Przedmiot', key: 'subject'},
  {title: 'Akcje', key: 'actions', sortable: false},
];
const items = ref([]);
const editedIndex = ref(-1);
const editedItem = reactive({
  name: '',
  subject: '',
});
const defaultItem = {
  name: '',
  subject: '',
};

const formTitle = computed(() => (editedIndex.value === -1 ? 'Dodaj nowy' : 'Edytuj'));

watch(dialog, (value) => {
  if (!value) close();
});
watch(dialogDelete, (value) => {
  if (!value) closeDelete();
});

onMounted(() => {
  initialize();
});

const initialize = () => {
  items.value = [
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
  subjects.value = [
    {
      id: '103b07a3-e67b-4e25-95f4-6a6061add688',
      name: 'Sieci komputerowe 1',
      fieldOfStudy: '2 EF-DI',
    },
    {
      id: '103b07a3-e67b-4e25-95f4-6a6061add689',
      name: 'Sieci komputerowe 2',
      fieldOfStudy: '3 EF-DI',
    },
    {
      id: '103b07a3-e67b-4e25-95f4-6a6061add68a',
      name: 'ELiAK',
      fieldOfStudy: '1 EF-DI',
    }
  ];
};

const editItem = (item) => {
  editedIndex.value = items.value.indexOf(item);
  Object.assign(editedItem, item);
  dialog.value = true;
};

const deleteItem = (item) => {
  editedIndex.value = items.value.indexOf(item);
  Object.assign(editedItem, item);
  dialogDelete.value = true;
};

const deleteItemConfirm = () => {
  items.value.splice(editedIndex.value, 1);
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
    Object.assign(items.value[editedIndex.value], editedItem);
  } else {
    items.value.push({...editedItem});
  }
  close();
};
</script>

<template>
  <v-data-table
    :headers="headers"
    :items="items"
    :sort-by="[{ key: 'name', order: 'asc' }]"
  >
    <template v-slot:top>
      <v-toolbar flat color="white">
        <v-toolbar-title>Schematy testów</v-toolbar-title>
        <v-divider class="mx-4" inset vertical></v-divider>
        <v-spacer></v-spacer>
        <v-dialog v-model="dialog" max-width="500px">
          <template v-slot:activator="{ props }">
            <v-btn class="mb-2" color="primary" variant="elevated" v-bind="props">
              Dodaj nowy
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
                    <v-text-field variant="outlined" v-model="editedItem.name" label="Nazwa"></v-text-field>
                  </v-col>
                </v-row>
                <v-row>
                  <v-col>
                    <v-select v-model="editedItem.subject" item-value="id" :items="subjects" variant="outlined" item-title="name" label="Przedmiot">
                      <template v-slot:item="{ props, item }">
                        <v-list-item v-bind="props" :subtitle="item.raw.fieldOfStudy"></v-list-item>
                      </template>
                    </v-select>
                  </v-col>
                </v-row>
              </v-container>
            </v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="blue-darken-1" variant="text" @click="close">
                Anuluj
              </v-btn>
              <v-btn color="blue-darken-1" variant="text" @click="save">
                Zapisz
              </v-btn>
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
