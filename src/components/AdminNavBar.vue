<template>
    <nav class="nav-bar-admin" :class="{ 'nav-bar-hiden': navBarHiden }">
        <div class="nav-header">
            <RouterLink to="/admin">
                <p class="nav-bar-admin-logo">
                    A<span class="logo-full-width">lex</span>K<span class="logo-full-width"
                        >harenko</span
                    >
                </p>
            </RouterLink>
            <button class="toggle-nav-bar-admin" @click="toggleNavBarHidenStatus">
                <ArrowIcon />
            </button>
        </div>

        <ul class="nav-bar-admin-list">
            <li class="nav-bar-admin-list-item links">
                <RouterLink class="list-item-link" to="/admin">
                    <div class="list-item-icon">
                        <DashBoardIcon />
                    </div>
                    <span class="list-item-title">Dashboard</span>
                </RouterLink>
            </li>
            <li class="nav-bar-admin-list-item links">
                <RouterLink class="list-item-link" to="/admin/projects">
                    <div class="list-item-icon">
                        <FolderIcon />
                    </div>
                    <span class="list-item-title">Projects</span>
                </RouterLink>
                <button class="add-btn">
                    <PlusIcon />
                </button>
            </li>
            <li class="nav-bar-admin-list-item links">
                <RouterLink class="list-item-link" to="/admin/skills">
                    <div class="list-item-icon">
                        <SkillsIcon />
                    </div>
                    <span class="list-item-title">Skills</span>
                </RouterLink>
                <button class="add-btn">
                    <PlusIcon />
                </button>
            </li>
            <li class="nav-bar-admin-list-item links">
                <RouterLink class="list-item-link" to="/admin/experience">
                    <div class="list-item-icon">
                        <ExperienceIcon />
                    </div>
                    <span class="list-item-title">Experience</span>
                </RouterLink>
                <button class="add-btn">
                    <PlusIcon />
                </button>
            </li>
            <li class="nav-bar-admin-list-item links">
                <RouterLink class="list-item-link" to="/admin/tags">
                    <div class="list-item-icon">
                        <TagIcon />
                    </div>
                    <span class="list-item-title">Tags</span>
                </RouterLink>
                <button class="add-btn" @click="openCreateDialog('tag')">
                    <PlusIcon />
                </button>
            </li>
            <li class="nav-bar-admin-list-item links">
                <RouterLink class="list-item-link" to="/admin/feedbacks">
                    <div class="list-item-icon">
                        <MessageIcon />
                    </div>
                    <span class="list-item-title">Feedbacks</span>
                </RouterLink>
                <div class="feedback-count">
                    5
                    <!-- Add counter for feedbacks -->
                </div>
            </li>
        </ul>
        <ul class="nav-bar-admin-list controls-list">
            <li class="nav-bar-admin-list-item links">
                <RouterLink class="list-item-link" to="/">
                    <div class="list-item-icon">
                        <HomeIcon />
                    </div>
                    <span class="list-item-title">Main</span>
                </RouterLink>
            </li>
            <li v-if="authStore.isAuthenticated" class="nav-bar-admin-list-item buttons">
                <button class="list-btn signout-btn" @click="signOutHandle">
                    <div class="list-item-icon">
                        <SignOutIcon />
                    </div>
                    <span class="list-item-title">SignOut</span>
                </button>
            </li>
        </ul>
    </nav>
</template>

<script setup lang="ts">
import { useAuthStore } from "@/stores/auth.store";
import { ref, inject, type Ref } from "vue";
import { useRouter } from "vue-router";
import { RouterLink } from "vue-router";

import TagIcon from "./icons/AdminPanel/TagIcon.vue";
import HomeIcon from "./icons/AdminPanel/HomeIcon.vue";
import SignOutIcon from "./icons/AdminPanel/SignOutIcon.vue";
import PlusIcon from "./icons/AdminPanel/PlusIcon.vue";
import ArrowIcon from "./icons/AdminPanel/ArrowIcon.vue";
import FolderIcon from "./icons/AdminPanel/FolderIcon.vue";
import MessageIcon from "./icons/AdminPanel/MessageIcon.vue";
import ExperienceIcon from "./icons/AdminPanel/ExperienceIcon.vue";
import SkillsIcon from "./icons/AdminPanel/SkillsIcon.vue";
import DashBoardIcon from "./icons/AdminPanel/DashBoardIcon.vue";

import type CreateTagDialog from "@/components/dialogs/tag/CreateTagDialog.vue";

const createTagDialogRef = inject<Ref<InstanceType<typeof CreateTagDialog>>>("createTagDialogRef");

const authStore = useAuthStore();
const router = useRouter();

const navBarHiden = ref(false);

const toggleNavBarHidenStatus = () => {
    navBarHiden.value = !navBarHiden.value;
};

const openCreateDialog = (name: string): void => {
    switch (name) {
        case "tag":
            createTagDialogRef?.value.showDialog();
            break;
    }
};

const signOutHandle = async () => {
    const { success } = await authStore.signOut();
    if (success) {
        router.push({ path: "/" });
    }
};
</script>

