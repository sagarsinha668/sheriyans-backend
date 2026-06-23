import express from "express"
import cors from "cors"
const app = express()
app.use(cors())
app.use(express.static("public"))

app.get("*name", (req, res) => {
res.sendFile("index.html")
})
app.get("/api/test",(req,res)=>{
    const employee=[
       {
        id: 1,
        name: "John Doe",
        position: "Software Engineer",
        department: "IT"
       },
       {
        id: 2,
        name: "Jane Smith",
        position: "Product Manager",
        department: "Marketing"
       }
    ]
    res.status(200).json(employee)
})

export default app