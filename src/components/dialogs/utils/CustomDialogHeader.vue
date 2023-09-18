<template>
    <header class="dialog-header">
        <h3 class="header-title">{{ title }}</h3>
        <CloseDialogBtn @click="closeFunc" />
    </header>
</template>

<script setup lang="ts">
import CloseDialogBtn from "./CloseDialogBtn.vue";

type PropsType = {
    title: string;
    closeFunc: () => void;
};

defineProps<PropsType>();
</script>

<style lang="scss" scoped>
.dialog-header {
    display: flex;
    align-items: center;
    .header-title {
        flex: 1;
    }
}
</style>
