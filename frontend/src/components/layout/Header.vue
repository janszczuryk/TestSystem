<script setup lang="ts">
import { useRoute, useRouter } from 'vue-router'
import { useAccount } from "@/composables/account";

const router = useRouter();
const route: any = useRoute();
const { account, isLoggedAccount, isAccountTeacher, isAccountLearner } = useAccount();

const handleRoute = (path: string): void => {
  router.push(path);
}

const isCurrentRoute = (path: string): boolean => {
  return path === route.path;
}
</script>

<template>
  <v-app-bar color="primary">
    <template #title>
      <span class="text-uppercase font-weight-bold mr-8">Test System</span>
      <v-btn
        prepend-icon="mdi-newspaper-variant"
        variant="text"
        :class="{ active: isCurrentRoute('/') }"
        @click="handleRoute('/')"
      >
        Ogłoszenia
      </v-btn>
      <v-btn
        v-if="isAccountLearner"
        prepend-icon="mdi-school"
        variant="text"
        :class="{ active: isCurrentRoute('/tests') }"
        @click="handleRoute('/tests')"
      >
        Testy
      </v-btn>
      <v-btn
        v-if="isAccountTeacher"
        prepend-icon="mdi-cog-box"
        variant="text"
        :class="{ active: isCurrentRoute('/manage') }"
        @click="handleRoute('/manage')"
      >
        Zarządzaj
      </v-btn>
    </template>

    <template #append>
      <span v-if="isLoggedAccount()">{{ account?.email }}</span>
      <v-btn
        v-if="isLoggedAccount()"
        prepend-icon="mdi-logout"
        variant="text"
        :class="{ active: isCurrentRoute('/logout') }"
        @click="handleRoute('/logout')"
      >
        Wyloguj
      </v-btn>
      <v-btn
        v-else
        prepend-icon="mdi-login"
        variant="text"
        :class="{ active: isCurrentRoute('/login') }"
        @click="handleRoute('/login')"
      >
        Zaloguj
      </v-btn>
    </template>
  </v-app-bar>
</template>

<style scoped>

</style>
