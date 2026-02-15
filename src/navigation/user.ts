import {
  DashboardIcon,
  InvoicesIcon,
  MyWalletsIcon,
  TransactionsIcon,
  SettingsIcon,
  HelpIcon,
  LogoutIcon,
} from "@/assets/icons";
import { VerticalNavItemsType } from "@/layout/types";

const userNavigation = (): VerticalNavItemsType => [
  {
    title: "Dashboard",
    icon: DashboardIcon,
    path: "/",
  },
  {
    title: "Transactions",
    icon: TransactionsIcon,
    path: "/transactions",
  },
  {
    title: "Invoices",
    icon: InvoicesIcon,
    path: "/invoices",
  },
  {
    title: "My Wallets",
    icon: MyWalletsIcon,
    path: "/my-wallets",
  },

  {
    title: "Settings",
    icon: SettingsIcon,
    path: "/settings",
  },

  {
    title: "Help",
    icon: HelpIcon,
    path: "/help",
  },
  {
    title: "Logout",
    icon: LogoutIcon,
    path: "/login",
  },
];

export default userNavigation;
