"use client";

import { AnimatePresence, motion } from "framer-motion";
import { Logo } from "@/components";
import { CloseIcon } from "@/assets/icons";
import NavigationBar from "./NavigationBar";

const MOBILE_MENU_ANIMATION = {
  initial: { opacity: 0, x: "-100%" },
  animate: { opacity: 1, x: 0 },
  exit: { opacity: 0, x: "-100%" },
  transition: { type: "spring" as const, stiffness: 300, damping: 30 },
};

interface MobileNavMenuProps {
  isOpen: boolean;
  onClose: () => void;
  closeButtonRef: React.RefObject<HTMLButtonElement | null>;
}

export function MobileNavMenu({ isOpen, onClose, closeButtonRef }: MobileNavMenuProps) {
  return (
    <AnimatePresence>
      {isOpen && (
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
                onClick={onClose}
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
              onClick={onClose}
              role="presentation">
              <NavigationBar />
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
