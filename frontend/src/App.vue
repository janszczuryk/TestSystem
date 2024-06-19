<template>
  <Layout>
    <router-view/>
  </Layout>
</template>

<script setup lang="ts">
import Layout from "@/components/Layout.vue";
import { onMounted } from "vue";
import { getAccount, getAuthToken, removeAccount, removeAuthToken } from "@/utils/local-storage";
import { useAccount } from "@/composables/account";

const { loginAccount, logoutAccount } = useAccount();

onMounted(() => {
  const authToken = getAuthToken();
  const account = getAccount();

  if (!authToken || !account) {
    removeAuthToken();
    removeAccount();

    logoutAccount();
  } else {
    loginAccount(Object.assign(account, { jwtToken: authToken }));
  }
});
</script>
