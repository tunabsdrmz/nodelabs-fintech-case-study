import { privateAxiosInstance } from "@/api/axios";
import { IRefreshTokenResponse, IGetUserResponse } from "./types";
import { QueryOptions } from "@/services/types/query-types";
import { AxiosResponse } from "axios";
import { useQuery } from "@tanstack/react-query";

const baseUrl = "/users";

const logout = async () => {
  return await privateAxiosInstance.post(`${baseUrl}/logout`);
};

const refreshToken = async () => {
  return await privateAxiosInstance.post<IRefreshTokenResponse>(
    `${baseUrl}/refresh-token`,
  );
};

const getUser = () => {
  return privateAxiosInstance.get<IGetUserResponse>(`${baseUrl}/profile`);
};

const useGetUser = (options?: QueryOptions<AxiosResponse<IGetUserResponse>>) =>
  useQuery({
    queryKey: ["getUserInfoAsync"],
    queryFn: () => getUser(),
    ...options,
  });

export const AuthPrivateService = {
  logout,
  refreshToken,
  useGetUser,
};
