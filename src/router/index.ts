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
            name: "Home",
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
            path: "/admin",
            meta: {
                title: "Admin Dashboard",
                getStatus: "requiresAuth",
            },
            children: [
                {
                    path: "",
                    name: "Admin Dashboard",
                    meta: {
                        title: "Admin Dashboard",
                    },
                    component: () => import("../views/AboutView.vue"),
                },
                {
                    path: "tags",
                    name: "Tags | Admin Dashboard",
                    meta: {
                        title: "Admin Dashboard",
                    },
                    component: () => import("../views/AboutView.vue"),
                },
            ],

            component: () => import("../views/AdminView.vue"),
        },
        {
            path: "/about",
            name: "About",
            meta: {
                title: "About",
                getStatus: "requiresAuth",
            },
            component: () => import("../views/AboutView.vue"),
        },
    ],
});

router.beforeEach(async (to: RouteLocationNormalized) => {
    requiresLoading(to);
    return handleGetPageStatus(to);
});
router.afterEach((to: RouteLocationNormalized) => {
    setTitle(to);
});

export default router;
