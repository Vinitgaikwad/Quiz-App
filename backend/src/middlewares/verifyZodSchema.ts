import type { NextFunction, Request } from "express";
import type { ZodAny } from "zod";

export function verifyZodSchema(zodSchema: ZodAny) {
    return (req: Request, res: Response, next: NextFunction) => {
        try {
            const body = req.body;
            zodSchema.parse(body);
            next();
        } catch (error) {
            throw error
        }
    }
}