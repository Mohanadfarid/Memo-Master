<script setup>
  import { ref } from "vue";

  const username = ref("");
  const password = ref("");
  const name = ref("");
  const age = ref("");

  const handleSubmit = () => {
    // to do handel actual submit here !
    console.log(username.value, password.value);
  };
</script>

<template>
  <div
    class="w-100 d-flex justify-center align-center bg-purple-lighten-3"
    style="min-height: 100vh"
  >
    <v-row class="d-flex justify-center">
      <v-col cols="11" md="8" xl="6">
        <v-card class="elevation-3 rounded d-flex">
          <v-img
            class="d-none d-lg-inline-block"
            :width="500"
            aspect-ratio="16/9"
            cover
            src="https://picsum.photos/1000/1000?random"
          ></v-img>
          <v-container class="py-6">
            <v-card-title>
              <h2 class="text-center mb-10">
                Memo
                <span class="text-purple">Master</span>
              </h2>
            </v-card-title>
            <form>
              <v-text-field
                v-model="name"
                label="name"
                variant="outlined"
              ></v-text-field>
              <v-text-field
                v-model="age"
                type="number"
                label="age"
                variant="outlined"
              ></v-text-field>
              <v-text-field
                v-model="username"
                label="email or username"
                variant="outlined"
              ></v-text-field>
              <v-text-field
                v-model="password"
                label="password"
                variant="outlined"
              ></v-text-field>

              <v-btn
                class="mt-5 mx-auto w-100"
                @click.prevent="handleSubmit"
                size="large"
                color="purple"
              >
                sign in
              </v-btn>
            </form>

            <v-container class="d-flex justify-center align-center my-3">
              <v-divider class="w-25"></v-divider>
              <span class="text-grey mx-5">or</span>
              <v-divider class="w-25"></v-divider>
            </v-container>

            <p class="text-center text-grey">
              Already a member ?
              <router-link to="/login" class="text-purple">
                login now
              </router-link>
            </p>
          </v-container>
        </v-card>
      </v-col>
    </v-row>
  </div>
</template>

<style lang="scss" scoped></style>
