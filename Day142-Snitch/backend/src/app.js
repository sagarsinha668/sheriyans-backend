import express from "express"
import morgan from "morgan"
import cookiesParser from "cookie-parser"

const app = express()

app.use(morgan("dev"))
app.use(express.json())
app.use(cookiesParser())
app.use(express.urlencoded({ extended: true }))
export default app