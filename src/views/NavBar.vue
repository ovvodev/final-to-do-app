<script setup>
import { useRouter } from "vue-router";

import { useUserStore } from "@/stores/user";
import { ref, onMounted, watch } from "vue";
const userStore = useUserStore();
const router = useRouter();

const isDarkMode = ref(false);

const toggleTheme = () => {
  isDarkMode.value = !isDarkMode.value;
  document.documentElement.classList.toggle("dark", isDarkMode.value);
};

const changeView = () => {
  router.push({ path: "/" });
};
onMounted(() => {});
const signOutUser = async () => {
  console.log("Sign Out clicked");
  await userStore.signOut();
  changeView();
};
</script>
<template>
  <div class="flex justify-end dark:bg-zinc-900 dark:text-slate-200 container">
    <div
      class="flex justify-end max-w-4xl pt-5 dark:bg-zinc-900 dark:text-slate-200"
    >
      <div
        v-if="isDarkMode"
        class="cursor-pointer"
        v-tooltip.bottom="'Light Theme'"
        @click="toggleTheme"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke-width="1.5"
          stroke="currentColor"
          class="w-8 h-9"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M12 3v2.25m6.364.386l-1.591 1.591M21 12h-2.25m-.386 6.364l-1.591-1.591M12 18.75V21m-4.773-4.227l-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z"
          />
        </svg>
      </div>
      <div
        v-else
        class="cursor-pointer"
        v-tooltip.bottom="'Dark Theme'"
        @click="toggleTheme"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke-width="1.5"
          stroke="currentColor"
          class="w-8 h-9"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M21.752 15.002A9.718 9.718 0 0118 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 003 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 009.002-5.998z"
          />
        </svg>
      </div>

      <div
        class="cursor-pointer"
        v-tooltip.bottom="'Sign Out'"
        @click="signOutUser()"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke-width="1.5"
          stroke="currentColor"
          class="w-8 h-9"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15M12 9l-3 3m0 0l3 3m-3-3h12.75"
          />
        </svg>
      </div>
    </div>
  </div>
</template>
<style></style>
