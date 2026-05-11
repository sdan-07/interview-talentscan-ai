import express from 'express'
import authRouter from "./routes/auth.route.js"
import errorMiddleware from './middlewares/error.middleware.js';
import cookieParser from "cookie-parser";

const app = express();

app.use(express.json());
app.use(cookieParser());

app.get('/', (_,res)=> {
    res.json({message: 'Server running'});
})

app.use('/api/auth', authRouter);

app.use(errorMiddleware);

export default app;