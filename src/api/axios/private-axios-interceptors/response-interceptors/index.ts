import {
  AxiosError,
  AxiosInstance,
  AxiosResponse,
  InternalAxiosRequestConfig,
} from "axios";
import { emitApiAvailability } from "@/utils/api-availability";
import {
  AuthConfig,
  getToken,
  removeItem,
  setToken,
} from "@/utils/local-storage-helper";
import { AuthPrivateService } from "@/services/PrivateRequests/auth";

/* ======================================================
  AUTH HEADER REQUEST INTERCEPTOR
====================================================== */

export const addAuthHeaderRequestInterceptor = (axiosInstance: AxiosInstance) => {
  axiosInstance.interceptors.request.use((config) => {
    const token = getToken();

    if (token?.accessToken) {
      config.headers = config.headers || {};
      config.headers["Authorization"] = `Bearer ${token.accessToken}`;
    }

    return config;
  });
};

/* ======================================================
  REFRESH TOKEN RESPONSE INTERCEPTOR
====================================================== */

const AUTH_RETRY_STATUS_CODES = [401] as const;

let refreshPromise: Promise<string> | null = null;
const retriedConfigs = new WeakSet<InternalAxiosRequestConfig>();

const clearAuthSession = () => {
  removeItem(AuthConfig.storageUserDataName);
};

const performTokenRefresh = (): Promise<string> => {
  if (refreshPromise) return refreshPromise;

  refreshPromise = AuthPrivateService.refreshToken()
    .then((res) => {
      const accessToken = res.data.accessToken;
      const token = getToken();

      if (!token) {
        return Promise.reject(new Error("Token not found"));
      }

      setToken({ accessToken, refreshToken: token.refreshToken });

      return accessToken;
    })
    .catch(() => {
      clearAuthSession();
      window.location.href = "/login";
      return Promise.reject(new Error("Token refresh failed"));
    })
    .finally(() => {
      refreshPromise = null;
    });

  return refreshPromise;
};

export const refreshTokenResponseInterceptor = (axiosInstance: AxiosInstance) => {
  axiosInstance.interceptors.response.use(
    (response) => response,
    async (error: AxiosError) => {
      const config = error.config as InternalAxiosRequestConfig | undefined;
      const status = error.response?.status;

      if (!config) return Promise.reject(error);

      const isRefreshEndpoint =
        typeof config.url === "string" && config.url.includes("refresh-token");

      const shouldRetry =
        !isRefreshEndpoint &&
        !retriedConfigs.has(config) &&
        status !== undefined &&
        AUTH_RETRY_STATUS_CODES.includes(
          status as (typeof AUTH_RETRY_STATUS_CODES)[number],
        );

      if (!shouldRetry) {
        return Promise.reject(error);
      }

      retriedConfigs.add(config);

      try {
        const newAccessToken = await performTokenRefresh();

        config.headers = config.headers || {};
        config.headers["Authorization"] = `Bearer ${newAccessToken}`;

        return axiosInstance.request(config);
      } catch {
        return Promise.reject(error);
      }
    },
  );
};

/* ======================================================
   ERROR HANDLING RESPONSE INTERCEPTOR
====================================================== */

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
      if (isNetworkError(error)) {
        emitApiAvailability(false);
        return Promise.reject(error);
      }

      emitApiAvailability(true);

      if (isTooManyRequestsError(error)) {
        window.location.href = "/429";
      } else if (isServerError(error)) {
        window.location.href = "/500";
      }

      return Promise.reject(error);
    },
  );
};
