<template>
    <div class="base-input-block">
        <p class="base-input-header" v-if="title">{{ title }}</p>
        <input
            :type="!isPassword ? 'text' : 'password'"
            class="base-input"
            :placeholder="placeholder || 'Type here...'"
            :value="modelValue"
            @input="updateModelValue" />
    </div>
</template>

<script setup lang="ts">
type PropsType = {
    title?: string;
    modelValue: string;
    placeholder?: string;
    isPassword?: boolean;
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
.base-input-block {
    display: grid;
    grid-gap: 0.2rem;
    max-width: 400px;
    min-width: 200px;
    .base-input {
        width: 100%;
        outline: none;
        border: none;
        border-bottom: solid 2px var(--color-text);
        background-color: transparent;
        padding: 0.2rem 0.3rem;
        font-size: 1.075em;
        line-height: 1.1em;

        &:focus {
            transition: all 0.2s ease-in-out;
            border-bottom: solid 2px var(--color-text-2);
        }
    }
}
</style>
