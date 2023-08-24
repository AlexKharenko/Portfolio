import { ref } from "vue";
import { defineStore } from "pinia";

export const useGlobalStore = defineStore("global", () => {
    const isLoading = ref(false);
    const setLoadingState = (state: boolean) => {
        isLoading.value = state;
    };

    return { isLoading, setLoadingState };
});
