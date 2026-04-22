import express from "express";
import graph from "./ai/graph.ai.js";
const app = express()

app.get("/",async (req,res)=>{
    const result = await graph.invoke({ problem: "How to reduce carbon emissions in urban areas?" });
    res.json(result);
})

export default app;