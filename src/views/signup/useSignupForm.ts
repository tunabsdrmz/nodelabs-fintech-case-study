"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { AuthPublicService } from "@/services/PublicRequests/auth";
import { useAuth } from "@/context/AuthContext";
import { signupFormSchema, SignupFormValues } from "./schema";

export function useSignupForm() {
  const router = useRouter();
  const { signup: authSignup } = useAuth();

  const form = useForm<SignupFormValues>({
    resolver: zodResolver(signupFormSchema),
    defaultValues: { fullName: "", email: "", password: "" },
    mode: "onChange",
  });

  const { formState } = form;
  const hasErrors = Object.keys(formState.errors).length > 0;

  const signupMutation = useMutation({
    mutationFn: (data: SignupFormValues) =>
      AuthPublicService.register({
        fullName: data.fullName,
        email: data.email,
        password: data.password,
      }),
    onSuccess: (response) => {
      const data = response.data?.data;
      if (!data?.id) {
        toast.error("Signup response invalid. 🤔");
        return;
      }
      toast.success("Signed up successfully. 🎉");
      authSignup({
        id: data.id,
        fullName: data.fullName,
        email: data.email,
      });
      router.replace("/login");
    },
    onError: (error: {
      response?: { data?: { message?: string } };
      message?: string;
    }) => {
      const message =
        error?.response?.data?.message ??
        error?.message ??
        "Sign up failed. Please try again.";
      toast.error(message);
    },
  });

  const onSubmit = (values: SignupFormValues) => {
    signupMutation.mutate(values);
  };

  return {
    form,
    register: form.register,
    handleSubmit: form.handleSubmit,
    errors: formState.errors,
    hasErrors,
    isPending: signupMutation.isPending,
    onSubmit,
  };
}
