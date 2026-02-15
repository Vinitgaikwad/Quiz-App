import { errorHandler } from '@/errors/errorHandler';
import { userRouter } from '@/features';
import { quizRouter } from '@/features/quiz/quiz.router';
import express from 'express';

const app = express();

export function StartServer() {
    const PORT = 3000;
    app.use(express.json())

    HandleRoutes();

    app.listen(PORT, () => {
        console.log(`Server running at http://localhost:${PORT}`);
    });
}

function HandleRoutes() {
    app.use("/user", userRouter);
    app.use('/admin', quizRouter);
    app.use(errorHandler);
}
