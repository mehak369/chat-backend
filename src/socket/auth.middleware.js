const jwt = require("jsonwebtoken");

const socketAuth = (socket, next) => {
  try {
    const token = socket.handshake.auth.token;

    if (!token) return next(new Error("No token"));

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    socket.userId = decoded.userId;

    next();
  } catch (err) {
    next(new Error("Authentication failed"));
  }
};

module.exports = socketAuth;
