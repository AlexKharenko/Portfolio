<template>
    <li class="tags-list-item">
        <div class="tag-block">
            <TagIcon />
            <p class="tag-name">{{ props.tagData.tagName }}</p>
        </div>
        <div class="projects-count">
            <div class="icon">
                <FolderIcon />
            </div>
            <span class="projects-number">1</span>
        </div>
        <div class="controls-block">
            <button class="admin-btn-control btn-edit-tag">
                <PencilIcon />
            </button>
            <button class="admin-btn-control btn-delete-tag" @click="handleDeleteClick">
                <TrashIcon />
            </button>
        </div>
    </li>
</template>

<script setup lang="ts">
import PencilIcon from "@/components/icons/AdminPanel/PencilIcon.vue";
import TrashIcon from "@/components/icons/AdminPanel/TrashIcon.vue";
import TagIcon from "@/components/icons/AdminPanel/TagIcon.vue";
import FolderIcon from "../icons/AdminPanel/FolderIcon.vue";
import type { TagInterface } from "@/interfaces/tag.interface";
import { deleteTag } from "@/utils/firebase-calls/tags.calls";

type PropsType = {
    tagData: TagInterface;
};

type EmitsType = {
    (e: "delete", id: string): void;
    (e: "error", message: string): void;
};

const props = defineProps<PropsType>();
const emits = defineEmits<EmitsType>();

const handleDeleteClick = async (): Promise<void> => {
    if (!confirm("Do you really want to delete")) {
        return;
    }
    const response = await deleteTag(props.tagData.id);
    if (response.success) {
        emits("delete", response.id);
    } else {
        emits("error", response.message);
    }
};
</script>

<style lang="scss" scoped>
.tags-list-item {
    padding: 0.4rem 1rem;
    display: grid;
    grid-template-columns: 2fr 1fr auto;
    align-items: center;
    gap: 1rem;
    overflow: hidden;

    &:nth-child(odd) {
        background-color: var(--color-background-mute);
    }

    @media screen and (max-width: 410px) {
        grid-template-columns: 2fr auto;
    }

    .tag-block {
        display: flex;
        align-items: center;
        gap: 0.3rem;

        @media (prefers-color-scheme: dark) {
            color: var(--color-text-2);
        }

        svg {
            height: 0.9rem;
            aspect-ratio: 1 / 1;
        }
    }

    .projects-count,
    .controls-block {
        display: flex;
        flex-wrap: nowrap;
    }

    .projects-count {
        gap: 0.3rem;

        .icon {
            height: 1rem;
            aspect-ratio: 1 / 1;

            svg {
                height: inherit;
                width: 100%;
            }
        }

        @media screen and (max-width: 410px) {
            display: none;
        }
    }

    .controls-block {
        display: grid;
        grid-template-columns: 1fr 1fr;
        gap: 0.5rem;
    }
}
</style>
