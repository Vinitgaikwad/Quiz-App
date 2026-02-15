import { asyncHandler } from "@/middlewares/asyncHandler";
import { Request, Response } from "express";
import { createQuestions, createQuiz, deleteQuestion, deleteQuiz, getQuestions, getQuiz, updateQuestion, updateQuiz } from "./quiz.service";

export const createQuizController = asyncHandler(async (req: Request, res: Response) => {
    const body = req.body;
    const decoded = req.decoded;
    console.log(decoded);
    const quizRecord = await createQuiz(body, decoded.userId);
    return res.json({
        quizRecord
    });
});

export const createQuestionController = asyncHandler(async (req: Request, res: Response) => {
    const body = req.body;
    const questionRecord = await createQuestions(body);
    return res.json({
        questionRecord
    });
});


export const getQuizs = asyncHandler(async (req: Request, res: Response) => {
    const body = req.body;
    const quizs = await getQuiz(body);
    return res.json({
        quizs
    });
});

export const getQuestionsForQuiz = asyncHandler(async (req: Request, res: Response) => {
    const body = req.body;
    const decoded = req.decoded;
    const questions = await getQuestions(body, decoded.userId);
    return res.json({
        questions
    });
});

export const updateQuizController = asyncHandler(async (req: Request, res: Response) => {
    const body = req.body;
    const updatedQuiz = await updateQuiz(body)
    return res.json({
        updatedQuiz
    });
});

export const updateQuestionController = asyncHandler(async (req: Request, res: Response) => {
    const body = req.body;
    const updatedQuestion = await updateQuestion(body.question, body.quizId);
    return res.json({
        updatedQuestion
    });
});

export const deleteQuizController = asyncHandler(async (req: Request, res: Response) => {
    const body = req.body
    const deletedQuiz = await deleteQuiz(body);
    return res.json({
        deletedQuiz
    });
});


export const deletedQuestionController = asyncHandler(async (req: Request, res: Response) => {
    const body = req.body;
    const deletedQuestion = await deleteQuestion(body);
    return res.json({
        deletedQuestion
    });
});

