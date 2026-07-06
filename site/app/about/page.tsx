import Nav from "@/components/sections/Nav";
import Footer from "@/components/sections/Footer";
import VisionHero from "@/components/sections/VisionHero";
import Team from "@/components/sections/Team";

export const metadata = {
  title: "Aretex Labs | About",
  description:
    "Vision, operating principles, and company leadership at Aretex Labs.",
};

export default function AboutPage() {
  return (
    <>
      <Nav />
      <main className="site-main">
        <VisionHero />
        {/* <Team /> */}
      </main>
      <Footer />
    </>
  );
}
