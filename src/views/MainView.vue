<script setup>
import { useUserStore } from "@/stores/user";
import { ref, onMounted, watch } from "vue";
import { useTaskStore } from "@/stores/task";
import TasksView from "../views/TasksView.vue";
import ScrollPanel from "primevue/scrollpanel";
import Dialog from "primevue/dialog";
import InputText from "primevue/inputtext";
import NavBar from "../views/NavBar.vue";
import { useToast } from "primevue/usetoast";

import Toast from "primevue/toast";

import Card from "primevue/card";
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
/*onMounted(() => {
  taskStore.fetchTasks();
});
*/
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
  <NavBar></NavBar>
  <div class="grid m-auto">
    <div class="card col-3 align-items-left justify-content-left">
      <Card style="height: 30rem">
        <template #header>
          <h3>ToDoy</h3>
        </template>
        <template #content>
          <p>{{ userStore.user.user.email }}</p>
          <span
            class="pi pi-check cursor-pointer"
            @click="taskStore.fetchTasks()"
          ></span
          ><span class="cursor-pointer" @click="taskStore.fetchTasks()">
            My Tasks</span
          >
        </template>
        <template #footer>
          <Toast />
          <div class="card flex justify-content-center add-button">
            <Dialog
              v-model:visible="visible"
              :modal="true"
              :draggable="false"
              :position="position"
              header="Add new task"
              :style="{ width: '50vw' }"
            >
              <InputText type="text" v-model="name" :style="{ width: '90%' }" />
              <template #footer>
                <Button
                  label="cancel"
                  icon="pi pi-times"
                  @click="
                    visible = false;
                    cancel();
                  "
                  text
                />
                <Button
                  label="Save"
                  icon="pi pi-check"
                  @click="
                    visible = false;
                    createNewTask();
                    showSuccess();
                  "
                  autofocus
                />
              </template>
            </Dialog>
          </div>
        </template>
      </Card>
    </div>
    <div class="card col-9 align-items-center justify-content-center">
      <Card style="height: 30rem">
        <template #header>
          <h3>Tasks</h3>
        </template>
        <template #content>
          <ScrollPanel style="width: 100%; height: 20rem">
            <TasksView></TasksView>
          </ScrollPanel>
          <Button
            class="add-button"
            icon="pi pi-plus"
            v-tooltip.top="'Add new task'"
            @click="
              visible = true;
              openPosition('top');
            "
          />
        </template>
      </Card>
    </div>
  </div>

  <!--<input type="text" v-model="name" /><button @click="createNewTask">
    submit
  </button>
  <p>{{ name }}</p>-->
</template>
<style>
.card {
  padding: 20px;
}
.p-card {
  padding: 20px;
}
.grid {
  max-width: 900px;
  margin-left: auto;
  margin-right: auto;
  margin-top: 3rem;
}

.add-button {
  position: relative;
  top: -1rem;
  left: -1rem;
  z-index: 2;
}
</style>
