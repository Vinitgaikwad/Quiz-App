import zod from "zod"

export const userCredObj = zod.object({
    username: zod.string(),
    password: zod.string(),
    retype: zod.string().optional()
});

export type UserCredType = zod.infer<typeof userCredObj>