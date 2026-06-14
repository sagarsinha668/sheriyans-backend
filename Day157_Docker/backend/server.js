// docker common commands lines.
// docker build -t docker-test .
// docker run -p 3000:3000 docker-test
// docker ps 
// docker stop <container_id> to stop the container
// docker rm <container_id> to remove the container
// docker compose up -d to start the container in detached mode

import express from "express"
import app from "./src/app.js"

app.get("/", (req, res) => {
    res.send("Docker Testing")
})
app.get("/docker",(req,res)=>{
    const data={
        message: "Docker API Endpoint",
        timestamp: new Date()
    }
    res.send(data)
})
app.listen(3000, () => {
    console.log("Server is running on port 3000")
})