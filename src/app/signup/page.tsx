import BlankLayout from "@/layout/BlankLayout";
import SignupPageView from "@/views/signup";
import { NextPage, Metadata } from "next";

export const metadata: Metadata = {
  title: "Fintech - Signup",
};
const SignupPage: NextPage = () => {
  return (
    <BlankLayout>
      <SignupPageView />
    </BlankLayout>
  );
};

export default SignupPage;
