import express from "express"
const rootRouter = require("./routes/index");



const app = express()

app.use("/api/v1", rootRouter)