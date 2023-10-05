<template>
    <FileUpload
        :file-types-acceptable="fileTypesAcceptable"
        :upload-progress="useFileUploadFirebase.uploadProgress.value"
        :upload-callback="onFileAdded"
        :max-mb-file-size="maxMbFileSize"
        @remove-file="onFileRemoveClick" />
</template>

<script setup lang="ts">
import FileUpload from "@/components/file-uploads/FileUpload.vue";
import { useFileUpload } from "@/composables/useFileUpload";
import type {
    AudioFileType,
    DocumentFileType,
    FileUploadFailureType,
    FileUploadSuccessType,
    ImageFileType,
    VideoFileType,
} from "@/types/file.type";
import { ref } from "vue";
import { useToast } from "vue-toastification";

type PropsType = {
    fileTypesAcceptable: (ImageFileType | VideoFileType | DocumentFileType | AudioFileType)[];
    storageUrl: string;
    maxMbFileSize?: number;
};

type EmitsType = {
    (e: "fileUrl", url: string | null): void;
};

const props = defineProps<PropsType>();
const emit = defineEmits<EmitsType>();

const useFileUploadFirebase = useFileUpload();

const toast = useToast();

const filename = ref<string | null>(null);

const onFileAdded = async (file: File): Promise<FileUploadSuccessType | FileUploadFailureType> => {
    filename.value = `${Date.now()}.${file.name.split(".").at(-1)}`;
    const result = await useFileUploadFirebase.uploadFile(props.storageUrl, filename.value, file);
    if (result.status == "failure") {
        toast.error(result.message);
        emit("fileUrl", null);
    }
    if (result.status === "success") {
        emit("fileUrl", result.url);
    }
    return result;
};

const onFileRemoveClick = async () => {
    if (!filename.value) return;
    try {
        await useFileUploadFirebase.removeFile(props.storageUrl, filename.value);
    } catch (error) {
        toast.error((error as Error).message);
    } finally {
        emit("fileUrl", null);
        filename.value = null;
    }
};
</script>

<style scoped></style>
