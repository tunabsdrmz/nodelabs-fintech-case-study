import RecentTransactions from "./components/RecentTransactions";
import ScheduledTransfers from "./components/ScheduledTransfers";
import WorkingCapital from "./components/WorkingCapital";
import SummaryCards from "./components/SummaryCards";
import WalletsCard from "./components/WalletsCard";

export default function DashboardPageView() {
  return (
    <div
      role="region"
      aria-label="Dashboard"
      className="grid grid-cols-1 gap-4 xl:grid-cols-9 xl:gap-6 pb-6">
      <section
        className="flex flex-col gap-4 xl:col-span-6 3xl:col-span-7 xl:gap-6"
        aria-label="Main content - Summary cards, working capital and recent transactions">
        <SummaryCards />
        <WorkingCapital />
        <RecentTransactions />
      </section>

      <aside
        className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:col-span-3 3xl:col-span-2 xl:flex xl:flex-col"
        aria-label="Related information - Wallet and scheduled transfers">
        <WalletsCard />
        <ScheduledTransfers />
      </aside>
    </div>
  );
}
