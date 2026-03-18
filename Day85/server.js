const express = require("express")

const app = express()  // creating server

app.get('/',(req,res)=>{
    res.send("me hu sagar")
})

app.listen(3000)  //start server
