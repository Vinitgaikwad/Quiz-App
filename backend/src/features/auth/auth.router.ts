import { verifyZodSchema } from "@/middlewares/verifyZodSchema";
import { Router } from "express";
import { userCredObj } from "./auth.schema";
import { signInController, signUpController } from "./auth.controller";

export const userRouter = Router();

userRouter.post('/sign-up', verifyZodSchema(userCredObj), signUpController);
userRouter.post('/sign-in', verifyZodSchema(userCredObj), signInController);