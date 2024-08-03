<script setup>
  import { ref } from "vue";

  const name = ref("");
  const age = ref("");
  const email = ref("");
  const bio = ref("");


</script>

<template>
  <v-row class="d-flex justify-center align-center">
    <v-col cols="12" md="10" xl="8">
      <v-card
        class="ma-5 pa-5 pa-md-15 animate__animated animate__fadeIn "
        elevation="15"
      >
      <v-img></v-img>
        <h2 class="text-center">Profile page</h2>
        <v-form>
          <!-- name -->
          <v-text-field
            class="my-3"
            label="name"
            v-model="name"
            prepend-icon="mdi-account"
            variant="outlined"
          ></v-text-field>

          <!-- email -->
          <v-text-field
            class="my-3"
            label="email"
            v-model="email"
            prepend-icon="mdi-email"
            variant="outlined"
          ></v-text-field>

          <!-- age -->
          <v-text-field
            class="my-3"
            label="age"
            v-model="age"
            prepend-icon="mdi-cake"
            variant="outlined"
          ></v-text-field>

          <!-- bio -->
          <v-textarea
            class="my-3"
            auto-grow
            label="bio"
            v-model="bio"
            prepend-icon="mdi-pencil"
            variant="outlined"
          ></v-textarea>

          <!-- actions -->
          <div class="d-flex justify-center">
            <v-btn
              class="mr-5"
              color="purple"
              prepend-icon="$vuetify"
              @click="handleSubmit"
            >
              Save
            </v-btn>
            <v-btn color="red" @click="handleReset">reset?</v-btn>
          </div>
        </v-form>
      </v-card>
    </v-col>
  </v-row>
</template>

<style></style>
