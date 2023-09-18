import * as zod from "zod";

const validationSchema = zod.object({
    tagName: zod
        .string()
        .nonempty("This field is required")
        .min(2, { message: "Tag length must be between 2 and 10 characters" })
        .max(10, { message: "Tag length must be between 2 and 10 characters" }),
});

export default validationSchema;
