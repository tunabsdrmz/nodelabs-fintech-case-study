"use client";

import { DropdownIcon } from "@/assets/icons";
import { useAuth } from "@/context/AuthContext";
import CustomAvatar from "./CustomAvatar";

function UserProfileDropDown() {
  const { user } = useAuth();

  return (
    <button
      type="button"
      aria-label={`User profile${user?.fullName ? `: ${user.fullName}` : ""}`}
      aria-haspopup="true"
      className="flex flex-row items-center select-none cursor-pointer rounded-full py-1 pl-1 pr-3  transition-colors bg-grayBackground hover:bg-gray3Background focus:outline-none focus:ring-2 focus:ring-primaryColor focus:ring-offset-2">
      <CustomAvatar
        name={user?.fullName ?? "User"}
        image={"/images/png/user-profile.png"}
      />

      <span className="font-semibold ml-3 truncate max-w-[120px] md:max-w-[180px]">
        {user?.fullName ?? "User"}
      </span>

      <DropdownIcon className="w-3 h-3 ml-2 md:ml-7 shrink-0" />
    </button>
  );
}

export { UserProfileDropDown };
export default UserProfileDropDown;
