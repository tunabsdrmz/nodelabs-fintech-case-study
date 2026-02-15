"use client";
import ErrorPageView from "@/views/error";
import { NextPage } from "next";

interface ErrorProps {
  reset: () => void;
}

const ErrorPage: NextPage<ErrorProps> = ({ reset }) => {
  return <ErrorPageView reset={reset} />;
};

export default ErrorPage;
