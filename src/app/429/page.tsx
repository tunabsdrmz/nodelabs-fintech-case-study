"use client";
import BlankLayout from "@/layout/BlankLayout";
import TooManyRequestsPageView from "@/views/429";
import { NextPage } from "next";

const TooManyRequestsPage: NextPage = () => {
  return (
    <BlankLayout>
      <TooManyRequestsPageView />
    </BlankLayout>
  );
};

export default TooManyRequestsPage;
