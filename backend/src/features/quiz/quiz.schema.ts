import { QuestionType } from "@/generated/prisma/enums";
import zod from "zod"

export const questionSchema = zod.object({
    id: zod.number().optional(),
    question: zod.string(),
    questiontype: zod.enum(QuestionType),
    options: zod.array(zod.string()),
    correctAnswers: zod.array(zod.string()),
    quizId: zod.number()
});

export const quizSchema = zod.object({
    id: zod.number().optional(),
    title: zod.string(),
    description: zod.string().optional(),
    questions: zod.array(questionSchema).optional()
});

export type Quiz = zod.infer<typeof quizSchema>
export type Question = zod.infer<typeof questionSchema>