import { createRouter, createWebHistory, type RouteLocationNormalized } from "vue-router";
import HomeView from "../views/HomeView.vue";
import { handleGetPageStatus, requiresLoading, setTitle } from "@/utils/router.utils";

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    scrollBehavior() {
        return { top: 0 };
    },
    routes: [
        {
            path: "/",
            name: "home",
            meta: {
                title: "Home",
            },
            component: HomeView,
        },
        {
            path: "/signin",
            name: "Admin SignIn",
            meta: {
                title: "Admin SignIn",
                getStatus: "onlyUnAuth",
            },
            component: () => import("../views/SignInView.vue"),
        },
        {
            path: "/about",
            name: "about",
            meta: {
                title: "About",
                getStatus: "requiresAuth",
            },
            component: () => import("../views/AboutView.vue"),
        },
    ],
});

router.beforeEach(async (to: RouteLocationNormalized) => {
    setTitle(to);
    requiresLoading(to);
    return handleGetPageStatus(to);
});

export default router;
