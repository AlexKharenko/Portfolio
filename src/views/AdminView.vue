<template>
    <div class="admin-views hide-nav-bar">
        <AdminNavBar />
        <RouterView class="admin-router-view" />
        <Teleport to="#dialogs">
            <ConfirmDialog ref="confirmDialogRef" />
            <CreateTagDialog ref="createTagDialogRef" />
        </Teleport>
    </div>
</template>

<script setup lang="ts">
import AdminNavBar from "@/components/AdminNavBar.vue";
import CreateTagDialog from "@/components/dialogs/tag/CreateTagDialog.vue";
import { ref, provide } from "vue";
import { ConfirmDialog } from "vue-dialog-library";
import "vue-dialog-library/dist/styles.css";

const confirmDialogRef = ref<InstanceType<typeof ConfirmDialog>>();
const createTagDialogRef = ref<InstanceType<typeof CreateTagDialog>>();

provide("confirmDialogRef", confirmDialogRef);
provide("createTagDialogRef", createTagDialogRef);
</script>

<style lang="scss" scoped>
.admin-views {
    display: grid;
    grid-template-columns: auto 1fr;
    flex-grow: 1;
    width: 100%;
    position: relative;
    min-width: 310px;
    overflow: hidden;

    .admin-router-view {
        padding: 1rem 2rem;
        min-width: 320px;

        @media screen and (max-width: 400px) {
            padding: 1rem 1rem 1rem 1.3rem;
            min-width: 240px;
        }

        .admin-view-title {
            white-space: nowrap;
        }
    }
}
</style>

<style lang="scss">
.admin-view-title {
    white-space: nowrap;
    padding-bottom: 0.7rem;
    border-bottom: solid 1px var(--color-text-muted);
}

.admin-btn-control {
    outline: none;
    border: none;
    background: none;
    height: 1.4rem;
    aspect-ratio: 1 / 1;
    cursor: pointer;

    color: var(--color-text);
    transition: color 0.3s ease-in-out;

    &:hover,
    &:focus-visible {
        color: var(--color-text-2);
    }
}
</style>
