const socketAuth = require("./auth.middleware");
const chatHandler = require("./chat.handler");

const socketInit = (io) => {
  io.use(socketAuth);

  io.on("connection", (socket) => {
    console.log("User connected:", socket.userId);
    chatHandler(io, socket);
  });
};

module.exports = socketInit;
