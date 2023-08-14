<script setup>
import { useUserStore } from "@/stores/user";
import { ref } from "vue";
import { useRouter } from "vue-router";
import supabase from "../lib/supabase";

const userStore = useUserStore();
const newEmail = ref("");
const newPassword = ref("");

const currentEmail = ref("");
const currentPassword = ref("");
const router = useRouter();

const createNewUserchangeView = () => {
  router.push({ name: "mainview" }); // Correct the name to "mainView"
};
const signInchangeView = () => {
  router.push({ name: "mainview" }); // Correct the name to "mainView"
};
</script>

<template>
  <h1>To do list</h1>
  <input placeholder="Write your email" v-model="newEmail" />
  <input placeholder="Write your password" v-model="newPassword" />

  <button
    @click="
      userStore.createNewUser(newEmail, newPassword);
      createNewUserchangeView();
    "
  >
    Create New user
  </button>
  <div>
    <input placeholder="Write your email" v-model="currentEmail" />
    <input placeholder="Write your password" v-model="currentPassword" />

    <button
      @click="
        userStore.signIn(currentEmail, currentPassword);
        signInchangeView();
      "
    >
      Sign In
    </button>
  </div>
</template>
