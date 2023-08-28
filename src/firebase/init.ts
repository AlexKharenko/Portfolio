import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firestore = getFirestore();
const storage = getStorage();

export { firestore, storage as firestorage };
