import { defineStore } from "pinia";
import supabase from "../lib/supabase";
import { ref } from "vue";
import { useRouter } from "vue-router";



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
    }
  }


  return { user, createNewUser, signIn };
});
