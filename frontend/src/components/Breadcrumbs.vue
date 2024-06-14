<script setup lang="ts">
export type BreadcrumbItem = {
  title: string,
  disabled: boolean,
  href: string,
};

defineProps<{ breadcrumbs: BreadcrumbItem[] }>();
</script>

<template>
  <v-breadcrumbs :items="breadcrumbs">
    <template v-slot:item="{ item }">
      <v-breadcrumbs-item :disabled="item.disabled">
        <RouterLink :to="item.href" class="text-black link">{{ item.title }}</RouterLink>
      </v-breadcrumbs-item>
    </template>
    <template #divider>
      <v-icon icon="mdi-chevron-right"></v-icon>
    </template>
  </v-breadcrumbs>
</template>

<style scoped>
.link {
  text-decoration: none;
}
.link:hover {
  text-decoration: underline;
}
</style>
