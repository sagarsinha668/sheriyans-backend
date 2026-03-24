import dns from "node:dns";
dns.setDefaultResultOrder("ipv4first");
dns.setServers(["8.8.8.8", "8.8.4.4"]);

import "dotenv/config";
import app from "./src/app.js";
import connectDB from "./src/config/database.js";
import {testAi} from "./src/services/ai.service.js"
const PORT = process.env.PORT || 3000;

connectDB();
testAi()
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
