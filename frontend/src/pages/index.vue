<template>
  <v-container>
    <v-row>
      <v-col cols="12">
        <v-card class="mt-6 py-4" prepend-icon="mdi-newspaper-variant" color="accent3">
          <template #title>
            <h1 class="text-h5 font-weight-bold text-uppercase">Ogłoszenia</h1>
          </template>
        </v-card>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12">
        <v-card class="py-4" prepend-icon="mdi-school">
          <template #title>
            <h2 class="text-h6 font-weight-bold">Zacznij od rozwiązania testu</h2>
          </template>

          <template #subtitle>
            <div class="text-subtitle-1">
              Przejdź do zakładki testy i wybierz interesujący Cię test sposród dostępnej listy.
            </div>
          </template>

          <v-overlay
            opacity=".06"
            scrim="primary"
            contained
            model-value
            persistent
          />
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts" setup>
//
</script>
