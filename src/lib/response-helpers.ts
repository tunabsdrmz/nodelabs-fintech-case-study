import type { AxiosResponse } from "axios";
import type { BaseApiResponse } from "@/services/types";

/**
 * Extracts the inner `data` payload from an API response.
 * Our API wraps responses as { success, message, data: T }; Axios puts that in response.data.
 */
export function getResponseData<T>(
  response: AxiosResponse<BaseApiResponse<T>> | undefined,
): T | undefined {
  return response?.data?.data;
}
