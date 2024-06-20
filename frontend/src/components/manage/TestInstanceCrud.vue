<script setup lang="ts">
import { computed, nextTick, ref, watch } from 'vue';
import { useAccount } from "@/composables/account";
import { useTestSchemaList } from "@/composables/test-schema";
import { useTestInstanceList } from "@/composables/test-instance";
import { useTestInstanceQuestionList } from "@/composables/test-instance-question";
import { useApiClient } from "@/utils/api";
import { getLocalizedDate } from "@/utils/date";
import { unrefDeep } from "@/utils/ref";
import { TestInstanceApiService } from "@/utils/api-services/test-instance";
import { getTestInstanceStatusName } from "@/utils/test-instance";
import { TestInstance, TestInstanceStatus } from "@/types/test-instance";
import TestInstanceQuestionTable from './TestInstanceQuestionTable.vue';

/**
 *  DATA
 */

const api = useApiClient();
const { account } = useAccount();

const { testInstanceQuestionList } = useTestInstanceQuestionList();

const { testSchemaList } = useTestSchemaList();
const testSchemaId = ref<string | null>(null);

const { testInstanceList } = useTestInstanceList();
const headers = [
  { title: 'Ilość pytań', key: 'questionsCount' },
  { title: 'Pytania', key: 'questionsDialog', sortable: false },
  { title: 'Włączono', key: 'isEnabled' },
  { title: 'Status', key: 'status' },
  { title: 'Rozpoczęto', key: 'startedAt' },
  { title: 'Zakończono', key: 'endedAt' },
  { title: 'Akcje', key: 'actions', sortable: false },
];

const dialogUniversalTitle = computed(() => (actionItemIndex.value === -1 ? 'Dodaj nową' : 'Edytuj'));
const dialogUniversal = ref(false);
const dialogDelete = ref(false);
const dialogQuestions = ref(false);
const actionItemIndex = ref(-1);
const actionItem = ref<TestInstance>({
  id: '',
  schema: {
    id: '',
  },
  questionsCount: 0,
  questionsPool: [],
  isEnabled: false,
  status: TestInstanceStatus.CREATED,
  startedAt: null,
  endedAt: null,
  teacher: {
    id: '',
  },
  updatedAt: '',
  createdAt: '',
});
const defaultItem = {
  questionsCount: 0,
  isEnabled: false,
};

/**
 *  API SERVICES
 */

const testInstanceApiService = new TestInstanceApiService(account.value!, api);

/**
 *  DOM Event handlers
 */

const onActionEditItem = (item: TestInstance) => {
  actionItemIndex.value = testInstanceList.value.indexOf(item);
  Object.assign(actionItem.value, unrefDeep(item));
  dialogUniversal.value = true;
};

const onActionDeleteItem = (item: TestInstance) => {
  actionItemIndex.value = testInstanceList.value.indexOf(item);
  Object.assign(actionItem.value, unrefDeep(item));
  dialogDelete.value = true;
};

const onActionStartItem = async (item: TestInstance) => {
  actionItemIndex.value = testInstanceList.value.indexOf(item);

  const startedTestInstance = await testInstanceApiService.start(testSchemaId.value!, item.id);

  Object.assign(testInstanceList.value[actionItemIndex.value], startedTestInstance);

  actionItemIndex.value = -1;
};

const onActionEndItem = async (item: TestInstance) => {
  actionItemIndex.value = testInstanceList.value.indexOf(item);

  const endedTestInstance = await testInstanceApiService.end(testSchemaId.value!, item.id);

  Object.assign(testInstanceList.value[actionItemIndex.value], endedTestInstance);

  actionItemIndex.value = -1;
}

