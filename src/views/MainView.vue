<script setup>
import { useUserStore } from "@/stores/user";
import { ref, onMounted, watch } from "vue";
import { useTaskStore } from "@/stores/task";

const taskStore = useTaskStore();
const userStore = useUserStore();
const userId = userStore.user.user.id;
const name = ref("");
const createNewTask = () => {
  taskStore.createTask(userId, name.value);
  name.value = ""; // Clear the input field after submitting
};
onMounted(() => {
  taskStore.fetchTasks();
});

watch(name, (newTask) => {
  taskStore.fetchTasks(newTask);
});
const taskId = taskStore.tasks.id;
const deleteCurrenttask = (taskId) => {
  taskStore.deleteTask(taskId);
};
</script>
<template>
  <p>{{ userStore.user.user.email }}</p>
  <h1>main view</h1>
  <button @click="taskStore.fetchTasks()">Fetch task</button>

  <ul>
    <li v-for="task in taskStore.tasks" :key="task.id">
      {{ task.title }}{{ task.is_complete }}
      <span><button @click="deleteCurrenttask(task.id)">delete</button></span>
    </li>
  </ul>

  <input type="text" v-model="name" /><button @click="createNewTask">
    submit
  </button>
  <p>{{ name }}</p>
</template>
<style></style>
