<script setup lang="ts">
import { nextTick, ref, watch } from 'vue';
import { useAccount } from "@/composables/account";
import { useTestInstanceLearnerAnswerList } from "@/composables/test-instance-learner-answer";
import { useTestInstanceLearnerList } from "@/composables/test-instance-learner";
import { useTestSchemaList } from "@/composables/test-schema";
import { TestInstance } from "@/types/test-instance";
import { TestInstanceLearner, TestInstanceLearnerStatus } from "@/types/test-instance-learner";
import { useApiClient } from "@/utils/api";
import { TestInstanceLearnerApiService } from "@/utils/api-services/test-instance-learner";
import { TestInstanceApiService } from "@/utils/api-services/test-instance";
import { getLocalizedDate } from "@/utils/date";
import { unrefDeep } from "@/utils/ref";
import { getTestInstanceStatusName } from "@/utils/test-instance";
import { getTestInstanceLearnerStatusName } from "@/utils/test-instance-learner";
import TestInstanceLearnerAnswerTable from "./TestInstanceLearnerAnswerTable.vue";

/**
 *  DATA
 */

const api = useApiClient();
const { account } = useAccount();

const { testInstanceLearnerAnswerList } = useTestInstanceLearnerAnswerList();

const { testSchemaList } = useTestSchemaList();
const testSchemaId = ref<string | null>(null);
const testInstanceList = ref<TestInstance[]>([]);
const testInstanceId = ref<string | null>(null);

const resultSummarySort = (a: TestInstanceLearner, b: TestInstanceLearner) => {
  if (a.resultSummary.percentage < b.resultSummary.percentage) return -1;
  if (a.resultSummary.percentage > b.resultSummary.percentage) return 1;
  return 0;
};
const { testInstanceLearnerList } = useTestInstanceLearnerList();
const headers = [
  { title: 'Numer uczestnika', key: 'learnerNumber' },
  { title: 'Status', key: 'status' },
  { title: 'Rozpoczęto podejście', key: 'startedAt' },
  { title: 'Zakończono podejście', key: 'finishedAt' },
  { title: 'Odpowiedzi', key: 'answersDialog', sortable: false },
  { title: 'Wynik', key: 'resultSummary', sortRaw: resultSummarySort },
  { title: 'Akcje', key: 'actions', sortable: false },
];

const dialogEdit = ref(false);
const dialogDelete = ref(false);
const dialogAnswers = ref(false);
const actionItemIndex = ref(-1);
const actionItem = ref<TestInstanceLearner>({
  instanceId: '',
  learnerId: '',
  learnerNumber: 0,
  answers: [],
  resultSummary: {
    pointsToAchieve: 0,
    pointsAchieved: 0,
    percentage: 0,
  },
  status: TestInstanceLearnerStatus.JOINED,
  startedAt: null,
  finishedAt: null,
  updatedAt: '',
  createdAt: '',
});
const defaultItem = {
  learnerNumber: 0,
};

/**
 *  API SERVICES
 */

const testInstanceLearnerApiService = new TestInstanceLearnerApiService(account.value!, api);
const testInstanceApiService = new TestInstanceApiService(account.value!, api);

/**
 *  DOM Event handlers
 */

const onActionEditItem = (item: TestInstanceLearner) => {
  actionItemIndex.value = testInstanceLearnerList.value.indexOf(item);
  Object.assign(actionItem.value, unrefDeep(item));
  dialogEdit.value = true;
};

const onActionDeleteItem = (item: TestInstanceLearner) => {
  actionItemIndex.value = testInstanceLearnerList.value.indexOf(item);
  Object.assign(actionItem.value, unrefDeep(item));
  dialogDelete.value = true;
};

const onShowAnswersClick = async (item: TestInstanceLearner) => {
  const testInstanceLearnerWithAnswers = await testInstanceLearnerApiService.get(item.instanceId, item.learnerId);
  testInstanceLearnerAnswerList.value = testInstanceLearnerWithAnswers.answers;

  dialogAnswers.value = true;
};

