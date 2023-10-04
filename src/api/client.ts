import axios from "axios";

const client = axios.create({
  baseURL: process.env.EXPO_PUBLIC_API_URL,
});

export default client;
