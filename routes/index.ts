import express from "express"
const userRouter = require("./user");
const app = express()

app.use("/api/v1/user",userRouter)

export const router = express.Router()