const onShowQuestionsClick = async (item: TestInstance) => {
  const testInstanceWithQuestions = await testInstanceApiService.get(item.schema.id, item.id);
  testInstanceQuestionList.value = testInstanceWithQuestions.questionsPool;

  dialogQuestions.value = true;
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

const onCloseQuestionsDialog = () => {
  dialogQuestions.value = false;
};

const onSaveItem = async () => {
  if (actionItemIndex.value > -1) {
    const updatedTestInstance = await testInstanceApiService.update(testSchemaId.value!, actionItem.value.id, {
      questionsCount: Number(actionItem.value.questionsCount),
      isEnabled: actionItem.value.isEnabled,
    });

    Object.assign(testInstanceList.value[actionItemIndex.value], updatedTestInstance);
  } else {
    const createdTestInstance = await testInstanceApiService.create(testSchemaId.value!, {
      questionsCount: Number(actionItem.value.questionsCount),
      isEnabled: actionItem.value.isEnabled,
    });

    testInstanceList.value.push(createdTestInstance);
  }

  onCloseUniversalDialog();
};

const onDeleteItem = async () => {
  await testInstanceApiService.remove(actionItem.value.schema.id, actionItem.value.id);

  testInstanceList.value.splice(actionItemIndex.value, 1);

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
watch(dialogQuestions, (value) => {
  if (!value) onCloseQuestionsDialog();
});

watch(testSchemaId, async () => {
  if (testSchemaId.value) {
    testInstanceList.value = await testInstanceApiService.findAll(testSchemaId.value);
  }
});
</script>

<template>
  <v-data-table
    :headers="headers"
    :items="testInstanceList"
    :sort-by="[{ key: 'isEnabled', order: 'desc' }]"
  >
    <template v-slot:top>
      <v-toolbar flat color="white">
        <v-toolbar-title>Instance testów</v-toolbar-title>
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
        <v-dialog v-model="dialogUniversal" max-width="640px">
          <template v-slot:activator="{ props }">
            <v-btn class="mb-2 ml-4" color="primary" variant="elevated" v-bind="props" :disabled="!testSchemaId">
              Dodaj nową
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
                      v-model="actionItem.questionsCount"
                      type="number"
                      variant="outlined"
                      label="Ilość pytań"
                      hint="Na podstawie tej wartości system wylosuje pytania do tej instancji testu"
                      :persistent-hint="true"
                    ></v-text-field>
                  </v-col>
                </v-row>
                <v-row>
                  <v-col>
                    <v-checkbox
                      v-model="actionItem.isEnabled"
                      label="Włączono"
                      hint="Ustawienie kontroluje, czy instancja testu jest widoczna na liście testów"
                      :persistent-hint="true"
                    ></v-checkbox>
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
        <v-dialog v-model="dialogDelete" max-width="640px">
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
        <v-dialog v-model="dialogQuestions" max-width="960px">
          <v-card>
            <v-card-title class="text-h5">Pytania</v-card-title>
            <v-card-text>
              <TestInstanceQuestionTable :questionsPool="testInstanceQuestionList"/>
            </v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="blue-darken-1" variant="text" @click="onCloseQuestionsDialog">Zamknij</v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-toolbar>
    </template>
    <template v-slot:item.questionsDialog="{ item }">
      <v-btn density="compact" @click="onShowQuestionsClick(item)">Zobacz</v-btn>
    </template>
    <template v-slot:item.isEnabled="{ item }">
      {{ item.isEnabled ? 'Tak' : 'Nie' }}
    </template>
    <template v-slot:item.status="{ item }">
      {{ getTestInstanceStatusName(item.status) }}
    </template>
    <template v-slot:item.startedAt="{ item }">
      {{ getLocalizedDate(item.startedAt) }}
    </template>
    <template v-slot:item.endedAt="{ item }">
      {{ getLocalizedDate(item.endedAt) }}
    </template>
    <template v-slot:item.actions="{ item }">
      <v-icon
        size="small"
        class="mr-2"
        title="Rozpocznij instancję, aby dać możliwość rozwiązywania dla uczestników"
        @click="onActionStartItem(item)"
        :disabled="item.status !== TestInstanceStatus.CREATED"
      >
        mdi-play-circle
      </v-icon>
      <v-icon
        size="small"
        class="mr-2"
        title="Zakończ instancję, aby zablokować rozwiązywania dla uczestników"
        @click="onActionEndItem(item)"
        :disabled="item.status !== TestInstanceStatus.STARTED"
      >
        mdi-stop-circle
      </v-icon>
      <v-icon size="small" class="mr-2" @click="onActionEditItem(item)">
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
