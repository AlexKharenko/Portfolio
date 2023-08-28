import { useGlobalStore } from "@/stores/global.store";
import type { RouteLocationNormalized } from "vue-router";
import { getCurrUser } from "./firebase.auth";

export const requiresLoading = (to: RouteLocationNormalized) => {
    const globalState = useGlobalStore();
    if (to.meta.requiresLoading) {
        globalState.setLoadingState(true);
    } else {
        globalState.setLoadingState(false);
    }
};

export const handleGetPageStatus = async (to: RouteLocationNormalized) => {
    const user = await getCurrUser();
    if (to.meta.getStatus === "requiresAuth") {
        if (user) {
            return;
        }
        return "/signin";
    } else if (to.meta.getStatus === "onlyUnAuth") {
        if (user) {
            return "/";
        }
    }
};

export const setTitle = (to: RouteLocationNormalized) => {
    window.document.title = to.meta.title;
};
