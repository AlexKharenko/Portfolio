<template>
    <button class="create-btn">
        <PlusIcon />
        <p class="btn-inner-text">{{ btnText }}</p>
    </button>
</template>

<script setup lang="ts">
import PlusIcon from "@/components/icons/AdminPanel/PlusIcon.vue";

defineProps<{ btnText: string }>();
</script>

<style lang="scss" scoped>
.create-btn {
    display: flex;
    align-items: center;
    gap: 0.8rem;
    padding: 0.3rem 0.5rem;
    border: none;
    border-radius: 5px;
    background-color: var(--color-text);
    color: var(--color-background-mute);
    transition: background-color 0.3s ease-in-out;

    &:hover,
    :focus-visible {
        background-color: var(--color-text-2);
    }

    svg {
        height: 0.8rem;
        aspect-ratio: 1 / 1;
    }
    .btn-inner-text {
        white-space: nowrap;
        font-size: 1.2em;
    }
}
</style>
