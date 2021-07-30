import axios from "axios";

const endPoint = "http://localhost:3000";

export default axios.create({
  baseURL: endPoint,
});
