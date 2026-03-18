const dns = require('node:dns');
dns.setDefaultResultOrder('ipv4first');
dns.setServers(['8.8.8.8', '8.8.4.4']);
require("dotenv").config() 
const app = require("./src/app") 
const connectDB = require("./src/config/database") 

const PORT = 3000 

connectDB() // Establishing a connection to the database
app.listen(PORT, () => {
    console.log(`Server is running on port http://localhost:${PORT}`) // Logging a message when the server starts successfully
})