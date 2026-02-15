"use client";

import userNavigation from "@/navigation/user";
import { useAuth } from "@/context/AuthContext";
import NavigationItem from "./NavigationItem";

function NavigationBar() {
  const { logout } = useAuth();
  const navItems = userNavigation();
  const mainItems = navItems.filter(
    (item) => "title" in item && !["Help", "Logout"].includes(item.title),
  );
  const bottomItems = navItems.filter(
    (item) => "title" in item && ["Help", "Logout"].includes(item.title),
  );

  return (
    <nav
      aria-label="User menu"
      className="mt-10 flex flex-1 flex-col px-6">
      <ul
        aria-label="Main menu"
        className="flex flex-col gap-y-2 list-none"
        role="list">
        {mainItems.map((item) =>
          "path" in item && "icon" in item && item.icon ? (
            <li key={item.title}>
              <NavigationItem
                title={item.title}
                path={item.path ?? "/"}
                Icon={item.icon as React.ComponentType<React.SVGProps<SVGSVGElement>>}
              />
            </li>
          ) : null,
        )}
      </ul>

      <ul
        aria-label="Secondary menu"
        className="mt-auto flex flex-col gap-y-2 list-none"
        role="list">
        {bottomItems.map((item) =>
          "path" in item && "icon" in item && item.icon ? (
            <li key={item.title}>
              <NavigationItem
                title={item.title}
                path={item.path ?? "/"}
                Icon={item.icon as React.ComponentType<React.SVGProps<SVGSVGElement>>}
                onClick={item.title === "Logout" ? logout : undefined}
              />
            </li>
          ) : null,
        )}
      </ul>
    </nav>
  );
}

export default NavigationBar;
