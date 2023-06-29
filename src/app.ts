import express, {NextFunction, Request, Response} from "express";
import * as mongoose from "mongoose";
import {configs} from "./configs/config";
import {userRouter} from "./routes/user.router";
import {ApiError} from "./errors/api.error"
import {authRouter} from "./routes/auth.router"
import { cronRunner } from "./crons";
import * as swaggerUi from 'swagger-ui-express';
import rateLimit from 'express-rate-limit';
import cors from 'cors';
import * as swaggerJson from './utils/swagger.json';

const app = express();

const apiLimiter=rateLimit({
    windowMs:60*1000,
    max:10,
    standardHeaders:true,
});

app.use('*', apiLimiter);
app.use( cors({
    origin: "*",
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
    allowedHeaders: [
        "Authorization",
        "Content-Type",
        "Origin",
        "Access-Control-Allow-Origin",
    ],
    preflightContinue: false,
    optionsSuccessStatus: 200,
}))
app.use(express.json());
app.use(express.urlencoded({extended: true}));

// CRUD - create, read, update, delete

app.use("/users", userRouter);

app.use('/auth', authRouter);

app.use('/swagger', swaggerUi.serve, swaggerUi.setup(swaggerJson));
app.use((error:ApiError, req:Request, res:Response, next:NextFunction)=>{
    const status=error.status||500;
return res.status(status).json({
    message:error.message,
    status: error.status
})
})


app.listen(configs.PORT, () => {
    mongoose.connect(configs.DB_URL);
    cronRunner();
    console.log(`Server has started on PORT ${configs.PORT}`);
});