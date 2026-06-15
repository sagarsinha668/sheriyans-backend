import express from "express"
import helmet from "helmet"

const app = express()
app.use(helmet())

app.get("/", (req, res) => {
    const data= {
        message: "Hello, World!",
    };
    res.json(data);
});

app.listen(3000,() => {
    console.log("Server is running on port 3000");
}   )