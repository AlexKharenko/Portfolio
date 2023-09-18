import "./assets/main.scss";

import "vue-toastification/dist/index.css";

import { createApp } from "vue";
import { createPinia } from "pinia";
import Toast, { type PluginOptions } from "vue-toastification";

import App from "./App.vue";
import router from "./router";
import { initializeApp } from "firebase/app";

const firebaseConfig = {
    apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
    authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
    projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
    storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
    appId: import.meta.env.VITE_FIREBASE_APP_ID,
};

initializeApp(firebaseConfig);

const app = createApp(App);

const toastOptions: PluginOptions = {
    timeout: 3000,
    maxToasts: 5,
    showCloseButtonOnHover: true,
};

app.use(Toast, toastOptions);
app.use(createPinia());
app.use(router);

app.mount("#app");
