import { asyncHandler } from "@/middlewares/asyncHandler";
import { Request, Response } from "express";
import { createQuestions, createQuiz } from "./quiz.service";

export const createQuizController = asyncHandler(async (req: Request, res: Response) => {
    const body = req.body;
    const decoded = req.decoded;
    console.log(decoded);
    const quizRecord = await createQuiz(body, decoded.userID);
    return res.json({
        quizRecord
    });
});

export const createQuestionController = asyncHandler(async (req: Request, res: Response) => {
    const body = req.body;
    const questionRecord = await createQuestions(body, body.quizID);
    return res.json({
        questionRecord
    });
});