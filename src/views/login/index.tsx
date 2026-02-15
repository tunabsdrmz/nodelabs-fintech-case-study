import FormSection from "./components/FormSection";
import PosterSection from "./components/PosterSection";

export default function LoginPageView() {
  return (
    <main
      role="main"
      aria-label="Sign in"
      className="flex min-h-screen w-full flex-col lg:flex-row">
      {/* Left column: form */}
      <FormSection />

      {/* Right column: poster */}
      <PosterSection />
    </main>
  );
}
