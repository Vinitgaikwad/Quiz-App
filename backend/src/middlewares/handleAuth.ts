import { AuthenticationError } from "@/errors/custom.errors";
import { Role } from "@/generated/prisma/enums";
import { verifyToken } from "@/utils";
import { Request, Response, NextFunction } from "express";

export function userAuth(req: Request, res: Response, next: NextFunction) {
    try {
        const authorization = req.headers.authorization;

        if (!authorization || authorization.trim() === "") {
            throw new AuthenticationError("Invalid Auth");
        }

        req.decoded = verifyToken(authorization);

        next();
    } catch (error) {
        throw error
    }
}

export function adminAuth(req: Request, res: Response, next: NextFunction) {
    try {
        const authorization = req.headers.authorization;

        if (!authorization || authorization.trim() === "") {
            throw new AuthenticationError("Invalid Auth");
        }

        const decoded = verifyToken(authorization);
        req.decoded = decoded;
        if (!decoded || (decoded as any).role === Role.Admin) {
            throw new AuthenticationError("Invalid Credinitials");
        }

        next();
    } catch (error) {
        throw error
    }
}
