import * as zod from "zod";

const validationSchema = zod.object({
    email: zod
        .string()
        .nonempty("This field is required")
        .email({ message: "Must be a valid email" }),
    password: zod
        .string()
        .nonempty("This field is required")
        .min(8, { message: "Password length must be between 8 and 16 characters" })
        .max(16, { message: "Password length must be between 8 and 16 characters" }),
});

export default validationSchema;
