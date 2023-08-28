<template>
    <div class="checkbox-block">
        <input
            type="checkbox"
            class="custom-checkbox"
            :value="modelValue"
            :checked="modelValue"
            :id="checkboxId"
            @change="handleUpdateChange" />
        <label
            :for="checkboxId"
            class="checkmark"
            :class="{ checked: modelValue }"
            tabindex="0"
            @keydown.enter="handleKeyPress">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                <path d="M20.285 2l-11.285 11.567-5.286-5.011-3.714 3.716 9 8.728 15-15.285z" />
            </svg>
        </label>
    </div>
</template>

<script setup lang="ts">
type PropsType = {
    checkboxId: string;
    modelValue: boolean;
};

type EmitsType = {
    (e: "update:modelValue", value: boolean): void;
};

defineProps<PropsType>();
const emit = defineEmits<EmitsType>();

const handleUpdateChange = (event: Event) => {
    const element = event.target as HTMLInputElement;
    emit("update:modelValue", element.checked);
};

const handleKeyPress = (event: Event) => {
    const element = event.target as HTMLInputElement;
    element.click();
};
</script>

<style lang="scss" scoped>
.checkbox-block {
    .custom-checkbox {
        display: none;
    }
    .checkmark {
        outline: none;
        height: 24px;
        width: 24px;
        border: 2px solid var(--color-text);
        border-radius: 50%;
        display: flex;
        justify-content: center;
        align-items: center;
        cursor: pointer;
        user-select: none;
        transition: all 0.2s ease-in-out;

        &:focus-visible,
        &.checked:focus-visible {
            border-color: var(--color-text-2);
        }

        svg {
            height: 16px;
            width: 16px;
            fill: var(--color-text);
            transition: all 0.2s linear;
        }
        &.checked {
            border-color: var(--color-success);
            svg {
                fill: var(--color-success);
            }
        }
    }
}
</style>
