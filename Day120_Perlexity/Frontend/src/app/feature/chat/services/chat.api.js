import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:3000/api/chat",
  withCredentials: true,
});

export const sendMessage = ({ message, chatId }) => {
  const response = api.post("/message", { message, chatId });
  return response.data;
};

export const getChats = () => {
  const response = api.get("/get-chat");
  return response.data;
};

export const getMessage = ({ chatId }) => {
  const response = api.get(`/get-message/:${chatId}`);
  return response.data;
};

export const deleteChat = ({ chatId }) => {
  const response = api.get(`/delete-chats-messages/:${chatId}`);
  return response.data;
};
