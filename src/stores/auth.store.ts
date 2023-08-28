import { ref } from "vue";
import { defineStore } from "pinia";
import { getAuth, signInWithEmailAndPassword, signOut as SignOutFirebase } from "firebase/auth";

type Response = { success: true } | { success: false; message: string };

export const useAuthStore = defineStore("auth", () => {
    const auth = getAuth();
    const isAuthenticated = ref(false);
    const setAuthenticationStatus = (state: boolean) => {
        isAuthenticated.value = state;
    };

    const signIn = async (email: string, password: string): Promise<Response> => {
        try {
            const user = await signInWithEmailAndPassword(auth, email, password);
            setAuthenticationStatus(true);
            return { success: true };
        } catch (error: any) {
            setAuthenticationStatus(false);
            // if (error instanceof FirebaseError) {
            //     console.log(error.code);
            // }
            return { success: false, message: error.message };
        }
    };

    const signOut = async (): Promise<{ success: boolean }> => {
        try {
            await SignOutFirebase(auth);
            setAuthenticationStatus(false);
            return { success: true };
        } catch {
            return { success: false };
        }
    };

    return { isAuthenticated, setAuthenticationStatus, signIn, signOut };
});
