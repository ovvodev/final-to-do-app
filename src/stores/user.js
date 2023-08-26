import { defineStore } from "pinia";
import supabase from "../lib/supabase";
import { ref, watch } from "vue";

const authenticationStatus = ref(false);

export const useUserStore = defineStore("userStore", () => {
  const user = ref();

  const createNewUser = async (email, password) => {
    const { data, error } = await supabase.auth.signUp({
      email: email,
      password: password,
    });

    if (error) {
      console.log("Error", error);
    } else {
      console.log("Data", data);
      user.value = data;
      authenticationStatus.value = true;
    }
  };

  const signIn = async (email, password) => {

    const { data, error } = await supabase.auth.signInWithPassword({
      email: email,
      password: password,
    });
    if (error) {
      console.log("Error", error);

    } else {
      console.log("Data", data);
      user.value = data;
      authenticationStatus.value = true;
    }
  }

  const resetAuthenticationStatus = () => {
    authenticationStatus.value = false;
  };
  const signOut = async () => {
    await supabase.auth.signOut()
    authenticationStatus.value = false;
  }

  return { user, createNewUser, signIn, authenticationStatus, signOut, resetAuthenticationStatus };
});
