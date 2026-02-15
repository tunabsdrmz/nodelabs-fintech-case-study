"use client";

import { useState, useCallback, useEffect, useRef } from "react";
import { AnimatePresence, motion } from "framer-motion";

import { Logo } from "@/components";
import { CloseIcon } from "@/assets/icons";

import userNavigation from "@/navigation/user";
import { usePathname } from "next/navigation";

import NavigationBar from "./components/NavigationBar";
import TopBar from "./components/TopBar";

interface UserLayoutProps {
  children: React.ReactNode;
}

const MOBILE_MENU_ANIMATION = {
  initial: { opacity: 0, x: "-100%" },
  animate: { opacity: 1, x: 0 },
  exit: { opacity: 0, x: "-100%" },
  transition: { type: "spring" as const, stiffness: 300, damping: 30 },
};

function UserLayout({ children }: UserLayoutProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [hasScrolled, setHasScrolled] = useState(false);

  const handleContentScroll = useCallback((e: React.UIEvent<HTMLDivElement>) => {
    setHasScrolled((e.target as HTMLDivElement).scrollTop > 0);
  }, []);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const pathname = usePathname();
  const navItems = userNavigation();
  const found = navItems.find((item) => "path" in item && item.path === pathname);
  const title = found && "title" in found ? found.title : "Dashboard";
  const openMenu = useCallback(() => setIsMobileMenuOpen(true), []);
  const closeMenu = useCallback(() => setIsMobileMenuOpen(false), []);
  useEffect(() => {
    if (!isMobileMenuOpen) return;

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") closeMenu();
    };

    document.addEventListener("keydown", handleEscape);
    closeButtonRef.current?.focus();

    return () => document.removeEventListener("keydown", handleEscape);
  }, [isMobileMenuOpen, closeMenu]);

  return (
    <div className="flex h-screen w-full flex-col overflow-hidden bg-ftBackground lg:flex-row">
      <aside
        className="hidden w-64 shrink-0 flex-col overflow-hidden bg-grayBackground pt-7 pb-24 lg:flex lg:h-screen"
        aria-label="Main navigation sidebar">
        <div className="pl-6">
          <Logo
            href="/"
            className="block"
            aria-label="Fintech - Home"
          />
        </div>
        <NavigationBar />
      </aside>

      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            id="mobile-nav-dialog"
            role="dialog"
            aria-modal="true"
            aria-label="Mobile navigation menu"
            initial={MOBILE_MENU_ANIMATION.initial}
            animate={MOBILE_MENU_ANIMATION.animate}
            exit={MOBILE_MENU_ANIMATION.exit}
            transition={MOBILE_MENU_ANIMATION.transition}
            className="fixed inset-0 z-50 flex flex-col bg-grayBackground lg:hidden">
            <div className="flex flex-1 flex-col overflow-y-auto pb-8">
              <header className="flex items-center justify-between px-6 pt-7 pb-4">
                <Logo
                  href="/"
                  className="block"
                  aria-label="Fintech - Home"
                />
                <button
                  ref={closeButtonRef}
                  type="button"
                  onClick={closeMenu}
                  aria-label="Close navigation menu"
                  className="rounded-lg p-2 text-text2Color transition-colors hover:bg-gray2Background hover:text-text1Color focus:outline-none focus:ring-2 focus:ring-primaryColor focus:ring-offset-2">
                  <CloseIcon
                    className="h-8 w-8"
                    aria-hidden
                  />
                </button>
              </header>
              <div
                className="flex flex-1 flex-col"
                onClick={closeMenu}
                role="presentation">
                <NavigationBar />
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <main
        className="flex min-h-0 flex-1 flex-col overflow-hidden px-4 lg:px-10"
        id="main-content"
        tabIndex={-1}>
        <TopBar
          title={title}
          onMenuClick={openMenu}
          isMenuOpen={isMobileMenuOpen}
          hasScrolled={hasScrolled}
        />
        <div
          className="mt-8 min-h-0 flex-1 overflow-y-auto no-scrollbar"
          onScroll={handleContentScroll}>
          {children}
        </div>
      </main>
    </div>
  );
}

export default UserLayout;
