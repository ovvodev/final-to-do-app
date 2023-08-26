<script setup>
import { useUserStore } from "@/stores/user";
import { ref, onMounted, watch } from "vue";
import { useTaskStore } from "@/stores/task";
import TasksView from "../views/TasksView.vue";

import Dialog from "primevue/dialog";
import InputText from "primevue/inputtext";
import NavBar from "../views/NavBar.vue";
import { useToast } from "primevue/usetoast";

import Toast from "primevue/toast";

import Button from "primevue/button";

const taskStore = useTaskStore();
const userStore = useUserStore();
const userId = userStore.user.user.id;
const name = ref("");

const visible = ref(false);
const position = ref("center");

const openPosition = (pos) => {
  position.value = pos;
  visible.value = true;
};
function cancel() {
  name.value = "";
}
const createNewTask = async () => {
  await taskStore.createTask(userId, name.value);
  name.value = ""; // Clear the input field after submitting
};

watch(name, (newTask) => {
  taskStore.fetchTasks(newTask);
});
const toast = useToast();
const showSuccess = () => {
  toast.add({
    severity: "success",
    summary: "Saved",
    detail: "Your task has been created",
    life: 3000,
  });
};
</script>
<template>
  <div class="dark:bg-zinc-900 min-h-full dark:text-slate-200">
    <NavBar></NavBar>
    <Toast />
    <div
      class="flex justify-content-center add-button dark:text-slate-200 dark:bg-zinc-900"
    >
      <Dialog
        class="dark:bg-slate-900 w-64"
        v-model:visible="visible"
        :modal="true"
        :draggable="false"
        :position="position"
        header="Add new task"
        :style="{ width: '50vw' }"
      >
        <InputText
          type="text"
          v-model="name"
          :style="{ width: '90%' }"
          class="dark:bg-zync-900"
        />
        <div class="flex flex-wrap justify-start m-2">
          <button
            class="text-white dark:text-slate-200 bg-red-700 p-2 m-2"
            label="cancel"
            icon="pi pi-times"
            @click="
              visible = false;
              cancel();
            "
            text
          >
            Cancel
          </button>
          <button
            class="text-white dark:text-slate-200 bg-cyan-700 p-2 m-2"
            label="Save"
            icon="pi pi-check"
            @click="
              visible = false;
              createNewTask();
              showSuccess();
            "
            autofocus
          >
            Save
          </button>
        </div>
      </Dialog>
      <div
        class="flex flex-col space-y-4 p-4 dark:text-slate-200 dark:bg-zinc-900"
      >
        <button
          class="font-mono"
          v-tooltip.top="'Add new task'"
          @click="
            visible = true;
            openPosition('top');
          "
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
            class="w-9 h-9"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M12 4.5v15m7.5-7.5h-15"
            />
          </svg>
        </button>
      </div>
    </div>
    <TasksView
      class="w-8/12 justify-center content-center items-center m-auto text-center dark:bg-zinc-900 dark:text-slate-200"
    ></TasksView>
  </div>
</template>
<style></style>
