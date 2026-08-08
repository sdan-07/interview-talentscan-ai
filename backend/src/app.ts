import express, { type Application, type Response } from 'express'
import authRouter from "./routes/auth.route.js"
import interviewRouter from './routes/interview.route.js';
import errorMiddleware from './middlewares/error.middleware.js';
import cookieParser from "cookie-parser";
import cors from "cors";
import path from "path";

const app:Application = express();

app.use(express.static("public"));

app.use(cors({
    origin: process.env.APP_URL || true,
    methods: ['POST', 'GET', 'PUT', 'DELETE'],
    credentials: true
}));

app.use(express.json());
app.use(cookieParser());

app.use('/api/auth', authRouter);
app.use('/api/ai', interviewRouter);

// React Router fallback
app.get("/{*path}", (_, res) => {
  res.sendFile(path.resolve("public", "index.html"));
});

app.use(errorMiddleware);


export default app; 
