<script setup>
  import { ref } from "vue";
  import { UserDataStore } from "@/stores/user";
  import { useForm } from "vee-validate";
  import * as yup from "yup";
  import { computed } from "vue";

  const userStore = UserDataStore();

  const { values, errors, defineField } = useForm({
    validationSchema: yup.object({
      email: yup.string().email().required(),
      password: yup.string().min(6).required(),
    }),
  });

  const [email, emailAttrs] = defineField("email");
  const [password, passwordAttrs] = defineField("password");

  const loading = ref(false);
  const passwordVisible = ref(false);

  const isFormValid = computed(() => {
    if (Object.keys(errors.value).length !== 0) {
      return false;
    } else if (Object.keys(values).length < 2) {
      return false;
    } else {
      return true;
    }
  });

  const backendErrorsState = ref({
    error: "",
    email: "",
    passowrd: "",
  });

  const handleSubmit = async () => {
    // to do handel actual submit here !
    loading.value = true;

    const backEndErrors = await userStore.login({
      ...values,
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
          <v-container class="py-16">
            <v-card-title>
              <h2 class="text-center mb-10">
                Memo
                <span class="text-purple">Master</span>
              </h2>
            </v-card-title>
            <form>
              <v-text-field
                class="mb-2"
                v-model="email"
                v-bind="emailAttrs"
                label="email "
                variant="outlined"
                :error-messages="errors.email || backendErrorsState.email || []"
              ></v-text-field>
              <v-text-field
                class="mb-2"
                v-model="password"
                v-bind="passwordAttrs"
                label="password"
                variant="outlined"
                :type="passwordVisible ? 'text' : 'password'"
                :error-messages="
                  errors.password || backendErrorsState.password || []
                "
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
                :disabled="!isFormValid"
              >
                sign up
              </v-btn>
            </form>

            <v-container class="d-flex justify-center align-center my-3">
              <v-divider class="w-25"></v-divider>
              <span class="text-grey mx-5">or</span>
              <v-divider class="w-25"></v-divider>
            </v-container>

            <p class="text-center text-grey">
              Are you new?
              <router-link to="/signup" class="text-purple">
                Create an Account
              </router-link>
            </p>
          </v-container>
        </v-card>
      </v-col>
    </v-row>
  </div>
</template>

<style lang="scss" scoped></style>
