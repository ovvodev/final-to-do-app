<script setup>
import { useUserStore } from "@/stores/user";
import { ref } from "vue";
import { useRouter } from "vue-router";
import supabase from "../lib/supabase";
import Button from "primevue/button";
import InputText from "primevue/inputtext";
import Checkbox from "primevue/checkbox";

const userStore = useUserStore();
const newEmail = ref("");
const newPassword = ref("");

const currentEmail = ref("");
const currentPassword = ref("");
const router = useRouter();

const changeView = () => {
  router.push({ path: "/mainview" });
};

const handleSignIn = async () => {
  const result = await userStore.signIn(
    currentEmail.value,
    currentPassword.value
  );
  if (userStore.authenticationStatus === true) {
    changeView();
    console.log(userStore.authenticationStatus);
  }
};
const handleCreateUser = async () => {
  const result = await userStore.createNewUser(
    newEmail.value,
    newPassword.value
  );
  if (userStore.authenticationStatus === true) {
    changeView();
    console.log(userStore.authenticationStatus);
  }
};
let toggleTrue = ref(true);
function toggleSignOption() {
  if (toggleTrue.value === true) {
    return (toggleTrue.value = false);
  } else {
    return (toggleTrue.value = true);
  }
}
</script>

<template>
  <!--<h1>To do list</h1>
  <input placeholder="Write your email" v-model="newEmail" />
  <input placeholder="Write your password" v-model="newPassword" />

  <button @click="handleCreateUser">Create New user</button>
  <div>
    <input placeholder="Write your email" v-model="currentEmail" />
    <input placeholder="Write your password" v-model="currentPassword" />

    <button @click="handleSignIn">Sign In</button>
  </div>
-->
  <div
    class="surface-card p-4 shadow-2 border-round w-full lg:w-6 p-d-flex p-jc-center"
  >
    <div class="text-center mb-5">
      <img
        src="https://www.howtoanalyzedata.net/wp-content/uploads/2020/10/Microsoft_To-Do_icon.png"
        alt="Image"
        height="50"
        class="mb-3"
      />
      <div v-if="toggleTrue">
        <div class="text-900 text-3xl font-medium mb-3">Welcome Back</div>
        <span class="text-600 font-medium line-height-3"
          >Don't have an account?</span
        >
        <a
          class="font-medium no-underline ml-2 text-blue-500 cursor-pointer"
          @click="toggleSignOption"
          >Create today!</a
        >
      </div>
      <div v-else>
        <span class="text-600 font-medium line-height-3"
          >You have an account?</span
        >
        <a
          class="font-medium no-underline ml-2 text-blue-500 cursor-pointer"
          @click="toggleSignOption"
          >Sign in!</a
        >
      </div>
    </div>

    <div>
      <label for="email1" class="block text-900 font-medium mb-2">Email</label>
      <InputText
        v-if="toggleTrue"
        id="email1"
        type="text"
        placeholder="Email address"
        class="w-full mb-3"
        v-model="currentEmail"
      />
      <InputText
        v-else
        id="email2"
        type="text"
        placeholder="Your Email address"
        class="w-full mb-3"
        v-model="newEmail"
      />
      <label for="password1" class="block text-900 font-medium mb-2"
        >Password</label
      >
      <InputText
        v-if="toggleTrue"
        id="password1"
        type="password"
        placeholder="Password"
        class="w-full mb-3"
        v-model="currentPassword"
      />
      <InputText
        v-else
        id="password2"
        type="password"
        placeholder="Create your Password"
        class="w-full mb-3"
        v-model="newPassword"
      />

      <div class="flex align-items-center justify-content-between mb-6">
        <a
          class="font-medium no-underline ml-2 text-blue-500 text-right cursor-pointer"
          >Forgot password?</a
        >
      </div>

      <Button
        v-if="toggleTrue"
        label="Sign In"
        icon="pi pi-user"
        class="w-full"
        @click="handleSignIn"
      ></Button>
      <Button
        v-else
        label="Create your account"
        icon="pi pi-user"
        class="w-full"
        @click="handleCreateUser"
      ></Button>
    </div>
  </div>
</template>
<style>
.surface-card {
  margin: 20px auto;
}
</style>
