<template>
    <CustomDialog ref="customDialogRef">
        <CustomDialogHeader title="Edit tag" :close-func="hideDialog" />
        <form @submit.prevent="onSubmit" class="dialog-form edit-tag-form">
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
import type { TagInterface } from "@/interfaces/tag.interface";

import { editTag } from "@/utils/firebase-calls/tags.calls";

import CustomDialogHeader from "@/components/dialogs/utils/CustomDialogHeader.vue";
// import BaseInput from "@/components/inputs/BaseInput.vue";
import DialogInput from "../utils/DialogInput.vue";
import InputValidationWrapper from "@/components/validators/InputValidationWrapper.vue";

import { toTypedSchema } from "@vee-validate/zod";
import { useField, useForm } from "vee-validate";
import createEditTagSchema from "@/schemas/createEditTag.zod-schema";

type PropsType = {
    onSuccessCb: (tagData: TagInterface) => void;
};

const customDialogRef = ref<InstanceType<typeof CustomDialog>>();
const props = defineProps<PropsType>();

const intialTag = ref<TagInterface | null>(null);

const { handleSubmit, resetField, errors } = useForm({
    initialValues: { tagName: "" },
    validationSchema: toTypedSchema(createEditTagSchema),
});
const { value: tagName } = useField<string>("tagName");

const showDialog = (tag: TagInterface): void => {
    customDialogRef.value?.show();
    intialTag.value = tag;

    if (intialTag.value) setFields(intialTag.value);
};

const hideDialog = (): void => {
    customDialogRef.value?.hide();
    intialTag.value = null;
    resetField("tagName");
};

const onSubmit = handleSubmit(async (): Promise<void> => {
    if (!intialTag.value) return;
    const tagData: TagInterface = {
        id: intialTag.value.id,
        tagName: tagName.value,
    };
    const response = await editTag(tagData);
    if (response.success) {
        props.onSuccessCb(tagData);
        hideDialog();
    } else {
        console.log(response.message);
    }
});

const setFields = (tag: TagInterface): void => {
    tagName.value = tag.tagName;
};

defineExpose({ showDialog, hideDialog });
</script>

<style lang="scss" scoped></style>

<style lang="scss">
.dialog-content {
    width: 400px;

    @media screen and (max-width: 500px) {
        width: 250px;
    }
}
</style>
