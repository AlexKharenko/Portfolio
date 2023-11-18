import type { TagCreateInterface, TagInterface } from "@/interfaces/tag.interface";
import type {
    CreateResponse,
    DeleteResponse,
    EditResponse,
    GetResponse,
} from "@/types/response.type";
import { addDoc, deleteDoc, doc, getFirestore, updateDoc } from "firebase/firestore";
import { collection, getDocs } from "firebase/firestore";

export const getTags = async (): Promise<GetResponse<TagInterface[]>> => {
    const tags: TagInterface[] = [];
    const firestore = getFirestore();
    try {
        const querySnapshot = await getDocs(collection(firestore, "tags"));

        if (querySnapshot.size > 0) {
            querySnapshot.forEach(doc => {
                tags.push({ id: doc.id, ...doc.data() } as TagInterface);
            });
        }
        return { success: true, data: tags };
    } catch (error) {
        return { success: false, message: (error as Error).message };
    }
};

export const createTag = async (tagData: TagCreateInterface): Promise<CreateResponse> => {
    const firestore = getFirestore();
    try {
        const docRef = await addDoc(collection(firestore, "tags"), tagData);
        return { success: true, id: docRef.id };
    } catch (error) {
        return { success: false, message: (error as Error).message };
    }
};

export const deleteTag = async (id: string): Promise<DeleteResponse> => {
    const firestore = getFirestore();
    try {
        await deleteDoc(doc(firestore, "tags", id));
        return { success: true, id };
    } catch (error) {
        return { success: false, message: (error as Error).message };
    }
};

export const editTag = async (tag: TagInterface): Promise<EditResponse> => {
    const firestore = getFirestore();
    const { id, ...restTag } = tag;
    try {
        await updateDoc(doc(firestore, "tags", id), restTag);
        return { success: true, id };
    } catch (error) {
        return { success: false, message: (error as Error).message };
    }
};
