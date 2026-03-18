const express = require("express")
const notesModel = require("./models/notes.model")
const cors = require("cors")
const path = require("path")

const app = express()
app.use(express.json())
app.use(cors())
app.use(express.static("./public"))


app.post("/api/notes",async (req,res)=>{
    const {title,description} = req.body
    const note = await notesModel.create({title,description})
    res.status(201).json({
        message:"note created successfully",
        note
    })
})

app.get('/api/notes',async (req,res)=>{
    const notes = await notesModel.find()

    res.status(200).json({
        message:"Get all notes",
        notes
    })
})

app.delete("/api/notes/:id",async(req,res)=>{
    const id = req.params.id
    await notesModel.findByIdAndDelete(id)
    res.status(200).json({
        message:"note deleted successfully",
        
    })
})
app.patch('/api/notes/:id',async (req,res)=>{
    const id = req.params.id
    const description = req.body.description
    await notesModel.findByIdAndUpdate(id,{description})
    res.status(200).json({
        message:"note updated"
    })
})

app.get('*name',(req,res)=>{

    res.sendFile(path.join(__dirname,"../public/index.html"))
})


module.exports = app