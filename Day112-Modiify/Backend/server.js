const dns = require('node:dns');
dns.setDefaultResultOrder('ipv4first');
dns.setServers(['8.8.8.8', '8.8.4.4']);
require("dotenv").config() 
const app = require("./src/app")
const connectTODB =require("./src/config/database")

connectTODB()

app.listen(3000,()=>{
    console.log("server is running at port 3000")
})