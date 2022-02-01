require('dotenv').config();
const { webChat } = require('./src/socket/webChat')
const express = require("express");
const cors = require("cors");
const socketIO = require("socket.io");
const { messageController } = require('./src/controller/messagesController')

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());

app.get('/', messageController)

const server = app.listen(PORT, () => console.log(`conectado na porta ${PORT}`));

const io = socketIO(server, {
    cors: {
        origin: '*',
        method: ['GET', 'POST'],
    }
});

webChat(io)
