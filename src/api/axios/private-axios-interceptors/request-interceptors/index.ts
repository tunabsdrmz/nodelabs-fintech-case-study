import { AxiosInstance, InternalAxiosRequestConfig } from "axios";
import { getToken } from "@/utils/local-storage-helper";

export const addAuthHeaderRequestInterceptor = (axiosInstance: AxiosInstance) => {
  axiosInstance.interceptors.request.use(
    (config: InternalAxiosRequestConfig) => {
      const token = getToken();
      if (token) {
        if (config.headers["Authorization"] === undefined) {
          config.headers["Authorization"] = "Bearer " + token.accessToken;
        }
      }

      return config;
    },
    (error) => {
      return Promise.reject(error);
    },
  );
};
