import express from "express"
import handleError from "./middleware/error.middleware.js"
import authRouter from "./router/auth.router.js"

const app = express()

app.use(express.json())


app.use("/api/auth",authRouter)





app.use(handleError)
export default app