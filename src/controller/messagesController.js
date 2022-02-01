const { messageService } = require('../service/messageService');

const messageController = async (_req, res, _next) => {
    const messages = await messageService();
    return res.status(200).json({ messages })
}

module.exports = { messageController }