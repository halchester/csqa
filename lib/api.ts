import axios from "axios";

const dev = process.env.NODE_ENV !== "production";

export const server = dev ? "http://localhost:3000" : "https://csqa.vercel.app";

export default axios.create({
  baseURL: server
});
