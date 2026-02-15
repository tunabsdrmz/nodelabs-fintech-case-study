import BlankLayout from "@/layout/BlankLayout";
import { NextPage } from "next";
import ServerErrorPageView from "@/views/500";

const ServerErrorPage: NextPage = () => {
  return (
    <BlankLayout>
      <ServerErrorPageView />
    </BlankLayout>
  );
};

export default ServerErrorPage;
