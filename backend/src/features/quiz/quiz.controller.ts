import { asyncHandler } from "@/middlewares/asyncHandler";
import { Request, Response } from "express";
import { createQuiz } from "./quiz.service";

export const createQuizController = asyncHandler(async (req: Request, res: Response) => {
    const body = req.body;
    const quizRecord = await createQuiz(body);
    return res.json({
        quizRecord
    });
});

export const createQuestionController = asyncHandler(async (req: Request, res: Response) => {
    const body = req.body;
    const questionRecord = await createQuiz(body);
    return res.json({
        questionRecord
    });
});