import express from "express";
import authRouter from "./router/auth.router.js";
import chatRouter from "./router/chat.router.js";
import cookieParser from "cookie-parser";
// import morgan from "morgan"
import cors from "cors"

const app = express();

// Middleware
app.use(express.json());
app.use(cookieParser())
app.use(cors({
  credentials:true,
  origin:"http://localhost:5173"
}))
// app.use(morgan("dev"))
app.use(express.urlencoded({ extended: true }));

// Routes
app.use("/api/auth", authRouter);
app.use("/api/chat", chatRouter);


app.get("/", (req, res) => {
  res.send("Hello, World!");
});

export default app;
