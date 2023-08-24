import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const auth = getAuth();
const firestore = getFirestore();
const storage = getStorage();

const exportOptions = {
    firebaseAuth: auth,
    firestore,
    firestorage: storage,
};

export default exportOptions;
