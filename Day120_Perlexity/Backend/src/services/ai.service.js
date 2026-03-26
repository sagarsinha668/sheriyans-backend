import { ChatGoogleGenerativeAI } from "@langchain/google-genai";
import { SystemMessage, HumanMessage ,AIMessage } from "langchain";
import { ChatMistralAI } from "@langchain/mistralai";


const geminiModel = new ChatGoogleGenerativeAI({
  model: "gemini-2.5-flash-lite",
  apiKey: process.env.GEMINI_API_KEY,
});

const mistralModel = new ChatMistralAI({
  model: "mistral-small-latest",
  apiKey: process.env.MISTRAL_API_KEY,
});

export async function generateResponse(messages) {
  const response = await geminiModel.invoke(messages.map(msg=>{
    console.log(msg)
    if(msg.role == "user"){
      return new HumanMessage(msg.content)
    }
    if(msg.role == "ai"){
      return new AIMessage(msg.content)
    }
  }));
  return response.content;
}

export async function generateMessageTitle(messages) {
  const response = await mistralModel.invoke([
    new SystemMessage(
      `You are a helpful assistant that generates message titles. The title should be a 2-4 word or phrase that captures the main idea of the message. The title should be in the same language as the message.`,
    ),
    new HumanMessage(`Generate a title for the following message: ${message}`),
  ]);
  return response.content;
}
