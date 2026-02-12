import { asyncHandler } from "@/middlewares/asyncHandler";
import { type Request, type Response } from "express";
import { signInHandler, signUpHandler } from "./auth.service";

export const signUpController = asyncHandler(async (req: Request, res: Response) => {
    const body = req.body;
    await signUpHandler(body);
    return res.json({
        message: "User Created Succussfully"
    });
});


export const signInController = asyncHandler(async (req: Request, res: Response) => {
    const body = req.body;
    const token = await signInHandler(body);
    return res.json({
        token
    });
});