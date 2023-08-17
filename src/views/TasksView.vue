<script setup>
import { useUserStore } from "@/stores/user";
import { ref, onMounted, watch } from "vue";
import { useTaskStore } from "@/stores/task";
import Panel from "primevue/panel";

const taskStore = useTaskStore();

/*onMounted(() => {
  taskStore.fetchTasks();
});
*/

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
</script>

<template>
  <div
    class="card fadeinright animation-duration-500"
    v-for="task in taskStore.tasks"
    :key="task.id"
  >
    <Panel>
      <template #icons> </template>
      <p class="m-0">{{ task.title }}{{ task.is_complete }}</p>
    </Panel>
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
<style></style>
