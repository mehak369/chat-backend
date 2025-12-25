const Message = require("../models/Message");

const onlineUsers = new Map();

const chatHandler = (io, socket) => {
  onlineUsers.set(socket.userId.toString(), socket.id);

  io.emit("user_online", socket.userId);

socket.on("send_message", async ({ receiverId, message }) => {
  const newMessage = await Message.create({
    senderId: socket.userId,
    receiverId,
    message
  });

  const receiverSocketId = onlineUsers.get(receiverId);
  if (receiverSocketId) {
    io.to(receiverSocketId).emit("receive_message", newMessage);
  }

  socket.emit("receive_message", newMessage);
});


  socket.on("disconnect", () => {
    onlineUsers.delete(socket.userId.toString());
    io.emit("user_offline", socket.userId);
  });
};

module.exports = chatHandler;
