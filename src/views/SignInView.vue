<template>
    <div class="sign-in-view">
        <section class="sign-in-content">
            <h1 class="sign-in-heading">Admin Panel</h1>
            <form @submit.prevent="onSubmit" class="sign-in-form">
                <p class="form-error" v-if="formError">{{ formError }}</p>
                <div class="inputs-container">
                    <InputValidationWrapper :fieldValidationError="errors.email">
                        <BaseInput title="Email" v-model="email" />
                    </InputValidationWrapper>
                    <InputValidationWrapper :fieldValidationError="errors.password">
                        <BaseInput
                            title="Password"
                            v-model="password"
                            :is-password="!showPassword" />
                    </InputValidationWrapper>
                </div>
                <div class="show-password-block">
                    <CustomCheckbox v-model="showPassword" checkbox-id="show-password" />
                    <label class="show-password-label" for="show-password">Show password</label>
                </div>
                <button type="submit">submit</button>
            </form>
        </section>
    </div>
</template>

<script setup lang="ts">
import BaseInput from "@/components/inputs/BaseInput.vue";
import CustomCheckbox from "@/components/inputs/CustomCheckbox.vue";
import InputValidationWrapper from "@/components/validators/InputValidationWrapper.vue";
import { useAuthStore } from "@/stores/auth.store";

import { useField, useForm } from "vee-validate";
import signInSchema from "@/schemas/signin.zod-schema";

import { ref } from "vue";
import { useRouter } from "vue-router";
import { toTypedSchema } from "@vee-validate/zod";

const router = useRouter();

const showPassword = ref(false);
const formError = ref("");

const { handleSubmit, errors } = useForm({
    initialValues: { email: "", password: "" },
    validationSchema: toTypedSchema(signInSchema),
});
const { value: email } = useField<string>("email");
const { value: password } = useField<string>("password");

const onSubmit = handleSubmit(async () => {
    const { signIn } = useAuthStore();
    const response = await signIn(email.value, password.value);

    if (!response.success) return (formError.value = response.message);

    return router.push({ path: "/admin" });
});
</script>

<style lang="scss" scoped>
.sign-in-view {
    display: flex;
    flex-direction: column;
    flex: 1;
    justify-content: center;
    align-items: center;
    .sign-in-content {
        display: flex;
        align-items: center;
        justify-content: center;
        flex-wrap: wrap;
        gap: 3rem;
        margin: 1rem;
        padding: 3rem;
        background-color: var(--color-background-mute);
        max-width: 600px;
        width: 90%;
        .sign-in-heading {
            white-space: nowrap;
        }
        .sign-in-form {
            display: flex;
            flex-direction: column;
            align-items: flex-start;
            justify-content: center;
            flex: 1;
            max-width: 500px;
            gap: 1.5rem;
            .inputs-container {
                display: flex;
                flex-direction: column;
                width: 100%;
                gap: 0.5rem;
            }
            .show-password-block {
                display: flex;
                align-items: center;
                gap: 0.3rem;
                .show-password-label {
                    cursor: pointer;
                }
            }
        }
    }
}
</style>
