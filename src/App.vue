<template>
    <NavBar v-if="showNavBar"></NavBar>
    <main class="main-wrapper">
        <RouterView />
    </main>
</template>

<script setup lang="ts">
import { RouterView, useRoute } from "vue-router";
import NavBar from "./components/NavBar.vue";
import { computed } from "vue";

const router = useRoute();
const showNavBar = computed(() => {
    if (router.path.startsWith("/admin")) {
        return false;
    }
    return true;
});
</script>

<style lang="scss" scoped>
.main-wrapper {
    display: flex;
    flex-direction: column;
    flex-grow: 1;
    // max-width: calc(1280px + 1rem * 2);
    // padding: 0 1rem;
    width: 100%;
    // margin: 0 auto;
    position: relative;
}
</style>
