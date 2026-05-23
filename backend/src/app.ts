import express, { type Application, type Response } from 'express'
import authRouter from "./routes/auth.route.js"
import interviewRouter from './routes/interview.route.js';
import errorMiddleware from './middlewares/error.middleware.js';
import cookieParser from "cookie-parser";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";

const app:Application = express();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const publicPath = path.join(__dirname, '..', 'public');


app.use(cors({
    origin: process.env.APP_URL ?? "http://localhost:5173",
    methods: ['POST', 'GET', 'PUT', 'DELETE'],
    credentials: true
}));

app.use(express.json());
app.use(cookieParser());

app.use('/api/auth', authRouter);
app.use('/api/ai', interviewRouter);

// SPA fallback
app.get('/{*path}', (_, res: Response): void => {
    res.sendFile(path.join(publicPath, 'index.html'));
});

app.use(errorMiddleware);


export default app; 