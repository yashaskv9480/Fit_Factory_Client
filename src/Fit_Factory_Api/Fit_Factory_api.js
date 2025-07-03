import axios from "axios";

console.log("Backend Url", process.env.REACT_APP_BACKED_API)

export default axios.create({
  baseURL: process.env.REACT_APP_BACKED_API,
});
