<script setup lang="ts">
import { computed, nextTick, onMounted, ref, watch } from 'vue';
import { Subject } from "@/types/subject";
import { useAccount } from "@/composables/account";
import { useSubjectList } from "@/composables/subject";
import { useApiClient } from "@/utils/api";
import { SubjectApiService } from "@/utils/api-services/subject";

/**
 *  DATA
 */

const api = useApiClient();
const { account } = useAccount();

const { subjectList } = useSubjectList();
const headers = [
  { title: 'Nazwa', key: 'name' },
  { title: 'Kierunek studiów', key: 'fieldOfStudy' },
  { title: 'Akcje', key: 'actions', sortable: false },
];

const dialogUniversalTitle = computed(() => (actionItemIndex.value === -1 ? 'Dodaj nowy' : 'Edytuj'));
const dialogUniversal = ref(false);
const dialogDelete = ref(false);
const actionItemIndex = ref(-1);
const actionItem = ref<Subject>({
  id: '',
  name: '',
  fieldOfStudy: '',
  testSchemas: [],
  createdAt: '',
  updatedAt: '',
});
const defaultItem = {
  name: '',
  fieldOfStudy: '',
};

/**
 *  API SERVICES
 */

const subjectApiService = new SubjectApiService(account.value!, api);

/**
 *  DOM Event handlers
 */

const onActionEditItem = (item: Subject) => {
  actionItemIndex.value = subjectList.value.indexOf(item);
  Object.assign(actionItem.value, item);
  dialogUniversal.value = true;
};

const onActionDeleteItem = (item: Subject) => {
  actionItemIndex.value = subjectList.value.indexOf(item);
  Object.assign(actionItem.value, item);
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
    const updatedSubject = await subjectApiService.update(actionItem.value.id, {
      name: actionItem.value.name,
      fieldOfStudy: actionItem.value.fieldOfStudy,
    });

    Object.assign(subjectList.value[actionItemIndex.value], updatedSubject);
  } else {
    const createdSubject = await subjectApiService.create({
      name: actionItem.value.name,
      fieldOfStudy: actionItem.value.fieldOfStudy,
    });

    subjectList.value.push(createdSubject);
  }

  onCloseUniversalDialog();
};

const onDeleteItem = async () => {
  await subjectApiService.remove(actionItem.value.id);

  subjectList.value.splice(actionItemIndex.value, 1);

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

onMounted(async () => {
  subjectList.value = await subjectApiService.findAll();
});
</script>

<template>
  <v-data-table
    :headers="headers"
    :items="subjectList"
    :sort-by="[{ key: 'name', order: 'asc' }]"
  >
    <template v-slot:top>
      <v-toolbar flat color="white">
        <v-toolbar-title>Przedmioty</v-toolbar-title>
        <v-divider class="mx-4" inset vertical></v-divider>
        <v-spacer></v-spacer>
        <v-dialog v-model="dialogUniversal" max-width="500px">
          <template v-slot:activator="{ props }">
            <v-btn class="mb-2" color="primary" variant="elevated" v-bind="props">Dodaj nowy</v-btn>
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
                      v-model="actionItem.name"
                      variant="outlined"
                      label="Nazwa"
                    ></v-text-field>
                  </v-col>
                </v-row>
                <v-row>
                  <v-col>
                    <v-text-field
                      v-model="actionItem.fieldOfStudy"
                      variant="outlined"
                      label="Kierunek studiów"
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
