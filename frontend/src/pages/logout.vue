<script setup lang="ts">
import {useRouter} from "vue-router";
import {removeAccount, removeAuthToken} from "@/utils/local-storage";
import {useAccount} from "@/composables/account";
import {onMounted} from "vue";

const router = useRouter();
const {logoutAccount, isLoggedAccount} = useAccount();

const logout = async () => {
  removeAuthToken();
  removeAccount();

  logoutAccount();

  await router.push('/login');
}

const redirectLoggedOut = () => {
  if (!isLoggedAccount()) {
    router.push('/login');
  }
}

onMounted(async () => {
  redirectLoggedOut();
  await logout();
});
</script>

<template>
  <div></div>
</template>

<style scoped>

</style>
