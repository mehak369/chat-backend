# Real-Time One-to-One Chat Backend (Socket.IO)

## Overview

This project is a **backend-only real-time one-to-one chat system** built using **Node.js and Socket.IO**.
It allows two authenticated users to communicate in real time, while also storing messages in a database for persistence and offline access.

The goal of this project is to demonstrate:

* Real-time communication using WebSockets
* Socket authentication
* Online/offline user tracking
* Message persistence in a database
* Clean backend architecture

A **minimal HTML frontend** is included **only for testing and demonstration purposes**, not as a production frontend.

---
 Deployed on render: https://chat-backend-6qc8.onrender.com
---

## Features

* JWT-based socket authentication
* One-to-one real-time messaging
* Online and offline user tracking
* Messages stored in MongoDB
* Messages delivered instantly if the receiver is online
* Messages safely stored if the receiver is offline
* Simple frontend to visually verify real-time behavior

---

## Tech Stack

* Node.js
* Express
* Socket.IO
* MongoDB (Atlas)
* Mongoose
* JSON Web Tokens (JWT)

---

## Project Structure

```
chat-backend/
│
├── src/
│   ├── server.js
│   ├── socket/
│   │   ├── index.js
│   │   ├── auth.middleware.js
│   │   └── chat.handler.js
│   ├── models/
│   │   ├── User.js
│   │   └── Message.js
│   ├── routes/
│   │   └── auth.routes.js
│   ├── config/
│   │   └── db.js
│   └── utils/
│       └── generateToken.js
│
├── client/
│   ├── user1.html
│   └── user2.html
│
├── users.json
├── .env.example
├── package.json
└── README.md
```

---

## Why a Simple Frontend Is Included

This project focuses on **backend functionality**, but real-time systems cannot be properly verified using tools like Postman.

Socket.IO communication:

* Is event-based
* Requires a persistent connection
* Needs a real socket client

Because of this, a **very minimal HTML frontend** is included to:

* Simulate two users
* Visually show real-time message delivery
* Confirm that messages appear instantly on both sides
* Avoid overengineering with React or build tools

The frontend is **only a testing harness**, not part of the production system.

---

## Environment Setup

Create a `.env` file using the following format:

```
PORT=5001
MONGO_URI=your_mongodb_atlas_uri_here
JWT_SECRET=your_secret_key
```

> Note: `.env` is intentionally not committed for security reasons.

---

## Installing Dependencies

From the project root:

```bash
npm install
```

---

## Running the Server

```bash
npm run dev
```

You should see logs like:

```
MongoDB connected
Server running on port 5001
```

---

## Sample Users

A `users.json` file is included with dummy users for testing.

You can import this file into MongoDB Compass to quickly create users for testing.

This file contains **sample data only**, no real credentials.

---

## Authentication Flow

1. A user logs in using a REST API
2. The server returns a JWT token
3. The token is passed during socket connection
4. The socket connection is authenticated before being accepted

This ensures only valid users can connect and send messages.

---

## Socket Events

### Client → Server

* `send_message`

  * Payload includes receiverId and message

### Server → Client

* `receive_message`

  * Sent to both sender and receiver
* `user_online`
* `user_offline`

---

## Testing Real-Time Communication

### Step 1: Start the backend

```bash
npm run dev
```

### Step 2: Open the test clients

From the project root:

```bash
start client\user1.html
start client\user2.html
```

(or open them manually in the browser)

### Step 3: Paste valid JWT tokens

Each HTML file contains a placeholder for a JWT token.
Replace it with a real token obtained from the login API.

### Step 4: Send messages

* Messages appear instantly on both screens
* Messages are stored in MongoDB
* Sent and received messages are clearly labeled

---

## How Online / Offline Handling Works

* When a user connects, their socket ID is stored in memory
* When a user disconnects, they are removed from the online map
* If a receiver is online, the message is delivered instantly
* If the receiver is offline, the message is saved in the database

This ensures reliability and no message loss.

---

## Design Decisions

* Socket authentication is done at connection time for security
* In-memory storage is used for online users for speed
* MongoDB is used for persistence and flexibility
* REST APIs are used only where appropriate (authentication)
* Real-time communication is handled only through sockets

---

## Conclusion

This project demonstrates a complete and clean implementation of a real-time one-to-one chat backend using Socket.IO.
It focuses on correctness, clarity, and real-world backend practices while keeping the frontend intentionally simple for testing purposes.

