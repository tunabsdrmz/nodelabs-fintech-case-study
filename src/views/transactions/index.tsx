import { TransactionsIcon } from "@/assets/icons";
import ComingSoon from "@/layout/ComingSoon";

export default function TransactionsPageView() {
  return (
    <ComingSoon
      icon={
        <TransactionsIcon className="h-10 w-10 2xl:h-20 2xl:w-20 text-secondaryColor" />
      }
      title="Transactions"
    />
  );
}
