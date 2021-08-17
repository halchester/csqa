import axios from "axios";

const endPoint =
  process.env.NODE_ENV === "production"
    ? "https://csqa-api.herokuapp.com/"
    : "http://localhost:8000";

export default axios.create({
  baseURL: endPoint
});
