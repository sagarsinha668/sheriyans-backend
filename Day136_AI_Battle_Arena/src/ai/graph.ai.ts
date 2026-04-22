import {
  StateGraph,
  START,
  END,
  type GraphNode,
  StateSchema,
} from "@langchain/langgraph";
import { googleChat, mistralChat, cohereChat } from "./model.ai.js";
import z from "zod";

const state = new StateSchema({
  problem: z.string().default(""),
  solution_1: z.string().default(""),
  solution_2: z.string().default(""),
  judge: z.object({
    solution_1_score: z.number().default(0),
    solution_2_score: z.number().default(0),
    solution_1_reasoning: z.string().default(""),
    solution_2_reasoning: z.string().default(""),
  }),
});

const solutionNode: GraphNode<typeof state> = async (state) => {
  const [mistralResponse, googleResponse] = await Promise.all([
    mistralChat.invoke(
      `Given the problem: ${state.problem}, provide a solution.`,
    ),
    cohereChat.invoke(
      `Given the problem: ${state.problem}, provide a solution.`,
    ),
  ]);
  return {
    solution_1: mistralResponse.text,
    solution_2: googleResponse.text,
  };
};

const judgeNode: GraphNode<typeof state> = async (state) => {
  const { problem, solution_1, solution_2 } = state;

  const judgeModel = googleChat.withStructuredOutput(
    z.object({
      solution_1_score: z.number().min(0).max(10),
      solution_2_score: z.number().min(0).max(10),
      solution_1_reasoning: z.string(),
      solution_2_reasoning: z.string(),
    }),
  );

  const result = await judgeModel.invoke(
    `You are a judge evaluating two solutions to a problem.
    Problem: "${problem}"
    Solution 1: "${solution_1}"
    Solution 2: "${solution_2}"
    Please score each solution on a scale of 0 to 10 and provide reasoning for your scores.`,
  );

  return {
    judge: result,
  };
};

const graph = new StateGraph(state)
  .addNode("solution", solutionNode)
  .addNode("judge_node", judgeNode)
  .addEdge(START, "solution")
  .addEdge("solution", "judge_node")
  .addEdge("judge_node", END)
  .compile();

export default graph;
