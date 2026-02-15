import BlankLayout from "@/layout/BlankLayout";
import LoginPageView from "@/views/login";
import { NextPage, Metadata } from "next";

export const metadata: Metadata = {
  title: "Fintech - Login",
};

const LoginPage: NextPage = () => {
  return (
    <BlankLayout>
      <LoginPageView />
    </BlankLayout>
  );
};

export default LoginPage;
