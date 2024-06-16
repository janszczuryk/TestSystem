<script setup lang="ts">
import {onMounted, ref} from "vue";
import {useRouter} from "vue-router";
import {ApiClientHttpStatusError, useApiClient, useResponse} from "@/utils/api";
import {Account} from "@/types/account";

const api = useApiClient();
const router = useRouter();

const isPasswordVisible = ref(false);
const inputEmail = ref('');
const inputPassword = ref('');
const inputsError = ref('');

const loginAccount = async () => {
  const body = {
    email: inputEmail.value,
    password: inputPassword.value,
  };

  let response: Response;
  try {
    response = await api.post('auth/login', {body});
  } catch (error) {
    if (error instanceof ApiClientHttpStatusError) {
      if (error.statusCode === 401) {
        inputsError.value = 'Niepoprawny adres e-mail i/lub hasło.';
        return;
      }
    }

    throw error;
  }

  const data = await useResponse<Account & {jwtToken: string}>(response);
  const jwtToken = data.jwtToken;
  const account: Account = {
    id: data.id,
    email: data.email,
    isVerified: data.isVerified,
    type: data.type,
  };

  localStorage.setItem('jwtToken', jwtToken);
  localStorage.setItem('accountId', account.id);
  localStorage.setItem('accountEmail', account.email);
  localStorage.setItem('accountIsVerified', account.isVerified ? '1' : '0');
  localStorage.setItem('accountType', account.type);

  await router.push('/');
};

const redirectLoggedIn = () => {
  const isLoggedIn = localStorage.getItem('jwtToken') !== null;
  if (isLoggedIn) {
    router.push('/');
  }
}

onMounted(() => {
  redirectLoggedIn();
});
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
          <v-form @submit.prevent="loginAccount">
            <v-text-field
              density="compact"
              label="Adres e-mail"
              prepend-inner-icon="mdi-email-outline"
              type="email"
              variant="outlined"
              v-model="inputEmail"
              :error="!!inputsError.length"
            ></v-text-field>

            <v-text-field
              :append-inner-icon="isPasswordVisible ? 'mdi-eye-off' : 'mdi-eye'"
              :type="isPasswordVisible ? 'text' : 'password'"
              density="compact"
              label="Hasło"
              prepend-inner-icon="mdi-lock-outline"
              variant="outlined"
              @click:append-inner="isPasswordVisible = !isPasswordVisible"
              v-model="inputPassword"
              :error-messages="inputsError"
            ></v-text-field>

            <v-btn
              type="submit"
              class="my-4"
              color="primary"
              size="large"
              variant="elevated"
              block
            >
              Zaloguj się
            </v-btn>
          </v-form>

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
