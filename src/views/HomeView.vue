<template>
    <div class="home-view">
        <section class="section-hero">
            <div class="text-container">
                <div class="text-wrapper">
                    <h1 class="greeting-header">Hi, Stranger</h1>
                    <h3 class="about-me-header">
                        I'm <span class="vue-text">Vue.js</span> frontend developer<br />Alexey
                        Kharenko
                    </h3>
                    <p class="additioanl-text">
                        Here you can know me better, see my projects I was working on or still. Also
                        you can reach me with comfortable form😉
                    </p>
                </div>
            </div>
            <div class="photo-container">
                <div class="photo-wrapper"><img src="../assets/download.png" alt="My image" /></div>
            </div>
            <SocialLinks />
        </section>
    </div>
</template>

<script setup lang="ts">
import SocialLinks from "@/components/socials/SocialLinks.vue";
</script>

<style lang="scss" scoped>
.home-view {
    .section-hero {
        height: calc(100dvh - var(--nav-bar-height));
        display: grid;
        grid-template-columns: 1fr 1fr;
        justify-items: center;
        align-items: center;
        padding: 0 3rem;
        gap: 1rem;

        @media screen and (max-width: 650px) {
            grid-template-columns: 1fr;
        }
        .text-container {
            @media screen and (max-width: 650px) {
                grid-row: 2;
                align-self: flex-start;
            }
            .text-wrapper {
                max-width: 400px;
                .greeting-header {
                    font-size: 3em;
                    margin-bottom: 3rem;
                    white-space: nowrap;
                }
                .about-me-header {
                    margin-bottom: 0.4rem;
                    white-space: nowrap;
                }
                .additioanl-text {
                    line-height: 1.3em;
                    color: var(--color-text-muted);
                }
            }
        }
        .photo-container {
            .photo-wrapper {
                height: 50vh;
                aspect-ratio: 1/1;
                overflow: hidden;
                @media screen and (max-width: 840px) {
                    height: 30vh;
                }
                img {
                    height: inherit;
                    width: 100%;
                    border-radius: 50%;
                    object-fit: cover;
                }
            }
        }
    }
}
</style>
