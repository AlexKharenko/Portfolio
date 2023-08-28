<template>
    <nav class="nav-bar">
        <RouterLink to="/">
            <p class="nav-bar-logo">AlexKharenko</p>
        </RouterLink>
        <ul class="nav-bar-list">
            <li class="nav-bar-list-item links">
                <RouterLink to="/"><span>Home</span></RouterLink>
            </li>
            <li class="nav-bar-list-item links">
                <RouterLink to="/about"><span>About</span></RouterLink>
            </li>
            <li v-if="!authStore.isAuthenticated" class="nav-bar-list-item links">
                <RouterLink to="/signin"><span>SignIn</span></RouterLink>
            </li>
            <li v-else class="nav-bar-list-item buttons">
                <button class="list-btn signout-btn" @click="authStore.signOut">
                    <span>SignOut</span>
                </button>
            </li>
        </ul>
    </nav>
</template>

<script setup lang="ts">
import { useAuthStore } from "@/stores/auth.store";
import { RouterLink } from "vue-router";

const authStore = useAuthStore();
</script>

<style scoped lang="scss">
.nav-bar {
    position: sticky;
    top: 0;
    left: 0;
    display: flex;
    padding: 0.7rem 3rem;
    height: 58px;
    justify-content: space-between;
    font-size: 1.125em;
    background-color: var(--color-background);
    align-items: center;
    z-index: 100;
    box-shadow: 0 0 5px 0 var(--black);

    @media (prefers-color-scheme: dark) {
        & {
            box-shadow: 0 0 5px 0 #000000;
        }
    }

    .nav-bar-logo {
        font-size: 22px;
        white-space: nowrap;
        background-color: var(--black);
        color: var(--white);
        padding: 0.3rem;
    }
    .nav-bar-list {
        display: flex;
        gap: 1rem;
        align-items: center;
        .nav-bar-list-item {
            padding: 0.3rem 0;
            &.links {
                a {
                    outline: none;
                }
            }

            &.buttons {
                button {
                    outline: none;
                    background: none;
                    border: none;
                }
            }

            span {
                padding: 0 0.1rem;
                color: var(--color-text);
                @media (prefers-color-scheme: dark) {
                    color: var(--color-text-2);
                }
            }
            &.router-link-active span {
                color: var(--color-text-2);
                @media (prefers-color-scheme: dark) {
                    color: var(--color-text);
                }
            }

            &::after {
                content: "";
                display: block;
                height: 2px;
                width: 0;
                background-color: var(--color-text);
                transition: width 0.3s ease-in-out;

                @media (prefers-color-scheme: dark) {
                    background-color: var(--color-text-2);
                }
            }
            &:hover:not(:has(a.router-link-active))::after,
            &:focus-visible::after {
                width: 100%;
            }
        }
    }
}
</style>
