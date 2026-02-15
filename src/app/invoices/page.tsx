import UserLayout from "@/layout/UserLayout";
import InvoicesPageView from "@/views/invoices";
import { NextPage, Metadata } from "next";

export const metadata: Metadata = {
  title: "Fintech - Invoices",
};

const InvoicesPage: NextPage = () => {
  return (
    <UserLayout>
      <InvoicesPageView />
    </UserLayout>
  );
};

export default InvoicesPage;
