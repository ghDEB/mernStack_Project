import express from "express";
import userRouter from "./routes/user.js"
import taskRouter from "./routes/task.js"
import {config} from "dotenv";
import cookieParser from "cookie-parser";
import { errormiddleware } from "./middlewares/error.js";
import cors from "cors"

config({
    path:"./data/config.env"
})

export const app = express();
app.use(express.json());
app.use(cookieParser());
app.use(cors({
    origin: [],
    methods: ["GET","POST","PUT","DELETE"],
    credentials:true
}))

app.use("/api/v1/users",userRouter);
app.use("/api/v1/tasks",taskRouter);

app.get("/",(req,res)=>
{
    res.send("Nice Working");
})

//error middleware
app.use(errormiddleware)