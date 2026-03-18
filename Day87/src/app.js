const express = require('express'); // Import the Express library
const app = express(); // Create an instance of the Express application
app.use(express.json());// Middleware to parse JSON bodies

const notes = []; // Array to store notes

app.get("/",(req,res)=>{
    res.send("Hello World") // sending response when root route is accessed
})

app.post("/notes",(req,res)=>{
    notes.push(req.body); // Add the note from the request body to the notes array

    res.send("notes created")
})

app.get("/notes",(req,res)=>{
    res.send(notes)
    console.log(notes)
})

app.delete("/notes/:index",(req,res)=>{
    const index = req.params.index;
   delete notes [ index]
   res.send(notes)
})
app.patch("/notes/:index",(req,res)=>{
    const index = req.params.index
    notes[index].discription = req.body.discription
    res.send(notes)
})

module.exports = app; // Export the app for use in other files (e.g., server.js)