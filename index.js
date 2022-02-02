require("dotenv").config();
const socketIO = require("socket.io");
const express = require("express");
const cors = require("cors");
const { webChat } = require("./src/socket/webChat");
const { messageController } = require("./src/controller/messagesController");
const { handleError } = require("./src/middlware/handleError");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());

app.get("/", messageController);

app.use(handleError);

const server = app.listen(PORT, () =>
  console.log(`conectado na porta ${PORT}`)
);

const io = socketIO(server, {
  cors: {
    origin: "*",
    method: ["GET", "POST"],
  },
});

webChat(io);
