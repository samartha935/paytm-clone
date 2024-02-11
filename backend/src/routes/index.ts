import express from "express"
import {userRouter} from "./user";

const app = express()

app.use("/api/v1/user",userRouter)


export const rootRouter = express.Router()