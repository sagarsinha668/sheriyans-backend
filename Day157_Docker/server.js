// docker common commands lines.
// docker build -t docker-test .
// docker run -p 3000:3000 docker-test
import express from "express"

const app = express()

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