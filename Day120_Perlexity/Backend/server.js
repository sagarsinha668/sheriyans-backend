import dns from "node:dns";
dns.setDefaultResultOrder("ipv4first");
dns.setServers(["8.8.8.8", "8.8.4.4"]);

import "dotenv/config";
import app from "./src/app.js";
import connectDB from "./src/config/database.js";
import { createServer } from "http";
import { initSocket } from "./src/sockets/server.socket.js";
const PORT = process.env.PORT || 3000;

const httpServer = createServer(app);
initSocket(httpServer);

connectDB();

httpServer.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
