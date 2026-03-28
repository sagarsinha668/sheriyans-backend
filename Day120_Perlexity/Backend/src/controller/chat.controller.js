import {
  generateResponse,
  generateMessageTitle,
} from "../services/ai.service.js";
import chatModel from "../models/chat.model.js";
import messageModel from "../models/message.model.js";

export async function sendMessageController(req, res) {
  try {
    const { message, chat: chatId } = req.body;
    let currentChatId = chatId;
    let title = null;

    if (!currentChatId) {
      title = await generateMessageTitle(message);
      const newChat = await chatModel.create({
        user: req.user.userId,
        title: title,
      });
      currentChatId = newChat._id;
    }

    // Save the NEW user message first
    await messageModel.create({
      chat: currentChatId,
      content: message,
      role: "user",
    });

    // CRITICAL: Fetch ALL messages for this chat in chronological order
    const history = await messageModel.find({ chat: currentChatId });

    // Pass the full history to Gemini
    const responseContent = await generateResponse(history);

    // Save AI Response
    await messageModel.create({
      chat: currentChatId,
      content: responseContent,
      role: "ai",
    });

    res.status(200).json({
      chatId: currentChatId,
      title: title,
      response: responseContent,
    });
  } catch (error) {
    console.error("Controller Error:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}

export async function getChats(req, res) {
  const user = req.user;

  const chats = await chatModel.find({
    user: user.userId,
  });
  res.status(201).json({
    message: "Get All Chats Succesfully",
    chats,
  });
}

export async function getMessages(req, res) {
  const { chatId } = req.params;
  console.log(chatId, req.user.userId);
  const chat = await chatModel.findOne({
    _id: chatId,
    user: req.user.userId,
  });
  if (!chat) {
    return res.status(404).json({
      message: "Chat not found",
    });
  }
  const messages = await messageModel.find({
    chat: chatId,
  });
  res.status(200).json({
    message: "Get all Messages",
    messages,
  });
}

export async function deleteChat(req, res) {
  const { chatId } = req.params;

  console.log(chatId, req.user.userId);
  const chat = await chatModel.findOne({
    _id: chatId,
    user: req.user.userId,
  });
  if (!chat) {
    return res.status(404).json({
      message: "Chat not found",
    });
  }

await messageModel.deleteMany({
  chat:chatId
})
  res.status(201).json({
    message: "all chat and messages deleted",
  });
}
