import UserLayout from "@/layout/UserLayout";
import MyWalletsPageView from "@/views/my-wallets";
import { NextPage, Metadata } from "next";

export const metadata: Metadata = {
  title: "Fintech - My Wallets",
};
const MyWalletsPage: NextPage = () => {
  return (
    <UserLayout>
      <MyWalletsPageView />
    </UserLayout>
  );
};

export default MyWalletsPage;
