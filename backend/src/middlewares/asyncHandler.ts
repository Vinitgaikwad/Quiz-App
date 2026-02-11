import type { NextFunction, Request, Response } from "express";

export function asyncHandler(fun: (req: Request, res: Response, next: NextFunction) => Promise<any>) {
    return (req: Request, res: Response, next: NextFunction) => {
        Promise.resolve(fun(req, res, next)).catch(next)
    }
}