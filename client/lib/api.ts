import axios from "axios";

const endPoint = "http://localhost:8000";

export default axios.create({
  baseURL: endPoint
});
