<template>
    <div class="social-link-item">
        <a :href="url" target="_blank">
            <slot />
        </a>
        <p class="icon-tooltip">{{ tooltipText }}</p>
    </div>
</template>

<script setup lang="ts">
type PropsType = {
    tooltipText: string;
    url: string;
};

defineProps<PropsType>();
</script>

<style lang="scss" scoped>
.social-link-item {
    position: relative;
    a {
        color: inherit;
        display: flex;
        align-items: center;
        justify-content: center;
        transition: color 0.3s ease-in-out;
        outline: none;
        svg {
            height: 2rem;
            width: 2rem;
        }
    }
    .icon-tooltip {
        position: absolute;
        left: 2.3rem;
        top: 50%;
        translate: 0 -50%;
        overflow: hidden;

        max-width: 0;

        opacity: 0;
        border-radius: 3px;
        padding: 0.2rem;
        background: var(--grey-muted);
        transition:
            padding 0.3s ease-in-out,
            max-width 0.3s ease-in-out,
            opacity 0.2s ease-in-out;
        user-select: none;

        @media screen and (max-width: 570px) {
            top: 2.5rem;
            left: 50%;
            translate: -50%;
            max-width: none;
            max-height: 0;
            transition:
                padding 0.3s ease-in-out,
                max-height 0.3s ease-in-out,
                opacity 0.2s ease-in-out;
            padding: 0 0.2rem;
        }
        @media screen and (max-height: 700px) and (max-width: 570px) {
            top: 2rem;
        }
    }
    &:hover,
    &:has(a:focus-visible) {
        a {
            color: var(--color-text-2);
        }
        .icon-tooltip {
            max-width: 80px;
            opacity: 1;
            @media screen and (max-width: 570px) {
                max-width: none;
                max-height: 1.5rem;
                padding: 0.2rem;
            }
        }
    }
}
</style>
