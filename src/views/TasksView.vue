<script setup>
import { ref, onMounted, watch } from "vue";
import { useTaskStore } from "@/stores/task";

import Checkbox from "primevue/checkbox";
import supabase from "@/lib/supabase";

import { useToast } from "primevue/usetoast";

import Toast from "primevue/toast";

const taskStore = useTaskStore();

onMounted(async () => {
  // Fetch tasks from Supabase
  await taskStore.fetchTasks();
});

const toast = useToast();
const taskId = taskStore.tasks.id;

const deleteCurrentTask = async (taskId) => {
  await taskStore.deleteTask(taskId);
};

const updateCurrentTask = async (taskId, currentName) => {
  const newName = window.prompt("Edit the task", currentName);
  if (newName) {
    await taskStore.updateTask(taskId, newName);
  }
};

const taskCheckboxes = ref([]); // Array to hold individual checkbox states

onMounted(async () => {
  // Fetch the completion status from Supabase
  const { data, error } = await supabase.from("tasks").select("is_complete");
  if (error) {
    console.log("Error fetching completion status:", error);
  } else {
    // Populate the taskCheckboxes array with completion status values
    taskCheckboxes.value = data.map((task) => task.is_complete);
  }
});
const updateStatus = async (index, taskId) => {
  const isCompleted = taskCheckboxes.value[index];
  await taskStore.updateComplitionStatus(taskId, isCompleted);
};
const showSuccess = () => {
  toast.add({
    severity: "success",
    summary: "Saved",
    detail: "Your task has been edited",
    life: 3000,
  });
};
const showInfo = () => {
  toast.add({
    severity: "info",
    summary: "Delete",
    detail: "Your task has been deleted",
    life: 3000,
  });
};

const formatDate = (dateString) => {
  const options = { year: "numeric", month: "long", day: "numeric" };
  return new Date(dateString).toLocaleDateString(undefined, options);
};
</script>

<template>
  <!-- <div class="dark:bg-zinc-900 dark:text-slate-200">
    <div
      class="flex flex-wrap justify-between dark:p-o sm:justify-center text-center content-center font-mono dark:bg-zinc-900 dark:text-slate-200"
    >
      <div
        class="w-4/6 mx-5 my-10 bg-white rounded-lg shadow-md p-1 fadeinright animation-duration-500 dark:p-o dark:bg-zinc-900 dark:text-slate-200"
        v-for="(task, index) in taskStore.tasks"
        :key="task.id"
      >
        <div
          class="flex flex-wrap justify-between dark:p-o dark:bg-zinc-900 sm:justify-center md text-center font-mono dark:bg-zinc-700"
        >
          <img
            class="w-32 h-32 rounded-full mx-6 m-2"
            :src="`https://picsum.photos/id/${parseInt(
              task.id.toString().slice(0, 3)
            )}/200/300`"
            alt="Task random picture"
          />
          <div class="justify-start justify-items-start">
            <h2 class="text-2xl font-semibold mt-1 w-auto dark:text-slate-200">
              {{ task.title }}
            </h2>
            <p class="text-gray-600 mt-1 w-auto dark:text-slate-200">
              created : {{ formatDate(task.inserted_at) }}
            </p>

            <div class="mt-2">
              <h3 class="text-xl font-semibold">Notes</h3>
              <p class="text-gray-600 mt-2"></p>
            </div>
            <div class="flex justify-content-between gap-8">
              <div class="mt-2">
                <Checkbox
                  v-model="taskCheckboxes[index]"
                  :binary="true"
                  v-tooltip.top="'Completed'"
                  @change="updateStatus(index, task.id)"
                />
              </div>

              <div class="flex">
                <Toast />
                <div class="mt-2">
                  <i
                    severity="success"
                    class="pi pi-file-edit cursor-pointer"
                    v-tooltip.top="'Edit'"
                    style="font-size: 0, 5rem"
                    @click="
                      updateCurrentTask(task.id, task.title);
                      showSuccess();
                    "
                  ></i>
                </div>

                <div class="col-2">
                  <i
                    class="pi pi-trash cursor-pointer"
                    v-tooltip.top="'Delete'"
                    style="font-size: 0, 5rem"
                    @click="
                      deleteCurrentTask(task.id);
                      showInfo();
                    "
                  ></i>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>-->
  <!-- component -->
  <div class="flex flex-wrap justify-center">
    <div
      v-for="(task, index) in taskStore.tasks"
      :key="task.id"
      class="fadeinright animation-duration-500 flex"
    >
      <div
        class="dark:!bg-red-500 bg-green-400 w-72 h-48 m-4 static rounded-lg"
      >
        <div
          class="bg-stone-50 dark:bg-zinc-800 dark:text-slate-300 w-72 h-21 hover:-m-2 absolute rounded-lg shadow-lg hover:shadow-2xl transition-all duration-150 ease-out hover:ease-in"
        >
          <img
            class="w-20 h-20 rounded-full mx-6 m-2 absolute -top-10 -left-20 border-solid border-2 dark:!border-red-500 border-green-400"
            :src="`https://picsum.photos/id/${parseInt(
              task.id.toString().slice(0, 3)
            )}/200/300`"
            alt="Task random picture"
          />
          <h1 class="m-4 text-2xl font-bold">{{ task.title }}</h1>
          <hr class="m-4 rounded-2xl border-t-2" />
          <p class="m-4 text-sm">
            created : {{ formatDate(task.inserted_at) }}
          </p>
          <div class="flex justify-content-between gap-5">
            <div class="p-2">
              <Checkbox
                v-model="taskCheckboxes[index]"
                :binary="true"
                v-tooltip.top="'Completed'"
                @change="updateStatus(index, task.id)"
              />
            </div>

            <div class="flex">
              <Toast />
              <div class="mt-2">
                <i
                  severity="success"
                  class="pi pi-file-edit cursor-pointer"
                  v-tooltip.top="'Edit'"
                  style="font-size: 0, 5rem"
                  @click="
                    updateCurrentTask(task.id, task.title);
                    showSuccess();
                  "
                ></i>
              </div>

              <div class="col-2">
                <i
                  class="pi pi-trash cursor-pointer"
                  v-tooltip.top="'Delete'"
                  style="font-size: 0, 5rem"
                  @click="
                    deleteCurrentTask(task.id);
                    showInfo();
                  "
                ></i>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<style scoped></style>
