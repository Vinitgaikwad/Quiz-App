import { adminAuth } from "@/middlewares/handleAuth";
import { verifyZodSchema } from "@/middlewares/verifyZodSchema";
import { Router } from "express";
import { questionSchema, quizSchema } from "./quiz.schema";
import { createQuestionController, createQuizController, deletedQuestionController, deleteQuizController, getQuestionsForQuiz, getQuizs, updateQuestionController, updateQuizController } from "./quiz.controller";

export const quizRouter = Router();

quizRouter.use(adminAuth);

quizRouter.post("/create-quiz", verifyZodSchema(quizSchema), createQuizController);
quizRouter.post("/create-questions", verifyZodSchema(questionSchema), createQuestionController);

quizRouter.post("/delete-quiz", verifyZodSchema(quizSchema), deleteQuizController);
quizRouter.post("/delete-question", verifyZodSchema(questionSchema), deletedQuestionController);

quizRouter.post("/update-quiz", verifyZodSchema(quizSchema), updateQuizController);
quizRouter.post("/update-questions", verifyZodSchema(questionSchema), updateQuestionController);

quizRouter.post("/get-quiz", verifyZodSchema(quizSchema), getQuizs);
quizRouter.post("/get-questions", verifyZodSchema(questionSchema), getQuestionsForQuiz);
