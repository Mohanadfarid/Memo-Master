import { ref } from "vue";
import { defineStore } from "pinia";
import { BASE_URL } from "@/utils/constants";

import { toast } from "vue3-toastify";
import "vue3-toastify/dist/index.css";
import router from "@/router";

export const UserDataStore = defineStore("userData", () => {
  const token = ref(localStorage.getItem("memoMaster-authToken") || "");
  const name = ref(localStorage.getItem("memoMaster-userName") || "");
  const email = ref(localStorage.getItem("memoMaster-userEmail") || "");

  const login = async loginData => {
    try {
      const res = await fetch(`${BASE_URL}/users/login`, {
        method: "POST",
        body: JSON.stringify(loginData),
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await res.json();

      // handle spcific validation errors
      if (data.error) {
        toast(`${data.error}`, {
          autoClose: 3000,
          type: "error",
          theme: "dark",
        });
        return data;
      }

      // handle general req failure
      if (!res.ok) {
        throw new Error("error something went wrong !");
      }

      // setting the store data
      token.value = data.token;
      name.value = data.name;
      email.value = data.email;

      // setting the local storage data
      localStorage.setItem("memoMaster-authToken", data.token);
      localStorage.setItem("memoMaster-userName", data.name);
      localStorage.setItem("memoMaster-userAge", data.age);
      localStorage.setItem("memoMaster-userEmail", data.email);

      router.push("/").then(() => {
        toast(`${data.message}`, {
          autoClose: 3000,
          type: "success",
          theme: "dark",
        });
      });
    } catch (error) {
      toast(`${error}`, {
        autoClose: 3000,
        type: "error",
        theme: "dark",
      });
    }
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
      if (data.error) {
        toast(`${data.error}`, {
          autoClose: 3000,
          type: "error",
          theme: "dark",
        });
        return data;
      }

      // handle general req failure
      if (!res.ok) {
        throw new Error("error something went wrong !");
      }

      router.push("/login").then(() => {
        toast(`${data.message}`, {
          autoClose: 3000,
          type: "success",
          theme: "dark",
        });
      });
    } catch (error) {
      toast(`${error}`, {
        autoClose: 3000,
        type: "error",
        theme: "dark",
      });
    }
  };
  const logout = () => {};

  const getUserData = async () => {
    try {
      const res = await fetch(`${BASE_URL}/users/`, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await res.json();
      return data;
    } catch (error) {
      toast(`${error}`, {
        autoClose: 3000,
        type: "error",
        theme: "dark",
      });
    }
  };
  const deleteUser = () => {};
  const patchUserData = () => {};

  return {
    token,
    name,
    email,
    login,
    register,
    logout,
    getUserData,
    deleteUser,
    patchUserData,
  };
});
