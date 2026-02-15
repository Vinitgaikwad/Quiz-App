import { prisma } from "@/db";
import { Question, Quiz } from "./quiz.schema";
import { PrismaClientValidationError } from "@prisma/client/runtime/client";
import { PrismaClientKnownRequestError } from "@/generated/prisma/internal/prismaNamespace";
import { BadRequest } from "@/errors/custom.errors";


export async function getQuiz(userId: number) {
    try {
        const quizs = await prisma.quiz.findMany({
            where: {
                userId
            }
        });
        return quizs
    } catch (error) {
        if (error instanceof PrismaClientKnownRequestError && error.code === "P2025") {
            throw new BadRequest("Quiz not found or you don't have permission to update it")
        }
        if (error instanceof PrismaClientValidationError || error instanceof PrismaClientKnownRequestError) {
            throw new BadRequest("Invalid Data or Bad Request")
        }
        throw error;
    }
}

export async function getQuestions(quiz: Quiz, userId: number) {
    try {
        const { id } = quiz;
        if (!id) {
            throw new BadRequest("Invalid data provided");
        }

        const quizQuestions = prisma.question.findMany({
            where: {
                quizId: id
            }
        });
        return quizQuestions;
    } catch (error) {
        if (error instanceof PrismaClientKnownRequestError && error.code === "P2025") {
            throw new BadRequest("Quiz not found");
        }
        if (error instanceof PrismaClientValidationError || error instanceof PrismaClientKnownRequestError) {
            throw new BadRequest("Invalid Data or Bad Request");
        }
        throw error;
    }
}

export async function createQuiz(quiz: Quiz, userId: number) {
    try {
        const { title, description } = quiz;
        const quizData = await prisma.quiz.create({
            data: {
                title: title,
                description: description ?? null,
                userRef: {
                    connect: { id: userId }
                }
            }
        });
        return quizData;
    } catch (error) {
        if (error instanceof PrismaClientValidationError || error instanceof PrismaClientKnownRequestError) {
            throw new BadRequest("Invalid Data or Bad Request")
        }

        throw error
    }
}

export async function createQuestions(questionObj: Question, quizID: number) {
    try {
        const { quizId, question, questiontype, options, correctAnswers } = questionObj;

        const questions = await prisma.question.create({
            data: {
                question,
                questiontype,
                quiz: {
                    connect: { id: quizId }
                },
                createdOptions: options,
                createdCorrectAnswers: correctAnswers
            }
        });

        return questions;
    } catch (error) {
        if (error instanceof PrismaClientValidationError || error instanceof PrismaClientKnownRequestError) {
            throw new BadRequest("Invalid Data or Bad Request")
        }
        throw error
    }
}

export async function updateQuiz(quiz: Quiz, quizID: number) {
    try {
        const { id, title, description } = quiz;
        if (!id) {
            throw new BadRequest("Invalid data provided");
        }

        const updatedQuiz = await prisma.quiz.update({
            where: {
                id: id,
                userId: quizID
            },
            data: {
                ...(title && { title }),
                ...(description !== undefined && { description })
            }
        });
        return updatedQuiz;
    } catch (error) {
        if (error instanceof PrismaClientKnownRequestError && error.code === "P2025") {
            throw new BadRequest("Quiz not found or you don't have permission to update it")
        }
        if (error instanceof PrismaClientValidationError || error instanceof PrismaClientKnownRequestError) {
            throw new BadRequest("Invalid Data or Bad Request")
        }
        throw error;
    }
}

export async function updateQuestion(question: Question, quizID: number) {
    try {
        if (!question.id) {
            throw new BadRequest("Invalid Data or Bad Request");
        }
        const questionRecord = await prisma.question.update({
            where: {
                id: question.id,
                quizId: quizID
            },
            data: {
                ...(question.question !== undefined && { question: question.question }),
                ...(question.questiontype !== undefined && { questiontype: question.questiontype }),
                ...(question.options !== undefined && { createdOptions: question.options }),
                ...(question.correctAnswers !== undefined && { createdCorrectAnswers: question.correctAnswers })
            }
        });
        return questionRecord;
    } catch (error) {
        if (error instanceof PrismaClientKnownRequestError && error.code === "P2025") {
            throw new BadRequest("Question not found or does not belong to this quiz")
        }
        if (error instanceof PrismaClientValidationError || error instanceof PrismaClientKnownRequestError) {
            throw new BadRequest("Invalid Data or Bad Request")
        }
        throw error;
    }
}

export async function deleteQuiz(quiz: Quiz) {
    const { id } = quiz;
    try {
        if (!id) {
            throw new BadRequest("Invalid Data or Bad Request");
        }

        const [_, deletedQuizRecord] = await prisma.$transaction([
            prisma.question.deleteMany({
                where: { quizId: id }
            }),
            prisma.quiz.delete({
                where: { id }
            })
        ]);

        return deletedQuizRecord;
    } catch (error) {
        if (error instanceof PrismaClientKnownRequestError && error.code === "P2025") {
            throw new BadRequest("Quiz not found");
        }
        if (error instanceof PrismaClientValidationError || error instanceof PrismaClientKnownRequestError) {
            throw new BadRequest("Invalid Data or Bad Request");
        }
        throw error;
    }
}

export async function deleteQuestion(question: Question) {
    try {
        if (!question.id) {
            throw new BadRequest("Invalid Data or Bad Request");
        }
        const deletedQuestions = await prisma.question.delete({
            where: {
                id: question.id,
                quizId: question.quizId
            }
        });

        return deletedQuestions
    } catch (error) {
        if (error instanceof PrismaClientKnownRequestError && error.code === "P2025") {
            throw new BadRequest("Quiz not found");
        }
        if (error instanceof PrismaClientValidationError || error instanceof PrismaClientKnownRequestError) {
            throw new BadRequest("Invalid Data or Bad Request");
        }
        throw error;
    }
}

