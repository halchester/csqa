import axios from "axios";

// const endPoint = "http://localhost:3000";
const endPoint = "https://csqa.vercel.app";

export default axios.create({
  baseURL: endPoint,
});
