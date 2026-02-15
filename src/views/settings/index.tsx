import { SettingsIcon } from "@/assets/icons";
import ComingSoon from "@/layout/ComingSoon";

export default function SettingsPageView() {
  return (
    <ComingSoon
      icon={
        <SettingsIcon className="h-10 w-10 2xl:h-20 2xl:w-20 text-secondaryColor" />
      }
      title="Settings"
    />
  );
}
