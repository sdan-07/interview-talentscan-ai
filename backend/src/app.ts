import express from 'express'
import authRouter from "./routes/auth.route.js"
import interviewRouter from './routes/interview.route.js';
import errorMiddleware from './middlewares/error.middleware.js';
import cookieParser from "cookie-parser";
import cors from "cors";

const app = express();

app.use(cors({
    origin: "http://localhost:5173",
    methods: ['POST', 'GET', 'PUT', 'DELETE'],
    credentials: true
}));

app.use(express.json());
app.use(cookieParser());

app.get('/', (_,res)=> {
    res.json({message: 'Server running'});
})

app.use('/api/auth', authRouter);
app.use('/api/interview', interviewRouter);

app.use(errorMiddleware);

export default app;

//add process.env.APP_URL || 