import axios from "axios";
import {
  addAuthHeaderRequestInterceptor,
  addErrorHandlingResponseInterceptor,
  refreshTokenResponseInterceptor,
} from "./private-axios-interceptors";

const baseURL = process.env.NEXT_PUBLIC_API_BASE_URL + "/" || "/";

export const privateAxiosInstance = axios.create({
  baseURL: baseURL,
  timeout: 15000,
  headers: {
    "Content-type": "application/json",
  },
});

addAuthHeaderRequestInterceptor(privateAxiosInstance);

refreshTokenResponseInterceptor(privateAxiosInstance);
addErrorHandlingResponseInterceptor(privateAxiosInstance);
