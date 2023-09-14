<template>
    <div class="input-wrapper">
        <slot />
        <div class="errors-block" v-if="fieldValidationError">
            <p class="validation-error">{{ fieldValidationError }}</p>
        </div>
    </div>
</template>

<script setup lang="ts">
type PropsType = {
    fieldValidationError: string | undefined;
};

defineProps<PropsType>();
</script>

<style lang="scss" scoped>
.input-wrapper {
    position: relative;
    .errors-block {
        .validation-error {
            padding: 0.1rem 0;
            font-size: 0.85em;
            color: var(--color-danger);
        }
    }
}
</style>
