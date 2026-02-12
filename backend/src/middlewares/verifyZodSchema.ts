import type { NextFunction, Request, Response } from "express";
import type { ZodType } from "zod";

export function verifyZodSchema(zodSchema: ZodType) {
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