const onCloseEditDialog = () => {
  dialogEdit.value = false;
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

const onCloseAnswersDialog = () => {
  dialogAnswers.value = false;
};

const onSaveItem = async () => {
  if (actionItemIndex.value > -1) {
    const updatedTestInstanceLearner = await testInstanceLearnerApiService.update(actionItem.value.instanceId, actionItem.value.learnerId, {
      learnerNumber: Number(actionItem.value.learnerNumber),
    })

    Object.assign(testInstanceLearnerList.value[actionItemIndex.value], updatedTestInstanceLearner);
  }

  onCloseEditDialog();
};

const onDeleteItem = async () => {
  await testInstanceLearnerApiService.remove(actionItem.value.instanceId, actionItem.value.learnerId);

  testInstanceLearnerList.value.splice(actionItemIndex.value, 1);

  onCloseDeleteDialog();
};

/**
 *  HOOKS
 */

watch(dialogEdit, (value) => {
  if (!value) onCloseEditDialog();
});
watch(dialogDelete, (value) => {
  if (!value) onCloseDeleteDialog();
});
watch(dialogAnswers, (value) => {
  if (!value) onCloseAnswersDialog();
});

watch(testSchemaId, async () => {
  if (testSchemaId.value) {
    testInstanceList.value = await testInstanceApiService.findAll(testSchemaId.value);
  } else {
    testInstanceList.value = [];
    testInstanceId.value = null;
  }
});
watch(testInstanceId, async () => {
  if (testInstanceId.value) {
    testInstanceLearnerList.value = await testInstanceLearnerApiService.findAll(testInstanceId.value);
  } else {
    testInstanceLearnerList.value = [];
  }
});
</script>

<template>
  <v-data-table
    :headers="headers"
    :items="testInstanceLearnerList"
    :sort-by="[{ key: 'learnerNumber', order: 'asc' }]"
  >
    <template v-slot:top>
      <v-toolbar flat color="white">
        <v-toolbar-title>Uczestnicy w instancji testu</v-toolbar-title>
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
          max-width="240"
          class="mx-2 ml-0"
        >
        </v-select>
        <v-select
          v-model="testInstanceId"
          :items="testInstanceList"
          item-value="id"
          :item-props="(item) => ({
            title: `Status: ${getTestInstanceStatusName(item.status)}`,
            subtitle: `Rozpoczęto: ${getLocalizedDate(item.startedAt)} Zakończono: ${getLocalizedDate(item.endedAt)}`,
          })"
          variant="outlined"
          density="compact"
          label="Instancja testu"
          hide-details
          max-width="240"
          class="mx-2 mr-4"
        >
        </v-select>
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
                      v-model="actionItem.learnerNumber"
                      type="number"
                      variant="outlined"
                      label="Number uczestnitka"
                    ></v-text-field>
                  </v-col>
                </v-row>
              </v-container>
            </v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="blue-darken-1" variant="text" @click="onCloseEditDialog">Anuluj</v-btn>
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
        <v-dialog v-model="dialogAnswers" max-width="1280px">
          <v-card>
            <v-card-title class="text-h5">Odpowiedzi uczestnika</v-card-title>
            <v-card-text>
              <TestInstanceLearnerAnswerTable :testInstanceLearnerAnswers="testInstanceLearnerAnswerList"/>
            </v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="blue-darken-1" variant="text" @click="onCloseAnswersDialog">Zamknij</v-btn>
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
      <v-btn density="compact" @click="onShowAnswersClick(item)">Zobacz</v-btn>
    </template>
    <template v-slot:item.resultSummary="{ item }">
      {{ item.resultSummary.pointsAchieved }} / {{ item.resultSummary.pointsToAchieve }} ({{ item.resultSummary.percentage }}%)
    </template>
    <template v-slot:item.actions="{ item }">
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
