<script setup lang="ts">
import Header from './layout/Header.vue';
import Footer from "@/components/layout/Footer.vue";
</script>

<template>
  <v-app>
    <Header/>

    <v-main>
      <slot/>
    </v-main>

    <Footer/>
  </v-app>
</template>

<style scoped>

</style>
