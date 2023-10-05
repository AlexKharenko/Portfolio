<template>
    <div>
        <div
            class="dropzone"
            :class="{ 'file-over': isDropzoneActive }"
            @dragenter.prevent="handleDragEnterEvent"
            @dragleave.prevent="handleDragLeaveEvent"
            @dragover.prevent
            @drop.prevent="handleDropEvent">
            <div class="no-file-chosen" v-if="!file">
                <label for="dropZoneId" tabindex="0" @keydown.enter="handleLabelKeyDownEvent"
                    >Select file</label
                >
                <input
                    type="file"
                    id="dropZoneId"
                    @change="handleInputChangeEvent"
                    :accept="acceptedFileTypesString" />
            </div>
            <div class="file-chosen" v-else>
                <div class="file-card">
                    <button class="btn-remove-img" v-if="isFileUploaded" @click="handleRemoveClick">
                        <PlusIcon />
                    </button>
                    <div class="content-block">
                        <img v-if="fileType === 'image'" src="" alt="" ref="imgRef" />
                        <MediaFile
                            v-if="fileType && (fileType === 'audio' || fileType === 'video')" />
                        <DocFile v-if="!fileType || fileType === 'document'" />
                    </div>
                    <div class="progress-block" v-if="isFileUploading">
                        <svg
                            class="progress-circle"
                            :style="uploadProgressVar"
                            xmlns="http://www.w3.org/2000/svg">
                            <circle class="progress-circle-back" cx="40" cy="40" r="30"></circle>
                            <circle class="progress-circle-prog" cx="40" cy="40" r="30"></circle>
                        </svg>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import type {
    AudioFileType,
    DocumentFileType,
    FileUploadFailureType,
    FileUploadSuccessType,
    ImageFileType,
    VideoFileType,
} from "@/types/file.type";

import { computed, nextTick, ref } from "vue";
import { useToast } from "vue-toastification";

import PlusIcon from "@/components/icons/AdminPanel/PlusIcon.vue";
import MediaFile from "@/components/icons/AdminPanel/MediaFile.vue";
import DocFile from "@/components/icons/AdminPanel/DocFile.vue";

type PropsType = {
    fileTypesAcceptable: (ImageFileType | VideoFileType | DocumentFileType | AudioFileType)[];
    uploadCallback: (file: File) => Promise<FileUploadFailureType | FileUploadSuccessType>;
    uploadProgress: number | null;
    maxMbFileSize?: number;
};

type EmitsType = {
    (e: "removeFile"): void;
};

const toast = useToast();

const props = defineProps<PropsType>();
const emit = defineEmits<EmitsType>();

const file = ref<File | null>(null);
const imgRef = ref();
const isDropzoneActive = ref(false);
const isFileUploading = ref(false);
const isFileUploaded = ref(false);

const uploadProgressVar = computed(() => {
    if (props.uploadProgress) return { "--upload-progress": props.uploadProgress };
    return {};
});

const toggleActiveDropzone = () => {
    isDropzoneActive.value = !isDropzoneActive.value;
};

const acceptedFileTypesString = computed(() => props.fileTypesAcceptable.join(", "));
const fileType = computed(() => {
    if (!file.value) return null;
    if (file.value.type.split("/")[0] === "image") return "image";
    if (file.value.type.split("/")[0] === "video") return "video";
    if (file.value.type.split("/")[0] === "audio") return "audio";
    return "document";
});

const getFile = (files: FileList): File | null => {
    if (files.length < 0) return null;
    const newFile = files[0];
    const acceptedTypes = new Set(props.fileTypesAcceptable);
    if (
        !acceptedTypes.has(
            newFile.type as ImageFileType | VideoFileType | DocumentFileType | AudioFileType,
        )
    ) {
        toast.error("Wrong file type! Try another one!");
        return null;
    }
    if (props.maxMbFileSize && !(newFile.size < props.maxMbFileSize * 1000000)) {
        toast.error(`File is too big! Max size of file is ${props.maxMbFileSize} mb.`);
        return null;
    }
    return newFile;
};

