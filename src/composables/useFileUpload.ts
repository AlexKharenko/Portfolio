import type { FileUploadFailureType, FileUploadSuccessType } from "@/types/file.type";
import {
    getStorage,
    ref as firebaseRef,
    uploadBytesResumable,
    getDownloadURL,
    type UploadTask,
    deleteObject,
} from "firebase/storage";
import { ref } from "vue";

export function useFileUpload() {
    const uploadProgress = ref<number | null>(null);
    const isPaused = ref(false);

    const storage = getStorage();

    const uploadTask = ref<null | UploadTask>(null);

    const uploadFile = (
        storageUrl: string,
        filename: string,
        file: File,
    ): Promise<FileUploadSuccessType | FileUploadFailureType> => {
        const storageRef = firebaseRef(storage, `${storageUrl}/${filename}`);

        uploadTask.value = uploadBytesResumable(storageRef, file);

        let downloadUrlPromiseResolve: (value: FileUploadSuccessType) => void,
            downloadUrlPromiseReject: (value: FileUploadFailureType) => void;
        const downloadUrlPromise = new Promise<FileUploadSuccessType | FileUploadFailureType>(
            (resolve, reject) => {
                downloadUrlPromiseReject = reject;
                downloadUrlPromiseResolve = resolve;
            },
        );

        uploadTask.value.on(
            "state_changed",
            snapshot => {
                uploadProgress.value = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                switch (snapshot.state) {
                    case "paused":
                        isPaused.value = true;
                        break;
                    case "running":
                        isPaused.value = false;
                        break;
                }
            },
            error => {
                uploadProgress.value = null;
                downloadUrlPromiseReject({ status: "failure", message: error.message });
            },
            () => {
                if (uploadTask.value) {
                    getDownloadURL(uploadTask.value.snapshot.ref).then(url => {
                        downloadUrlPromiseResolve({ status: "success", url });
                    });
                }
            },
        );
        return downloadUrlPromise;
    };

    const removeFile = async (storageUrl: string, filename: string): Promise<void> => {
        const storageRef = firebaseRef(storage, `${storageUrl}/${filename}`);
        await deleteObject(storageRef);
    };

    const reset = () => {
        isPaused.value = false;
        uploadProgress.value = null;
        uploadTask.value = null;
    };

    return { isPaused, uploadProgress, uploadTask, uploadFile, removeFile, reset };
}
