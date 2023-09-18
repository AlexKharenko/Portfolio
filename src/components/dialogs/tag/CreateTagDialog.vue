<template>
    <CustomDialog ref="customDialogRef">
        <CustomDialogHeader title="Create tag" :close-func="hideDialog" />
        <form @submit.prevent="onSubmit" class="dialog-form create-tag-form">
            <InputValidationWrapper :fieldValidationError="errors.tagName">
                <DialogInput v-model="tagName" />
            </InputValidationWrapper>
            <button type="submit">Submit</button>
        </form>
    </CustomDialog>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { CustomDialog } from "vue-dialog-library";
import CustomDialogHeader from "@/components/dialogs/utils/CustomDialogHeader.vue";
import type { TagCreateInterface, TagInterface } from "@/interfaces/tag.interface";
import { createTag } from "@/utils/firebase-calls/tags.calls";
import { useDialogEventsStore } from "@/stores/dialogEvents.store";
import { useRoute } from "vue-router";

import InputValidationWrapper from "@/components/validators/InputValidationWrapper.vue";
import DialogInput from "../utils/DialogInput.vue";
// import BaseInput from "@/components/inputs/BaseInput.vue";

import { useField, useForm } from "vee-validate";
import { toTypedSchema } from "@vee-validate/zod";
import createEditTagSchema from "@/schemas/createEditTag.zod-schema";

const customDialogRef = ref<InstanceType<typeof CustomDialog>>();

const router = useRoute();

const { handleSubmit, resetField, errors } = useForm({
    initialValues: { tagName: "" },
    validationSchema: toTypedSchema(createEditTagSchema),
});
const { value: tagName } = useField<string>("tagName");

const showDialog = (): void => {
    customDialogRef.value?.show();
};

const hideDialog = (): void => {
    customDialogRef.value?.hide();
    resetField("tagName");
};

const onSubmit = handleSubmit(async (): Promise<void> => {
    const tagData: TagCreateInterface = {
        tagName: tagName.value,
    };
    const response = await createTag(tagData);
    if (response.success) {
        if (router.name === "Tags | Admin Dashboard") {
            const tag: TagInterface = {
                id: response.id,
                ...tagData,
            };
            const dialogEventsStore = useDialogEventsStore();
            dialogEventsStore.setDialogEventValue("newTag", tag);
        }
        hideDialog();
    } else {
        console.log(response.message);
    }
});

defineExpose({ showDialog, hideDialog });
</script>

<style lang="scss" scoped></style>

<style lang="scss">
.dialog-form {
    margin: 0.4rem 0;
    display: grid;
    gap: 1rem;
}
.dialog-content {
    width: 400px;

    @media screen and (max-width: 500px) {
        width: 250px;
    }
}
</style>
