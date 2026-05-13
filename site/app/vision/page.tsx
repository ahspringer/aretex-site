import Nav from "@/components/sections/Nav";
import Footer from "@/components/sections/Footer";
import VisionHero from "@/components/sections/VisionHero";

export const metadata = {
  title: "Aretex Labs | Vision",
  description:
    "Aretex Labs exists to build systems that elevate the human, not replace them. We believe every person carries elite potential.",
};

export default function VisionPage() {
  return (
    <>
      <Nav />
      <main>
        <VisionHero />
      </main>
      <Footer />
    </>
  );
}
