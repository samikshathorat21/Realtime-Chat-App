import axios from "axios";
export const baseURL = "https://realtime-chat-app-2-zszw.onrender.com";
export const httpClient = axios.create({
  baseURL: baseURL,
});
