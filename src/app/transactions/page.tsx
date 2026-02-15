import UserLayout from "@/layout/UserLayout";
import TransactionsPageView from "@/views/transactions";
import { Metadata, NextPage } from "next";

export const metadata: Metadata = {
  title: "Fintech - Transactions",
};
const TransactionsPage: NextPage = () => {
  return (
    <UserLayout>
      <TransactionsPageView />
    </UserLayout>
  );
};

export default TransactionsPage;
