<script setup lang="ts">
import Breadcrumbs from "@/components/Breadcrumbs.vue";

const breadcrumbs = [
  { title: 'Test System', href: '/', disabled: true },
  { title: 'Błąd', href: '/tests', disabled: true },
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
            <h1 class="text-h5 font-weight-bold text-center">Nie znaleziono żądanej zawartości!</h1>
          </template>
          <template #text>
            <p class="text-center mt-4"><a class="link" @click="$router.go(-1)">Powrót</a></p>
          </template>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<style scoped>
.link {
  text-decoration: underline;
  cursor: pointer;
}
</style>
