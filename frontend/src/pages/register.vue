<script setup lang="ts">
import { onMounted, ref } from "vue";
import { useRouter } from "vue-router";
import { useAccount } from "@/composables/account";
import { ApiClientHttpStatusError, useApiClient } from "@/utils/api";
import { AccountType } from "@/types/account";
import { rules } from "@/utils/form-validation";

const api = useApiClient();
const router = useRouter();
const { isLoggedAccount } = useAccount();

const isFormValid = ref(false);
const isPasswordVisible = ref(false);
const isPasswordSecondVisible = ref(false);
const inputEmail = ref('');
const inputPassword = ref('');
const inputPasswordSecond = ref('');
const inputEmailError = ref('');
const inputPasswordError = ref('');

const onFormSubmit = async () => {
  const body = {
    email: inputEmail.value,
    password: inputPassword.value,
    type: AccountType.LEARNER,
  };

  try {
    await api.post('auth/register', { body });
  } catch (error) {
    if (error instanceof ApiClientHttpStatusError) {
      if (error.statusCode === 409) {
        inputEmailError.value = 'Istnieje już konto z takim adresem e-mail.';
        return;
      }
    }

    throw error;
  }

  await router.push('/login');
};

const redirectLoggedIn = () => {
  if (isLoggedAccount()) {
    router.push('/');
  }
}

const onFormChange = () => {
  if (inputPassword.value !== inputPasswordSecond.value) {
    inputPasswordError.value = 'Hasła muszą być identyczne';
  } else {
    inputPasswordError.value = '';
  }
};

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
            <h1 class="text-h5 text-center font-weight-bold">Rejestracja</h1>
          </template>
        </v-card>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12">
        <v-card class="mx-auto pa-12 pb-8" elevation="2" max-width="480">
          <v-form v-model="isFormValid" @submit.prevent="onFormSubmit" @change="onFormChange">
            <v-text-field
              density="compact"
              label="Adres e-mail"
              prepend-inner-icon="mdi-email-outline"
              type="email"
              variant="outlined"
              v-model="inputEmail"
              :error-messages="inputEmailError"
              :rules="[rules.required, rules.isEmail]"
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
              :error-messages="inputPasswordError"
              :rules="[rules.required, rules.passwordLength]"
            ></v-text-field>

            <v-text-field
              :append-inner-icon="isPasswordSecondVisible ? 'mdi-eye-off' : 'mdi-eye'"
              :type="isPasswordSecondVisible ? 'text' : 'password'"
              density="compact"
              label="Powtórz hasło"
              prepend-inner-icon="mdi-lock-outline"
              variant="outlined"
              @click:append-inner="isPasswordSecondVisible = !isPasswordSecondVisible"
              v-model="inputPasswordSecond"
              :rules="[rules.required, rules.passwordLength]"
            ></v-text-field>

            <v-btn
              type="submit"
              class="my-4"
              color="primary"
              size="large"
              variant="elevated"
              block
              :disabled="!isFormValid"
            >
              Zarejestruj
            </v-btn>
          </v-form>

          <v-card-text class="text-center">
            <RouterLink to="login" class="text-blue text-decoration-none">
              Logowanie
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
