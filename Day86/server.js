const express = require("express")
const { esbuildVersion } = require("vite")


const app = express()
app.use(express.json())

const notes = []

app.post('/', (req, res) => {
    res.send("hello sagar")
    let body = req.body
    notes.push(body)
    console.log(notes)
})

app.get('/',(req,res)=>{
    res.send(notes)
})


app.listen(3000)