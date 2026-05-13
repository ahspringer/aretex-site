import Nav from "@/components/sections/Nav";
import Footer from "@/components/sections/Footer";
import ZeroShotContent from "@/components/sections/ZeroShotContent";

export const metadata = {
  title: "ZeroShot — Aretex Labs",
  description: "ZeroShot is in development. Leave your email to be first in line when pre-sales open.",
};

export default function ZeroShotPage() {
  return (
    <>
      <Nav />
      <main>
        <ZeroShotContent />
      </main>
      <Footer />
    </>
  );
}
