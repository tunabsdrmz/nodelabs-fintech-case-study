"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { AuthPublicService } from "@/services/PublicRequests/auth";
import { useAuth } from "@/context/AuthContext";
import { loginFormSchema, type LoginFormValues } from "@/views/login/schema";

export function useLoginForm() {
  const router = useRouter();
  const { login: authLogin } = useAuth();

  const form = useForm<LoginFormValues>({
    resolver: zodResolver(loginFormSchema),
    defaultValues: { email: "", password: "" },
    mode: "onChange",
  });

  const { formState } = form;
  const hasErrors = Object.keys(formState.errors).length > 0;

  const loginMutation = useMutation({
    mutationFn: (data: LoginFormValues) =>
      AuthPublicService.login({ email: data.email, password: data.password }),
    onSuccess: (response) => {
      const data = response.data?.data;
      if (!data?.accessToken) {
        toast.error("Login response invalid. 🤔");
        return;
      }
      toast.success("Signed in successfully. 🎉");
      authLogin({
        accessToken: data.accessToken,
        refreshToken: (data as { refreshToken?: string }).refreshToken ?? "",
      });
      router.replace("/");
    },
    onError: (error: {
      response?: { data?: { message?: string } };
      message?: string;
    }) => {
      const message =
        error?.response?.data?.message ??
        error?.message ??
        "Sign in failed. Please try again.";
      toast.error(message);
    },
  });

  const onSubmit = (values: LoginFormValues) => {
    loginMutation.mutate(values);
  };

  return {
    form,
    register: form.register,
    handleSubmit: form.handleSubmit,
    errors: formState.errors,
    hasErrors,
    isPending: loginMutation.isPending,
    onSubmit,
  };
}
