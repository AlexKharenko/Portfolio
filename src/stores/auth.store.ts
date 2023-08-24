import { ref } from "vue";
import { defineStore } from "pinia";

export const useAuthStore = defineStore("auth", () => {
    const isAuthenticated = ref(false);
    const setAuthenticationStatus = (state: boolean) => {
        isAuthenticated.value = state;
    };

    return { isAuthenticated, setAuthenticationStatus };
});
