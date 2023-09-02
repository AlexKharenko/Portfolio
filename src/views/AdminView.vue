<template>
    <div class="admin-views hide-nav-bar">
        <AdminNavBar />
        <RouterView />
    </div>
</template>

<script setup lang="ts">
import AdminNavBar from "@/components/AdminNavBar.vue";
</script>

<style lang="scss" scoped>
.admin-views {
    display: grid;
    grid-template-columns: auto 1fr;
    flex-grow: 1;
    width: 100%;
    position: relative;
}
</style>
