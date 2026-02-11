import express, { type Request, type Response } from 'express';

const app = express();

export function StartServer() {
    const PORT = 3000;

    HandleRoutes();

    app.listen(PORT, () => {
        console.log(`Server running at http://localhost:${PORT}`);
    });
}

function HandleRoutes() {
    console.log("Routes Loaded")
}
