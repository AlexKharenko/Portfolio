<template>
    <button class="close-dialog"><PlusIcon /></button>
</template>

<script setup lang="ts">
import PlusIcon from "@/components/icons/AdminPanel/PlusIcon.vue";
</script>

<style lang="scss" scoped>
.close-dialog {
    background: none;
    border: none;
    outline: none;
    height: 1.5rem;
    aspect-ratio: 1 / 1;
    border-radius: 5px;
    transition: box-shadow 0.3s ease-in-out;
    color: inherit;

    svg {
        rotate: 45deg;
        transition: scale 0.3s ease-in-out;
    }

    &:hover {
        svg {
            scale: 1.1;
        }
    }

    &:focus-visible {
        box-shadow: 0 0 5px 1px #0101ff;
    }
}
</style>
