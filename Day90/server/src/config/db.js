const mongoose = require("mongoose")
const connectToDB = ()=>{
    mongoose.connect(process.env.MONGO_URI).then(()=>{
        console.log("MongoDB is Connected")
    })
}

module.exports = connectToDB