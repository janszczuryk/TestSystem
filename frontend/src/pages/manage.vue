<script setup lang="ts">
import Breadcrumbs from "@/components/Breadcrumbs.vue";
import SubjectCrud from "@/components/manage/SubjectCrud.vue";
import TestSchemaCrud from "@/components/manage/TestSchemaCrud.vue";
import TestSchemaQuestionCrud from "@/components/manage/TestSchemaQuestionCrud.vue";
import TestInstanceCrud from "@/components/manage/TestInstanceCrud.vue";
import TestInstanceLearnerCrud from "@/components/manage/TestInstanceLearnerCrud.vue";

const breadcrumbs = [
  { title: 'Test System', href: '/', disabled: true },
  { title: 'Zarządzanie', href: '/manage', disabled: false },
];
</script>

<template>
  <v-container>
    <v-row>
      <v-col cols="12">
        <Breadcrumbs :breadcrumbs="breadcrumbs"/>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12">
        <v-card class="mx-auto py-4" color="accent3" max-width="960">
          <template #title>
            <h1 class="text-h5 font-weight-bold text-center">Zarządzanie</h1>
          </template>
        </v-card>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12">
        <v-card class="mx-auto my-4 py-4" max-width="960">
          <SubjectCrud/>
        </v-card>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12">
        <v-card class="mx-auto my-4 py-4" max-width="960">
          <TestSchemaCrud/>
        </v-card>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12">
        <v-card class="mx-auto my-4 py-4" max-width="960">
          <TestSchemaQuestionCrud/>
        </v-card>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12">
        <v-card class="mx-auto my-4 py-4" max-width="960">
          <TestInstanceCrud/>
        </v-card>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12">
        <v-card class="mx-auto my-4 py-4" max-width="960">
          <TestInstanceLearnerCrud/>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<style scoped>

</style>
