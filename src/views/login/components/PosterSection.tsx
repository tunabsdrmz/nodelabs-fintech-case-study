import Image from "next/image";

export default function PosterSection() {
  return (
    <section
      className="relative hidden min-h-[240px] flex-1 lg:block lg:min-h-screen"
      aria-hidden>
      <div className="absolute inset-0 bg-gray4Background" />
      <Image
        src="/images/png/poster.png"
        alt="Login poster"
        fill
        quality={75}
        className="object-cover object-center"
        priority
        sizes="(max-width: 1020px) 0vw, 50vw"
      />
    </section>
  );
}
