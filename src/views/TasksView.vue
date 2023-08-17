<script setup>
import { useUserStore } from "@/stores/user";
import { ref, onMounted, watch } from "vue";
import { useTaskStore } from "@/stores/task";
import Panel from "primevue/panel";
import Checkbox from "primevue/checkbox";
import supabase from "@/lib/supabase";
import Card from "primevue/card";
import Divider from "primevue/divider";
import { useToast } from "primevue/usetoast";
import Button from "primevue/button";
import Toast from "primevue/toast";
const taskStore = useTaskStore();

/*onMounted(() => {
  taskStore.fetchTasks();
});
*/
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
</script>

<template>
  <div
    class="card fadeinright animation-duration-500 surface-100"
    v-for="(task, index) in taskStore.tasks"
    :key="task.id"
  >
    <Card>
      <div class="card flex justify-content-center"></div>
      <template #content
        ><p class="m-0">
          {{ task.title }}{{ task.is_complete }}{{ taskCheckboxes[index] }}
        </p></template
      >
      <template #footer>
        <Divider type="solid" />
        <div class="flex justify-content-between gap-8">
          <div class="col-6">
            <Checkbox
              v-model="taskCheckboxes[index]"
              :binary="true"
              @change="updateStatus(index, task.id)"
            />
          </div>
          <div class="col-6">
            <div class="grid">
              <Toast />
              <div class="col-2">
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
      </template>
    </Card>
  </div>
  <!--
        <ul>
    <li
      class="fadeinright animation-duration-500"
      v-for="task in taskStore.tasks"
      :key="task.id"
    >
      {{ task.title }}{{ task.is_complete }}
      <span><button @click="deleteCurrentTask(task.id)">delete</button></span>
      <button @click="updateCurrentTask(task.id, task.title)">edit</button>
    </li>
  </ul>-->
</template>
<style scoped></style>
