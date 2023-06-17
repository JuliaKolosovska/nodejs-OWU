import express, {NextFunction, Request, Response} from "express";
import * as mongoose from "mongoose";
import {configs} from "./configs/config";
import {userRouter} from "./routes/user.router";
import {ApiError} from "./errors/api.error"
import {authRouter} from "./routes/auth.router"

const app = express();

app.use(express.json());
app.use(express.urlencoded({extended: true}));

// CRUD - create, read, update, delete

app.use("/users", userRouter);

app.use('/auth', authRouter)
app.use((error:ApiError, req:Request, res:Response, next:NextFunction)=>{
    const status=error.status||500;
return res.status(status).json({
    message:error.message,
    status: error.status
})
})


app.listen(configs.PORT, () => {
    mongoose.connect(configs.DB_URL);
    console.log(`Server has started on PORT ${configs.PORT}`);
});