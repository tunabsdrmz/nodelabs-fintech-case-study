import { getInitials } from "@/utils/get-initials";
import Image from "next/image";

type Props = {
  name: string;
  image: string;
};

export default function CustomAvatar({ name, image }: Props) {
  const initials = getInitials(name ?? "User") || "U";
  return (
    <span className="relative flex w-9 h-9 shrink-0 items-center justify-center rounded-full bg-primaryColor/30 text-text1Color text-sm font-semibold">
      {initials}
      <Image
        src={image}
        alt={`${name} profile`}
        className="absolute inset-0 rounded-full object-cover"
        width={36}
        height={36}
        onError={(e) => {
          e.currentTarget.style.display = "none";
        }}
      />
    </span>
  );
}
