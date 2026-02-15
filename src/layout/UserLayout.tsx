"use client";

import { useState, useCallback, useEffect, useRef } from "react";
import dynamic from "next/dynamic";

import { Logo } from "@/components";

import userNavigation from "@/navigation/user";
import { usePathname } from "next/navigation";

import NavigationBar from "./components/NavigationBar";
import TopBar from "./components/TopBar";

const MobileNavMenu = dynamic(
  () =>
    import("./components/MobileNavMenu").then((mod) => mod.MobileNavMenu),
  {
    ssr: false,
    loading: () => (
      <div
        className="fixed inset-0 z-50 flex flex-col bg-grayBackground lg:hidden"
        aria-label="Loading navigation menu"
        role="status"
      />
    ),
  },
);

interface UserLayoutProps {
  children: React.ReactNode;
}

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

      {isMobileMenuOpen && (
        <MobileNavMenu
          isOpen={isMobileMenuOpen}
          onClose={closeMenu}
          closeButtonRef={closeButtonRef}
        />
      )}

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
