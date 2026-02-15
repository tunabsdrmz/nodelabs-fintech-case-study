import { emitApiAvailability } from "@/utils/api-availability";
import { AxiosError, AxiosInstance, AxiosResponse } from "axios";

const isNetworkError = (error: AxiosError) => {
  return (
    error.message === "Network Error" ||
    error.code === "ECONNABORTED" ||
    error.code === "ERR_NETWORK"
  );
};

const isServerError = (error: AxiosError) => {
  const status = error.response?.status;
  return typeof status === "number" && status >= 500;
};

const isTooManyRequestsError = (error: AxiosError) => {
  return error.response?.status === 429;
};

export const addErrorHandlingResponseInterceptor = (axiosInstance: AxiosInstance) => {
  axiosInstance.interceptors.response.use(
    (response: AxiosResponse) => {
      emitApiAvailability(true);
      return response;
    },
    (error: AxiosError) => {
      const isNetworkFailure = isNetworkError(error);

      if (!isNetworkFailure) {
        emitApiAvailability(true);
      }

      if (isNetworkFailure) {
        emitApiAvailability(false);
      } else if (isTooManyRequestsError(error) && window.location.pathname !== "/429") {
        window.location.href = "/429";
      } else if (isServerError(error) && window.location.pathname !== "/500") {
        window.location.href = "/500";
      }

      return Promise.reject(error);
    },
  );
};
