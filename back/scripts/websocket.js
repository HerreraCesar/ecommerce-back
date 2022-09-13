import { io } from "../server.js";
import { messageAsDto } from "../persistence/dtos/messageDTO.js";
import { messagesDao as messages } from "../persistence/index.js";

const getMessages = async () => {
  let chatId = ''
  const data = await messages.getAll();
  const conversation = [];
  data.map(message => {
  if (message.chat === chatId) {
    conversation.push(messageAsDto(message))
  }});
  return data;
};

const addMessage = async (data) => {
  await messages.add(data);
  return getMessages();
};

export const websocket = async (socket) => {
  console.log("Un cliente se ha conectado");
  const data = await getMessages();
  socket.emit("messages", data);

  socket.on("addMessage", async function (message) {
    const messages = await addMessage(message);
    io.sockets.emit("messages", messages);
  });
};
