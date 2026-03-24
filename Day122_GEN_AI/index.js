import "dotenv/config";
import { ChatMistralAI } from "@langchain/mistralai";
import { HumanMessage,tool,createAgent} from "langchain";
import readline from "readline/promises";
import {sendMail} from "../mail.service.js"
import * as z from "zod"

const emailTool = tool(
    sendMail,
    {
        name:"emailTool",
        description:"This tool send mails",
        schema:z.object({
            to: z.string().describe("the receiver of mail"),
            html:z.string().describe("The container of mail."),
            subject: z.string().describe("This is mail subject")
        })
    }
)

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const model = new ChatMistralAI({
  model: "mistral-small-latest",
});

const agent = createAgent({
    model,
    tools:[emailTool]
})
const messages = [];
while (true) {
  const question = await rl.question("Enter something:");
  messages.push(new HumanMessage(question));
  const answer = await agent.invoke({messages});
  messages.push(answer.messages[answer.messages.length-1]);
  console.log(answer.messages[answer.messages.length-1].content);
}
