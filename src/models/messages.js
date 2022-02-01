const connection = require("./connection");

const saveMessage = async (message, nickname, time) => {
  const messagesCollection = await connection().then((db) =>
    db.collection("messages")
  );

  const responseDB = await messagesCollection.insertOne({
    message,
    nickname,
    time,
  });
};

const getSomeMessages = async () => {
  const messagesCollection = await connection().then((db) =>
    db.collection("messages")
  );

  const response = await messagesCollection.find().limit(30).toArray();
  return response;
};

module.exports = {
  saveMessage,
  getSomeMessages,
};
