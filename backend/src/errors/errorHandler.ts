import type { NextFunction, Request, Response } from "express";
import { AppError } from "./custom.errors";
import { ZodError } from "zod";

export async function errorHandler(
    err: Error,
    req: Request,
    res: Response,
    next: NextFunction
) {
    // Custom application errors
    if (err instanceof AppError) {
        return res.status(err.errorCode).json({
            success: false,
            error: err.message,
        });
    }

    // Zod validation errors
    if (err instanceof ZodError) {
        return res.status(400).json({
            success: false,
            error: "Validation failed",
            issues: err.issues.map((e: any) => ({
                path: e.path.join("."),
                message: e.message,
            })),
        });
    }

    // Unknown/unhandled errors
    console.error(err);

    return res.status(500).json({
        success: false,
        error: "Internal Server Error",
    });
}
