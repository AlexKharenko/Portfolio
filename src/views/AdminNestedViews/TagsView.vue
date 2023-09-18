<template>
    <div class="admin-tags-view">
        <h1 class="admin-view-title">Manage tags</h1>

        <div class="utils-bar">
            <CreateBtn btn-text="Add tag" @click="createTagDialogRef?.showDialog" />
        </div>
        <div class="tags-content-block">
            <ul class="tags-list">
                <TagListItem
                    v-for="tag in tags"
                    :key="tag.id"
                    :tagData="tag"
                    :onEdit="handleEditEvent"
                    :onDelete="handleDeleteEvent"
                    :onError="handleErrorEvent" />
            </ul>
        </div>
        <Teleport to="#dialogs">
            <EditTagDialog :onSuccessCb="editTagLocal" ref="editTagDialogRef" />
        </Teleport>
    </div>
</template>

<script setup lang="ts">
import { type Ref, inject, onMounted, ref, watch } from "vue";

import type { TagInterface } from "@/interfaces/tag.interface";

import { useDialogEventsStore } from "@/stores/dialogEvents.store";
import { getTags } from "@/utils/firebase-calls/tags.calls";

import TagListItem from "@/components/list-items/TagListItem.vue";

import type CreateTagDialog from "@/components/dialogs/tag/CreateTagDialog.vue";
import EditTagDialog from "@/components/dialogs/tag/EditTagDialog.vue";
import CreateBtn from "@/components/buttons/admin/CreateBtn.vue";

const createTagDialogRef = inject<Ref<InstanceType<typeof CreateTagDialog>>>("createTagDialogRef");
const editTagDialogRef = ref<InstanceType<typeof EditTagDialog>>();

const tags = ref<TagInterface[]>([]);

const addTagLocal = (tag: TagInterface): void => {
    tags.value.unshift(tag);
};

const removeTagLocal = (id: string): void => {
    tags.value = tags.value.filter(item => item.id !== id);
};

const editTagLocal = (tag: TagInterface): void => {
    const tagIndex = tags.value.findIndex(item => item.id === tag.id);
    if (tagIndex === -1) return;
    tags.value[tagIndex] = tag;
};

const handleDeleteEvent = async (id: string): Promise<void> => {
    removeTagLocal(id);
};

const handleEditEvent = async (id: string): Promise<void> => {
    const tag = tags.value.find(item => item.id === id);
    if (tag) editTagDialogRef.value?.showDialog(tag);
};

const handleErrorEvent = (message: string): void => {
    console.log(message);
};

const dialogEventsStore = useDialogEventsStore();
watch(
    () => dialogEventsStore.events.newTag,
    tag => {
        if (tag) {
            addTagLocal(tag);
            dialogEventsStore.resetDialogEvent("newTag");
        }
    },
);

onMounted(async (): Promise<void> => {
    const response = await getTags();
    if (response.success) tags.value = response.data;
    else {
        console.log(response.message);
    }
});
</script>

<style lang="scss" scoped>
.admin-tags-view {
    .tags-content-block {
        display: grid;
    }
    .tags-content-block,
    .utils-bar {
        margin-top: 1rem;
    }
}
</style>
