<template>
    <input
        type="text"
        class="dialog-input"
        :value="modelValue"
        @input="updateModelValue"
        :placeholder="placeholder || 'Type here'" />
</template>

<script setup lang="ts">
type PropsType = {
    modelValue: string;
    placeholder?: string;
};

type EmitsType = {
    (e: "update:modelValue", value: string): void;
};

defineProps<PropsType>();

const emit = defineEmits<EmitsType>();

const updateModelValue = (event: Event) => {
    const target = event.target as HTMLInputElement;
    emit("update:modelValue", target.value);
};
</script>

<style lang="scss" scoped>
.dialog-input {
    border: solid 2px var(--text-dark-2);
    border-radius: 5px;
    padding: 0.3rem 1rem;
    width: 100%;
    outline: none;
    background-color: inherit;
    color: inherit;

    &:focus-visible {
        box-shadow: 0 0 0.2rem 0 var(--text-light-1);
    }
}
</style>
