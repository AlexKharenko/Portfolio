<template>
    <div class="social-links-container">
        <SocialItem tooltip-text="LinkedIn" url="#">
            <LinkedInIcon />
        </SocialItem>
        <SocialItem tooltip-text="Instagram" url="#">
            <InstagramIcon />
        </SocialItem>
        <SocialItem tooltip-text="Github" url="#">
            <GithubIcon />
        </SocialItem>
    </div>
</template>

<script setup lang="ts">
import LinkedInIcon from "@/components/icons/LinkedInIcon.vue";
import InstagramIcon from "@/components//icons/InstagramIcon.vue";
import GithubIcon from "@/components//icons/GithubIcon.vue";
import SocialItem from "./SocialItem.vue";
</script>

<style lang="scss" scoped>
.social-links-container {
    position: absolute;
    left: 5%;
    bottom: 50px;
    display: flex;
    flex-direction: column;
    gap: 2rem;

    @media screen and (max-width: 570px) {
        flex-direction: row;
        left: 50%;
        translate: -50% 0;
        gap: 3rem;
    }

    @media screen and (max-height: 700px) and (max-width: 570px) {
        bottom: 1.5rem;
    }
}
</style>
