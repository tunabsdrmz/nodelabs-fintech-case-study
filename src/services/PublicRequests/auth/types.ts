import { BaseApiResponse } from "@/services/types";

export interface IRegisterRequest {
  fullName: string;
  email: string;
  password: string;
}

export type IRegisterResponse = BaseApiResponse<{
  id: string;
  fullName: string;
  email: string;
}>;

export interface ILoginRequest {
  email: string;
  password: string;
}

export type ILoginResponse = BaseApiResponse<{
  user: {
    id: string;
    fullName: string;
    email: string;
    role: string;
    isActive: boolean;
    lastLoginAt: string;
    lastLoginIP: string;
    createdAt: string;
    updatedAt: string;
  };
  accessToken: string;
}>;
