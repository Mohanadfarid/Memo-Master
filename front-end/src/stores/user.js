import { ref } from "vue";
import { defineStore } from "pinia";
import { BASE_URL } from "@/utils/constants";

import { toast } from "vue3-toastify";
import "vue3-toastify/dist/index.css";
import router from "@/router";

export const UserDataStore = defineStore("userData", () => {
  const id = ref(0);
  const token = ref("");
  const name = ref("");
  const age = ref(0);
  const email = ref("");

  const login = () => {
    console.log(BASE_URL);
  };
  const register = async registrationData => {
    try {
      const res = await fetch(`${BASE_URL}/users/registration`, {
        method: "POST",
        body: JSON.stringify(registrationData),
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await res.json();

      // handle spcific validation errors
      if(data.error){
        toast(`${data.error}`, {
          autoClose: 3000,
          type: "error",
          theme: "dark",
        });
        return data
      }

      // handle general req failure
      if (!res.ok) {
        throw new Error("error something went wrong !");
      }

      router.push('/login').then(()=>{
        toast(`${data.message}`, {
          autoClose: 3000,
          type: "success",
          theme: "dark",
        });
      })

    } catch (error) {
      toast(`${error}`, {
        autoClose: 3000,
        type: "error",
        theme: "dark",
      });
    }
  };
  const logout = () => {};
  const getUserData = () => {};
  const deleteUser = () => {};
  const patchUserData = () => {};

  return {
    id,
    token,
    name,
    age,
    email,
    login,
    register,
    logout,
    getUserData,
    deleteUser,
    patchUserData,
  };
});
