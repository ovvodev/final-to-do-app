<script setup>
import { useUserStore } from "@/stores/user";
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";

import NavBar from "./NavBar.vue";

import Button from "primevue/button";

const userStore = useUserStore();
const newEmail = ref("");
const newPassword = ref("");

const currentEmail = ref("");
const currentPassword = ref("");
const router = useRouter();

onMounted(() => {
  // Reset authentication status when returning to login/signup page
  userStore.resetAuthenticationStatus();
});
const changeView = () => {
  router.push({ path: "/mainview" });
};

const handleSignIn = async () => {
  await userStore.signIn(currentEmail.value, currentPassword.value);
  if (userStore.authenticationStatus === true) {
    changeView();
    console.log(userStore.authenticationStatus);
  }
};
const handleCreateUser = async () => {
  await userStore.createNewUser(newEmail.value, newPassword.value);
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
  <div class="dark:bg-zinc-900">
    <NavBar></NavBar>

    <div
      v-if="toggleTrue"
      class="dark:text-stone-100 dark:bg-zinc-900 flex items-center min-h-screen font-mono"
    >
      <div class="container mx-auto dark:bg-zinc-900 dark:text-stone-100">
        <div
          class="max-w-md mx-auto my-10 dark:bg-zinc-900 dark:text-stone-100"
        >
          <div class="text-center dark:bg-zinc-900">
            <h1
              class="my-3 text-3xl font-semibold dark:text-stone-100 text-gray-700"
            >
              Sign in
            </h1>
            <p class="text-gray-500 dark:text-gray-100 font-sans">
              Sign in to access your account
            </p>
          </div>
          <div class="m-7">
            <form action="">
              <div class="mb-6">
                <label
                  for="email"
                  class="block mb-2 text-sm text-gray-600 dark:text-gray-400"
                  >Email Address</label
                >
                <input
                  v-model="currentEmail"
                  type="email"
                  name="email"
                  placeholder="you@company.com"
                  class="w-full px-3 py-2 placeholder-gray-300 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-indigo-100 focus:border-indigo-300 dark:bg-gray-700 dark:text-white dark:placeholder-gray-500 dark:border-gray-600 dark:focus:ring-gray-900 dark:focus:border-gray-500"
                />
              </div>
              <div class="mb-6">
                <div class="flex justify-between mb-2">
                  <label
                    for="password"
                    class="text-sm text-gray-600 dark:text-gray-400"
                    >Password</label
                  >
                  <a
                    href="#!"
                    class="text-sm text-gray-400 focus:outline-none focus:text-indigo-500 hover:text-indigo-500 dark:hover:text-indigo-300"
                    >Forgot password?</a
                  >
                </div>
                <input
                  v-model="currentPassword"
                  type="password"
                  name="password"
                  placeholder="Your Password"
                  class="w-full px-3 py-2 placeholder-gray-300 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-indigo-100 focus:border-indigo-300 dark:bg-gray-700 dark:text-white dark:placeholder-gray-500 dark:border-gray-600 dark:focus:ring-gray-900 dark:focus:border-gray-500"
                />
              </div>
              <div class="mb-6 dark:text-stone-100">
                <button
                  @click="handleSignIn"
                  type="button"
                  class="dark:text-stone-100 w-full px-3 py-4 text-white bg-indigo-500 rounded-md focus:bg-indigo-600 focus:outline-none"
                >
                  Sign in
                </button>
              </div>
              <p class="text-sm text-center text-gray-400 dark:text-stone-100">
                Don&#x27;t have an account yet?
                <a
                  @click="toggleSignOption"
                  class="cursor-pointer text-indigo-400 focus:outline-none focus:underline focus:text-indigo-500 dark:focus:border-indigo-800"
                  >Sign up</a
                >.
              </p>
            </form>
          </div>
        </div>
      </div>
    </div>
    <div
      v-else
      class="dark:text-stone-200 dark:bg-zinc-900 flex items-center min-h-screen bg-white font-mono"
    >
      <div class="container mx-auto dark:bg-zinc-900">
        <div class="max-w-md mx-auto my-10 dark:bg-zinc-900">
          <div class="text-center">
            <h1
              class="my-3 text-3xl font-semibold text-gray-700 dark:bg-zinc-900 dark:text-stone-100"
            >
              Create your account
            </h1>
            <p class="text-gray-500 font-sans dark:text-stone-100">
              create your account to start using ToDoy App!
            </p>
          </div>
          <div class="m-7 dark:bg-zinc-900">
            <form action="">
              <div class="mb-6">
                <label for="email" class="block mb-2 text-sm text-gray-600"
                  >Email Address</label
                >
                <input
                  type="email"
                  name="email"
                  v-model="newEmail"
                  placeholder="your@email.com"
                  class="w-full px-3 py-2 placeholder-gray-300 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-indigo-100 focus:border-indigo-300 dark:bg-gray-700 dark:text-white dark:placeholder-gray-500 dark:border-gray-600 dark:focus:ring-gray-900 dark:focus:border-gray-500"
                />
              </div>
              <div class="mb-6">
                <div class="flex justify-between mb-2">
                  <label for="password" class="text-sm text-gray-600"
                    >Password</label
                  >
                </div>
                <input
                  type="password"
                  name="password"
                  v-model="newPassword"
                  placeholder="Your Password"
                  class="w-full px-3 py-2 placeholder-gray-300 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-indigo-100 focus:border-indigo-300 dark:bg-gray-700 dark:text-white dark:placeholder-gray-500 dark:border-gray-600 dark:focus:ring-gray-900 dark:focus:border-gray-500"
                />
              </div>
              <div class="mb-6">
                <button
                  @click="handleCreateUser"
                  type="button"
                  class="w-full px-3 py-4 text-white bg-indigo-500 rounded-md focus:bg-indigo-600 focus:outline-none"
                >
                  Sign up
                </button>
              </div>
              <p class="dark:text-orange-800text-sm text-center text-gray-400">
                You have an account ?
                <a
                  @click="toggleSignOption"
                  class="cursor-pointer text-indigo-400 focus:outline-none focus:underline focus:text-indigo-500 dark:focus:border-indigo-800"
                  >Sign in</a
                >.
              </p>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
