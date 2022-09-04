import axios from "axios";
import config from "./shared/config";

export const axiosPrivate = axios.create({
  baseURL: config.apiBaseURL,
  headers: {
    Accept: "application/json",
    "Content-type": "application/json",
  },
});

axiosPrivate.interceptors.request.use(
  (request) => {
    request.headers.Authorization = `Bearer ${localStorage.getItem("token")}`;
    return request;
  },
  (error) => {
    return Promise.reject(error);
  }
);

axiosPrivate.interceptors.response.use((response) => response.data);

export default axiosPrivate;
