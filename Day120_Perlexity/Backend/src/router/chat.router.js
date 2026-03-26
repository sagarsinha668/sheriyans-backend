import express from "express";
import { sendMessageController } from "../controller/chat.controller.js";
import { authMiddleware } from "../middleware/auth.middleware.js";
const chatRouter = express.Router();

chatRouter.post("/message", authMiddleware, sendMessageController);
export default chatRouter;

