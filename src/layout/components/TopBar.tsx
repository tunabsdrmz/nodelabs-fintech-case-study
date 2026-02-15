"use client";

import { MenuIcon, NotificationIcon, SearchIcon } from "@/assets/icons";
import UserProfileDropDown from "./UserProfileDropDown";

interface TopBarProps {
  onMenuClick?: () => void;
  isMenuOpen?: boolean;
  title?: string;
  hasScrolled?: boolean;
}

function TopBar({
  onMenuClick,
  isMenuOpen = false,
  title = "Dashboard",
  hasScrolled = false,
}: TopBarProps) {
  return (
    <header
      className={`sticky top-0 z-30 w-full bg-white pt-7 pb-2 transition-shadow duration-200 ${hasScrolled ? "shadow-[0_4px_10px_-5px_rgba(0,0,0,0.05)]" : ""}`}>
      <div className="flex w-full h-12 flex-row justify-between items-center">
        <div className="flex flex-row items-center gap-2 md:gap-4">
          {onMenuClick && (
            <button
              type="button"
              onClick={onMenuClick}
              aria-label="Open navigation menu"
              aria-expanded={isMenuOpen}
              aria-controls="mobile-nav-dialog"
              className="cursor-pointer lg:hidden rounded-lg p-2 text-text2Color transition-colors hover:bg-gray2Background hover:text-text1Color focus:outline-none focus:ring-2 focus:ring-primaryColor focus:ring-offset-2">
              <MenuIcon
                className="md:w-8 md:h-8 w-6 h-6"
                aria-hidden
              />
            </button>
          )}

          <h1 className="font-semibold text-xl md:text-2xl text-text1Color">{title}</h1>
        </div>

        <div
          className="flex flex-row items-center gap-2 md:gap-11"
          role="group"
          aria-label="Actions">
          <button
            type="button"
            aria-label="Search"
            className="shrink-0 rounded-lg p-2 text-text2Color transition-colors hover:bg-gray2Background hover:text-text1Color focus:outline-none focus:ring-2 focus:ring-primaryColor focus:ring-offset-2">
            <SearchIcon
              className="w-6 h-6"
              aria-hidden
            />
          </button>

          <button
            type="button"
            aria-label="Notifications"
            className="shrink-0 rounded-lg p-2 text-text2Color transition-colors hover:bg-gray2Background hover:text-text1Color focus:outline-none focus:ring-2 focus:ring-primaryColor focus:ring-offset-2">
            <NotificationIcon
              className="w-6 h-6"
              aria-hidden
            />
          </button>

          <UserProfileDropDown />
        </div>
      </div>
    </header>
  );
}

export default TopBar;
