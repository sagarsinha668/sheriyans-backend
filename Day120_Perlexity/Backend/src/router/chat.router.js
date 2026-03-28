import express from "express";
import { sendMessageController, getChats,getMessages,deleteChat } from "../controller/chat.controller.js";
import { authMiddleware } from "../middleware/auth.middleware.js";
const chatRouter = express.Router();

chatRouter.post("/message", authMiddleware, sendMessageController);
export default chatRouter;

chatRouter.get("/get-chat",authMiddleware,getChats)
chatRouter.get("/get-message/:chatId",authMiddleware,getMessages)
chatRouter.delete("/delete-chats-messages/:chatId",authMiddleware,deleteChat)