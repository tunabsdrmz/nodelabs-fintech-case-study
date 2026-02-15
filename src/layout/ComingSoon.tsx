interface Props {
  icon: React.ReactNode;
  title: string;
  description?: string;
}
export default function ComingSoon({ icon, title, description }: Props) {
  return (
    <main
      id="transactions-content"
      className="flex min-h-[calc(100vh-200px)] flex-col items-center justify-center px-4"
      aria-label="Transactions page">
      <section
        className="text-center"
        aria-labelledby="transactions-heading"
        role="status"
        aria-live="polite">
        <div
          className="mb-6 inline-flex h-20 w-20 2xl:h-40  2xl:w-40 items-center justify-center rounded-full bg-primaryColor/20 animate-bounce"
          aria-hidden>
          {icon}
        </div>
        <h1
          id="transactions-heading"
          className="mb-2 text-3xl font-bold text-text1Color 2xl:text-4xl">
          {title}
        </h1>
        <p className="mb-6 text-text2Color text-lg 2xl:text-2xl">
          {description ?? "This feature will be active soon. Stay tuned!"}
        </p>
      </section>
    </main>
  );
}
