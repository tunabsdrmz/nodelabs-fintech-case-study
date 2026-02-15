"use client";
import React from "react";

import { motion } from "framer-motion";

import { cn } from "@/lib/utils";
import { useRouter, usePathname } from "next/navigation";

interface NavigationItemProps {
  title: string;
  path: string;
  Icon: React.ElementType;
  onClick?: () => void;
}

function NavigationItem(props: NavigationItemProps) {
  const { Icon, title, path, onClick } = props;
  const router = useRouter();
  const pathname = usePathname();
  const active = path === pathname;

  const handleClick = () => {
    if (onClick) {
      onClick();
    } else {
      router.push(path);
    }
  };

  return (
    <button
      aria-label={title}
      className={cn(
        "group relative hover:bg-gray3Background duration-500 ease-in-out flex w-full flex-row items-center gap-3 rounded-lg pl-4 py-3.5 font-medium cursor-pointer transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-primaryColor focus-visible:ring-offset-2",
        active
          ? "text-text1Color font-semibold"
          : "text-text2Color hover:text-text3Color",
      )}
      onClick={handleClick}>
      {active && (
        <motion.div
          layoutId="active-nav-background"
          className="absolute inset-0 rounded-lg bg-primaryColor"
          initial={false}
          transition={{
            type: "spring",
            stiffness: 500,
            damping: 30,
            mass: 0.5,
          }}
        />
      )}

      <span className="relative z-10 flex items-center gap-3 select-none">
        <Icon
          className={cn(
            "w-5 h-5 transition-colors",
            active ? "text-text1Color" : "text-text2Color group-hover:text-text3Color",
          )}
          aria-hidden
        />

        <span>{title}</span>
      </span>
    </button>
  );
}

export default NavigationItem;
