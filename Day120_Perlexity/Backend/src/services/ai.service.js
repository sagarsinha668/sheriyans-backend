import { ChatGoogleGenerativeAI } from "@langchain/google-genai";
import { SystemMessage, HumanMessage, AIMessage } from "@langchain/core/messages";
import { ChatMistralAI } from "@langchain/mistralai";

const geminiModel = new ChatGoogleGenerativeAI({
  model: "gemini-2.5-flash-lite", // Ensure this model name is correct for your SDK version
  apiKey: process.env.GEMINI_API_KEY,
});

const mistralModel = new ChatMistralAI({
  model: "mistral-small-latest",
  apiKey: process.env.MISTRAL_API_KEY,
});

export async function generateResponse(messages) {
  // messages should be an array of { role: 'user'|'ai', content: '...' }
  const formattedMessages = messages.map(msg => {
    if (msg.role === "user") return new HumanMessage(msg.content);
    else if (msg.role === "ai") return new AIMessage(msg.content);
  });

  const response = await geminiModel.invoke(formattedMessages);
  return response.content;
}

export async function generateMessageTitle(firstMessage) {
  const response = await mistralModel.invoke([
    new SystemMessage(
      `You are a helpful assistant that generates message titles. The title should be a 2-4 word phrase that captures the main idea. Use the same language as the input.`
    ),
    new HumanMessage(`Generate a title for: ${firstMessage}`),
  ]);
  return response.content;
}