<style scoped lang="scss">
.nav-bar-admin {
    position: sticky;
    height: 100dvh;
    top: 0;
    left: 0;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    padding: 1rem 0.4rem;
    font-size: 1.025em;
    background-color: var(--color-background);
    box-shadow: 0 0 5px 0 var(--black);
    gap: 1rem;
    width: 220px;
    transition: width 0.3s ease-in-out;

    @media (prefers-color-scheme: dark) {
        & {
            box-shadow: 0 0 5px 0 #000000;
        }
    }

    @media screen and (max-height: 550px) {
        grid-template-rows: auto auto auto;
    }

    &.nav-bar-hiden {
        width: 70px;

        .nav-header {
            justify-content: center;

            .nav-bar-admin-logo {
                overflow: hidden;
                padding-inline: 0;

                .logo-full-width {
                    display: none;
                }
            }

            .toggle-nav-bar-admin {
                rotate: 180deg;
            }
        }

        .nav-bar-admin-list {
            .nav-bar-admin-list-item {
                a,
                button {
                    grid-template-columns: auto 1fr;
                }
            }
        }
    }

    .nav-header {
        display: flex;
        width: 100%;
        gap: 1rem;
        align-items: center;
        border-bottom: solid 1px var(--color-text-muted);
        padding-bottom: 1rem;
        overflow: hidden;
        flex-shrink: 0;

        .nav-bar-admin-logo {
            font-size: 1.2em;
            white-space: nowrap;
            color: var(--color-text);
            padding: 0.3rem;
        }

        .toggle-nav-bar-admin {
            position: absolute;
            right: 0;
            translate: 50%;
            padding: 0.3rem;
            transition:
                rotate 0.3s ease-in-out,
                background-color 0.2s ease-in-out;
        }
    }

    .nav-header .toggle-nav-bar-admin,
    .nav-bar-admin-list .nav-bar-admin-list-item .add-btn {
        display: grid;
        place-items: center;
        outline: none;
        border: none;
        border-radius: 50%;
        height: 1.6rem;
        aspect-ratio: 1 / 1;
        background-color: var(--grey-light);

        @media (prefers-color-scheme: dark) {
            background-color: var(--grey-soft);
        }

        &:hover,
        &:focus-visible {
            background-color: var(--grey-soft);

            @media (prefers-color-scheme: dark) {
                background-color: var(--grey-muted);
            }
        }
    }

    .nav-bar-admin-list {
        display: grid;
        gap: 0.5rem;
        width: 100%;

        &:not(.controls-list) {
            display: block;
            min-height: 100px;
            flex-grow: 1;
            overflow-y: auto;

            & > .nav-bar-admin-list-item:not(:last-child) {
                margin-bottom: 0.5rem;
            }
        }

        &.controls-list {
            border-top: solid 1px var(--color-text-muted);
            padding-top: 2rem;

            @media screen and (max-height: 550px) {
                padding-top: 0.5rem;
            }
        }

        .nav-bar-admin-list-item {
            display: flex;
            align-items: center;
            border-radius: 14px;
            transition: background-color 0.2s ease-in-out;
            overflow: hidden;
            cursor: pointer;

            .add-btn {
                margin-right: 0.4rem;
                transition: background-color 0.2s ease-in-out;
                svg {
                    height: 50%;
                    aspect-ratio: 1 / 1;
                }
            }

            .feedback-count {
                display: grid;
                place-items: center;
                outline: none;
                border: none;
                border-radius: 50%;
                margin-right: 0.4rem;
                height: 1.6rem;
                aspect-ratio: 1 / 1;
                background-color: var(--grey-light);
                color: var(--black);

                @media (prefers-color-scheme: dark) {
                    background-color: var(--grey-soft);
                    color: var(--white);
                }
            }

            .list-item-link,
            .list-btn {
                display: grid;
                grid-template-columns: auto 1fr;
                align-items: center;
                gap: 1rem;
                color: var(--color-text);

                @media (prefers-color-scheme: dark) {
                    color: var(--color-text-2);
                }
            }

            .list-item-icon {
                height: 2rem;
                width: 2rem;
                transition: color 0.2s ease-in-out;
            }

            &.links {
                .list-item-link {
                    width: 100%;
                    outline: none;
                    padding: 0.3rem 0.8rem;
                }
            }

            &.buttons {
                .list-btn {
                    padding: 0.3rem 0.8rem;
                    width: 100%;
                    outline: none;
                    background: none;
                    border: none;
                    text-align: left;
                }
            }

            .list-item-title {
                transition: color 0.2s ease-in-out;
                color: var(--color-text);

                @media (prefers-color-scheme: dark) {
                    color: var(--color-text-2);
                }
            }

            &:has(.list-item-link.router-link-exact-active) {
                background-color: var(--black);

                .list-item-link,
                .list-item-title {
                    color: var(--white);

                    @media (prefers-color-scheme: dark) {
                        color: var(--black);
                    }
                }

                @media (prefers-color-scheme: dark) {
                    background-color: var(--white);
                }
            }

            &:not(:has(.list-item-link.router-link-exact-active, .add-btn:hover)):hover,
            &:not(
                    :has(.list-item-link.router-link-exact-active, .add-btn:focus-within)
                ):focus-within {
                background-color: var(--grey-light);

                @media (prefers-color-scheme: dark) {
                    .list-item-link,
                    .list-item-title,
                    .list-btn {
                        color: var(--black);
                    }
                }
            }
        }
    }
}
</style>
