import { useAuthStore } from "@/stores/auth.store";
import { getAuth, onAuthStateChanged, type User } from "firebase/auth";

export const getCurrUser = (): Promise<User | null> => {
    const { setAuthenticationStatus } = useAuthStore();
    return new Promise((resolve, reject) => {
        const removeListener = onAuthStateChanged(
            getAuth(),
            user => {
                removeListener();
                setAuthenticationStatus(true);
                resolve(user);
            },
            () => {
                setAuthenticationStatus(false);
                reject();
            },
        );
    });
};
