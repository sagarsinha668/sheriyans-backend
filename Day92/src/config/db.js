const mongoose = require("mongoose")

function connectToDB(){
    mongoose.connect(process.env.MONGOOSE_URI).then(()=>{
        console.log("mongodb connected")
    })

}


module.exports = connectToDB