const handleFile = async (newFile: File): Promise<void> => {
    file.value = newFile;
    if (fileType.value === "image") {
        const fileReader = new FileReader();
        fileReader.onload = () => {
            const url = fileReader.result;
            nextTick(() => {
                imgRef.value.src = url;
            });
        };
        fileReader.readAsDataURL(file.value);
    }
    isFileUploading.value = true;
    const result = await props.uploadCallback(file.value);
    setTimeout(() => (isFileUploading.value = false), 500);
    if (result.status === "failure") {
        handleFileUploadFailure();
        return;
    }
    setTimeout(() => (isFileUploaded.value = true), 500);
};

const handleFileUploadFailure = (): void => {
    reset();
};

const handleRemoveClick = (): void => {
    emit("removeFile");
    reset();
};

const reset = (): void => {
    file.value = null;
    isDropzoneActive.value = false;
    isFileUploading.value = false;
    isFileUploaded.value = false;
};

const handleInputChangeEvent = (event: Event): void => {
    const files = (event.target as HTMLInputElement).files;
    if (!files) return;
    const newFile = getFile(files);
    if (newFile) handleFile(newFile);
};
const handleDropEvent = (event: Event): void => {
    toggleActiveDropzone();
    const dt = (event as DragEvent).dataTransfer;
    const files = dt?.files;
    if (!files) return;
    const newFile = getFile(files);
    if (newFile) handleFile(newFile);
};

const handleDragEnterEvent = (): void => {
    toggleActiveDropzone();
};

const handleDragLeaveEvent = (): void => {
    toggleActiveDropzone();
};

const handleLabelKeyDownEvent = (event: Event): void => {
    const target = event.target as HTMLLabelElement;
    target.click();
};
</script>

<style lang="scss" scoped>
.dropzone {
    display: grid;
    place-items: center;
    overflow: hidden;
    min-height: 100px;
    min-width: 100px;
    border: dashed 2px var(--color-text);
    padding: 0.8rem;
    transition: border-color 0.3s ease-in-out;
    position: relative;

    &.file-over {
        border-color: var(--color-text-2);
    }
    .no-file-chosen {
        label {
            cursor: pointer;
            background-color: var(--color-success);
            padding: 0.3rem 0.5rem;
            color: var(--text-dark-1);
            transition: filter 0.3s ease-in-out;
            &:hover {
                filter: brightness(0.9);
            }
        }

        input {
            display: none;
        }
    }
    .file-chosen {
        .file-card {
            position: relative;
            display: grid;
            place-items: center;
            overflow: hidden;
            padding: 0.3rem;
            .content-block {
                border-radius: 10px;
                width: 150px;
                height: 150px;
                overflow: hidden;
                img,
                svg {
                    width: inherit;
                    height: inherit;
                    object-fit: cover;
                }
            }
            .progress-block {
                position: absolute;
                inset: 0;
                rotate: -90deg;
                backdrop-filter: blur(2px);

                .progress-circle {
                    position: absolute;
                    top: 50%;
                    left: 50%;
                    translate: -50% -50%;
                    height: 5rem;
                    width: 5rem;

                    .progress-circle-back {
                        fill: none;
                        stroke: #d2d2d2;
                        stroke-width: 10px;
                    }

                    .progress-circle-prog {
                        fill: none;
                        stroke: #7e3451;
                        stroke-width: 11px;
                        stroke-dasharray: calc(var(--upload-progress, 0) * 189 / 100) 189;
                        stroke-dashoffset: 0;
                        transition: stroke-dasharray 0.7s linear 0s;
                    }
                }
            }

            .btn-remove-img {
                position: absolute;
                top: 0.6rem;
                right: 0.6rem;
                display: grid;
                place-items: center;
                color: var(--text-dark-1);
                background-color: #2c2c2c;
                padding: 0.1rem;
                border: none;
                border-radius: 5px;
                box-shadow: 0 0 0.3rem 0.05rem black;
                svg {
                    height: 1.5rem;
                    width: 1.5rem;
                    rotate: 45deg;
                }
            }
        }
    }
}
</style>
