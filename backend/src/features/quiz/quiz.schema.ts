import { QuestionType } from "@/generated/prisma/enums";
import zod from "zod"

export const questionSchema = zod.object({
    id: zod.number().optional(),
    question: zod.string(),
    questiontype: zod.enum(QuestionType),
    options: zod.array(zod.string()),
    correctAnswers: zod.array(zod.string()),
    quizId: zod.number()
}).refine(data => {
    if (data.questiontype === "MultipleChoice") {
        return data.options.length > 0;
    }
    return true;
}, {
    message: "Multiple choice questions must have options",
    path: ["options"]
});;

export const quizSchema = zod.object({
    id: zod.number().optional(),
    title: zod.string(),
    description: zod.string().optional(),
    questions: zod.array(questionSchema).optional()
});

export type Quiz = zod.infer<typeof quizSchema>
export type Question = zod.infer<typeof questionSchema>