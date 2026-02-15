import { publicAxiosInstance } from "@/api/axios";
import {
  ILoginRequest,
  ILoginResponse,
  IRegisterRequest,
  IRegisterResponse,
} from "./types";

const baseUrl = "/users";

const register = async (data: IRegisterRequest) => {
  return await publicAxiosInstance.post<IRegisterResponse>(`${baseUrl}/register`, data);
};

const login = async (data: ILoginRequest) => {
  return await publicAxiosInstance.post<ILoginResponse>(`${baseUrl}/login`, data);
};

export const AuthPublicService = {
  register,
  login,
};
