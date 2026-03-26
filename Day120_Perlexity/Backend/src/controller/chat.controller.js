import {
  generateResponse,
  generateMessageTitle,
} from "../services/ai.service.js";
import chatModel from "../models/chat.model.js";
import messageModel from "../models/message.model.js";

export async function sendMessageController(req, res) {
  const { message, chat: chatId } = req.body;
  let title = null,
    chat = null;

  if (!chatId) {
    title = await generateMessageTitle(message);
    chat = await chatModel.create({
      user: req.user.userId,
      title: title,
    });
  }
  const userMessage = await messageModel.create({
    chat: chat._id,
    content: message,
    role: "user",
  });

  const messages = await messageModel.find({ chat: chatId });
  console.log(messages)

  const response = await generateResponse(message);

  const aiMessage = await messageModel.create({
    chat: chatId || chat._id,
    content: response,
    role: "ai",
  });

  res.status(200).json({
    chat: chat,
    title: title,
    message: message,
    AI_message: response,
  });
}
