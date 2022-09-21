import { messageAsDto } from "../persistence/dtos/messageDTO.js";
import { messagesDao as messages } from "../persistence/index.js";

const getMessages = async (user) => {
  let chatId = user.chat;
  const data = await messages.getAll();
  const conversation = [];
  data.map((message) => {
    if (message.chat === chatId) {
      conversation.push(messageAsDto(message));
    }
  });
  return conversation;
};

const addMessage = async (message) => {
  return await messages.add(message);
};

export const websocket = async (socket) => {
  console.log("Un cliente se ha conectado");

  socket.on("user", async (user) => {
    const data = await getMessages(user);
    socket.emit("messages", data);
  });

  socket.on("addMessage", async (user, message) => {
    const addedMessage = await addMessage(message);
    const data = await getMessages(user);
    socket.emit("messages", data);
  });
};
