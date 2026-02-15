import UserLayout from "@/layout/UserLayout";
import SettingsPageView from "@/views/settings";
import { NextPage, Metadata } from "next";

export const metadata: Metadata = {
  title: "Fintech - Settings",
};
const SettingsPage: NextPage = () => {
  return (
    <UserLayout>
      <SettingsPageView />
    </UserLayout>
  );
};

export default SettingsPage;
