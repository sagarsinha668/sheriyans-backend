const app = require("./src/app") // importing app from src/app.js
const PORT = 3000 // defining port number


app.listen(PORT, () => {
    console.log(`Server is running on port http://localhost:${PORT}`) // logging message when server starts
})