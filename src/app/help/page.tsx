import UserLayout from "@/layout/UserLayout";
import HelpPageView from "@/views/help";
import { NextPage, Metadata } from "next";

export const metadata: Metadata = {
  title: "Fintech - Help",
};

const HelpPage: NextPage = () => {
  return (
    <UserLayout>
      <HelpPageView />
    </UserLayout>
  );
};

export default HelpPage;
