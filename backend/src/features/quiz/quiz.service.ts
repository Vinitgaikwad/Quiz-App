import { prisma } from "@/db";
import { Question, Quiz } from "./quiz.schema";
import { PrismaClientValidationError } from "@prisma/client/runtime/client";
import { PrismaClientKnownRequestError } from "@/generated/prisma/internal/prismaNamespace";
import { BadRequest } from "@/errors/custom.errors";

export async function createQuiz(quiz: Quiz) {
    try {
        const { title, description } = quiz;
        const quizData = await prisma.quiz.create({
            data: {
                title: title,
                description: description ?? "",
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

export async function createQuestions(questionObj: Question) {
    try {
        const { quizId, question, questiontype, options, correctAnswers } = questionObj;

        const questions = await prisma.question.create({
            data: {
                question,
                questiontype,
                quiz: {
                    connect: { id: quizId }
                },
                options: options,
                correctAnswers: correctAnswers
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