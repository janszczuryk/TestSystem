<script setup lang="ts">
import {ref} from "vue";

const isPasswordVisible = ref(false);
</script>

<template>
  <v-container>
    <v-row>
      <v-col cols="12">
        <v-card class="mx-auto mt-6 py-4" color="accent3" max-width="480">
          <template #title>
            <h1 class="text-h5 text-center font-weight-bold">Logowanie</h1>
          </template>
        </v-card>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12">
        <v-card class="mx-auto pa-12 pb-8" elevation="2" max-width="480">
          <v-text-field
            density="compact"
            label="Adres e-mail"
            prepend-inner-icon="mdi-email-outline"
            type="email"
            variant="outlined"
          ></v-text-field>

          <v-text-field
            :append-inner-icon="isPasswordVisible ? 'mdi-eye-off' : 'mdi-eye'"
            :type="isPasswordVisible ? 'text' : 'password'"
            density="compact"
            label="Hasło"
            prepend-inner-icon="mdi-lock-outline"
            variant="outlined"
            @click:append-inner="isPasswordVisible = !isPasswordVisible"
          ></v-text-field>

          <v-btn
            class="my-4"
            color="primary"
            size="large"
            variant="elevated"
            block
          >
            Zaloguj się
          </v-btn>

          <v-card-text class="text-center">
            <RouterLink to="register" class="text-blue text-decoration-none">
              Utwórz konto
              <v-icon icon="mdi-chevron-right"></v-icon>
            </RouterLink>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<style scoped>

</style>
