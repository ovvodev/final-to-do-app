import { defineStore } from "pinia";
import supabase from "../lib/supabase";
import { ref } from "vue";

export const useTaskStore = defineStore("taskStore", () =>{
    const tasks = ref([]);

    const fetchTasks = async () => {
        const { data, error } = await supabase
        .from('tasks')
        .select()

        if (error) console.log("Error ", error);
        else tasks.value = data;
    }

    return {tasks, fetchTasks};
})