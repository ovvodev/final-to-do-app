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

    const updateTask = async (taskId, taskName) => {

        const { error } = await supabase
            .from('tasks')
            .update({ title: taskName })
            .eq('id', taskId)
        if (error) {
            console.error("Error deleting task:", error);
        } else {
            const taskToUpdate = tasks.value.find(task => task.id === taskId);
            if (taskToUpdate) {
                taskToUpdate.title = taskName;
            }
        }
    }
    const updateComplitionStatus = async (taskId, isCompleted) => {
        const { error } = await supabase
            .from('tasks')
            .update({ is_complete: isCompleted })
            .eq('id', taskId);

        if (error) {
            console.error("Error updating task:", error);
        } else {
            const taskToUpdate = tasks.value.find(task => task.id === taskId);
            if (taskToUpdate) {
                taskToUpdate.is_complete = isCompleted;
            }
        }
    };


    return { tasks, fetchTasks, createTask, deleteTask, updateTask, updateComplitionStatus };
})