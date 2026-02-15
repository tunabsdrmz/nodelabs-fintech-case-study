import UserLayout from "@/layout/UserLayout";
import DashboardPageView from "@/views/dashboard";
import type { Metadata } from "next";
import { NextPage } from "next";

export const metadata: Metadata = {
  title: "Fintech - Dashboard",
};

const DashboardPage: NextPage = () => {
  return (
    <UserLayout>
      <DashboardPageView />
    </UserLayout>
  );
};

export default DashboardPage;
