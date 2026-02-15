import { AxiosResponse } from "axios";

export type APIResponse<T = unknown> = Promise<AxiosResponse<T>>;

export interface BaseApiResponse<T> {
  success: boolean;
  message: string;
  data: T;
}
