import { ref } from "vue";
import { defineStore } from "pinia";
import { BASE_URL } from "@/utils/constants";

import { toast } from "vue3-toastify";
import "vue3-toastify/dist/index.css";

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

      // handle if the if the server responded with some errors
      if (data.error || !res.ok) {
        throw new Error(data.error || "error some thing went wrong !");
      }

      toast(`${data.message}`, {
        autoClose: 3000,
        type: "success",
        theme: "dark",
      });
      console.log(data);
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
