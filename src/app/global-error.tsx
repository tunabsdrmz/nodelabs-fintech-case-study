"use client";
import GlobalErrorPageView from "@/views/global-error";
import { NextPage } from "next";

interface GlobalErrorProps {
  reset: () => void;
}

const GlobalErrorPage: NextPage<GlobalErrorProps> = ({ reset }) => {
  return <GlobalErrorPageView reset={reset} />;
};

export default GlobalErrorPage;
