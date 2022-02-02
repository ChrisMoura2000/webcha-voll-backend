const { messageService } = require('../service/messageService');

const messageController = async (_req, res, next) => {
    try {
        const messages = await messageService();
        return res.status(200).json({ messages })
    } catch (error) {
        return next(error)
    }
}

module.exports = { messageController }