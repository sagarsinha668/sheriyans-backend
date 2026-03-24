import { ChatGoogleGenerativeAI } from "@langchain/google-genai";

const model = new ChatGoogleGenerativeAI({
  model: "gemini-2.5-flash-lite",
  apiKey: process.env.GEMINI_API_KEY
});

export async function testAi() {
    model.invoke("latest internet update you have last").then((res)=>{
        console.log(res.text)
    })
}