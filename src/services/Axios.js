import axios from "axios";
import { API_URL } from "./variables";

const Axios = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
    Accept: "*/*",
  },
  //   withCredentials: true,
});

Axios.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("access_token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

Axios.interceptors.response.use(
  (res) => Promise.resolve(res?.data),
  (err) => {
    return Promise.reject(err);
  }
);

export default Axios;
