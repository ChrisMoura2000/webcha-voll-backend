const { getSomeMessages } = require('../models/messages');

const messageService = async () => {
    const lastMessages = await getSomeMessages()
    const removeIds = lastMessages.map((msg) => {
        delete msg._id
        return msg
    })
    
    return lastMessages;
}

module.exports = { messageService }