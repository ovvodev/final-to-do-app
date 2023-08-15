import { defineStore } from "pinia";
import supabase from "../lib/supabase";
import { ref } from "vue";


export const useTaskStore = defineStore("taskStore", () => {
    const tasks = ref([]);

    const fetchTasks = async () => {
        const { data, error } = await supabase
            .from('tasks')
            .select()

        if (error) console.log("Error ", error);
        else tasks.value = data;
    }

    const createTask = async (userId, taskName) => {

        const { data, error } = await supabase
            .from('tasks')
            .insert({ user_id: userId, title: taskName })
        if (error) {
            console.error("Error creating task:", error);
        } else {
            return data;
        }
    }

    const deleteTask = async (taskId) => {
        const { error } = await supabase
            .from('tasks')
            .delete()
            .eq('id', taskId)
        if (error) {
            console.error("Error deleting task:", error);
        } else {
            tasks.value = tasks.value.filter(task => task.id !== taskId);

        }
    }


    return { tasks, fetchTasks, createTask, deleteTask };
})