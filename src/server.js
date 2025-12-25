require("dotenv").config();
const express = require("express");
const http = require("http");
const { Server } = require("socket.io");
const cors = require("cors");

const connectDB = require("./config/db");
const authRoutes = require("./routes/auth.routes");
const socketInit = require("./socket");

const app = express();
app.use(cors());
app.use(express.json());

app.use("/api/auth", authRoutes);

const server = http.createServer(app);
const io = new Server(server, {
  cors: { origin: "*" }
});

connectDB();
socketInit(io);

server.listen(process.env.PORT, () => {
  console.log(`Server running on port ${process.env.PORT}`);
});
