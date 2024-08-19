<script setup>
  import { UserDataStore } from "@/stores/user";
  import { ref } from "vue";
  const userStore = UserDataStore();

  const email = ref("");
  const password = ref("");
  const name = ref("");
  const age = ref("");
  const imageUrl = ref("");

  const loading = ref(false);

  const backendErrorsState = ref({
    error: "",
    email: "",
    name: "",
    age: "",
    password:""
  });

  const passwordVisible = ref(true);

  const handleSubmit = async () => {
    loading.value = true;
    const backEndErrors = await userStore.register({
      name: name.value,
      email: email.value,
      age: age.value,
      password: password.value,
      imageUrl: imageUrl.value,
    });
    loading.value = false;
    // if the back end responded with errors we set their values
    if (backEndErrors) {
      console.log(backEndErrors);
      backendErrorsState.value = { ...backEndErrors };
    }
  };
</script>

<template>
  <div
    class="w-100 d-flex justify-center align-center bg-purple-lighten-3"
    style="min-height: 100vh"
  >
    <v-row class="d-flex justify-center">
      <v-col cols="11" md="8" xl="6">
        <v-card
          :loading="loading"
          class="elevation-3 rounded d-flex animate__animated animate__fadeInUp"
        >
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
                class="mb-2"
                v-model="name"
                label="name"
                :error-messages="backendErrorsState.name || []"
                variant="outlined"
              ></v-text-field>

              <v-text-field
                class="mb-2"
                v-model="age"
                type="number"
                label="age"
                :error-messages="backendErrorsState.age || []"
                variant="outlined"
              ></v-text-field>

              <v-text-field
                class="mb-2"
                v-model="email"
                label="email"
                type="email"
                :error-messages="backendErrorsState.email || []"
                variant="outlined"
              ></v-text-field>

              <v-text-field
                class="mb-2"
                v-model="imageUrl"
                label="imageUrl"
                variant="outlined"
              ></v-text-field>

              <v-text-field
                class="mb-2"
                v-model="password"
                label="password"
                :type="passwordVisible ? 'text' : 'password'"
                :error-messages="backendErrorsState.password || []"
                variant="outlined"
              >
                <template #append-inner>
                  <v-icon @click="passwordVisible = !passwordVisible">
                    {{
                      passwordVisible
                        ? "mdi-eye-off-outline"
                        : "mdi-eye-outline"
                    }}
                  </v-icon>
                </template>
              </v-text-field>

              <v-btn
                class="mt-5 mx-auto w-100"
                @click.prevent="handleSubmit"
                size="large"
                color="purple"
                :loading="loading"
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
