import { useAuthStore } from "@/stores/auth.store";
import { getAuth, onAuthStateChanged, type User } from "firebase/auth";

export const getCurrUser = (): Promise<User | null> => {
    const authStore = useAuthStore();
    return new Promise((resolve, reject) => {
        const removeListener = onAuthStateChanged(
            getAuth(),
            user => {
                removeListener();
                if (user) authStore.setAuthenticationStatus(true);
                else authStore.setAuthenticationStatus(false);
                resolve(user);
            },
            reject,
        );
    });
};
