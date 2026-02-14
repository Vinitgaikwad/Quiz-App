import { adminAuth } from "@/middlewares/handleAuth";
import { verifyZodSchema } from "@/middlewares/verifyZodSchema";
import { Router } from "express";
import { questionSchema, quizSchema } from "./quiz.schema";
import { createQuestionController, createQuizController } from "./quiz.controller";

export const quizRouter = Router();

quizRouter.use(adminAuth);

quizRouter.post("/create-quiz", verifyZodSchema(quizSchema), createQuizController);
quizRouter.post("/create-quiz", verifyZodSchema(questionSchema), createQuestionController);
