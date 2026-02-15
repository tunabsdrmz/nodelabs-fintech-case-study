import Image from "next/image";
import Link from "next/link";

interface LogoProps {
  href?: string;
  className?: string;
  imageClassName?: string;
  "aria-label"?: string;
  height?: number;
  width?: number;
}

export function Logo({
  href = "/",
  className,
  imageClassName,
  height = 32,
  width = 120,
  "aria-label": ariaLabel = "Fintech - Home",
}: LogoProps) {
  const img = (
    <>
      <Image
        src="/images/svg/fintech.svg"
        alt="Fintech"
        width={width}
        height={height}
        className={imageClassName}
        priority
      />
    </>
  );

  if (href) {
    return (
      <Link
        href={href}
        className={className}
        aria-label={ariaLabel}>
        {img}
      </Link>
    );
  }

  return (
    <span
      className={className}
      aria-label={ariaLabel}>
      {img}
    </span>
  );
}
