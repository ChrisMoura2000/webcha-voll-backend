const moment = require('moment')
const { saveMessage } = require('../models/messages')

let onlineUsers = [];
const webChat = (io) => {
    io.on('connection', (socket) => {
        console.log('New Connection!', socket.id);
        const newUser = {
            id: socket.id,
            name: socket.id,
        }
        
        onlineUsers.push(newUser)
        io.emit('updateOnlineUsers', onlineUsers)

        socket.on('updateNick', ({newNick, id}) => {
            const response = onlineUsers.filter((user) => socket.id !== user.id)
            onlineUsers = response
            onlineUsers.unshift({ id, name: newNick })
            io.emit('updateOnlineUsers', onlineUsers)
        })

        socket.on('disconnect', () => {
            const newUsersOnline = onlineUsers.filter((user) => socket.id !== user.id)
            onlineUsers = newUsersOnline;
            io.emit('updateOnlineUsers', onlineUsers)
        })

        socket.on('message', ({ message, nickname }) => {
            const time = moment().format('h:mm a')
            saveMessage(message, nickname, time)
            io.emit('message', { message, nickname, time, id: socket.id })
        })

        socket.on('typing', ({id}) => {
            const typinfUser = onlineUsers.find((user) => user.id === id)
            io.emit('typing', {user: typinfUser.name})
        })
    })
}

module.exports = { webChat }