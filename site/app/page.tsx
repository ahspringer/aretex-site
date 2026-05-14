import Nav from "@/components/sections/Nav";
import Footer from "@/components/sections/Footer";
import HomeHero from "@/components/sections/HomeHero";

export default function Home() {
  return (
    <>
      <Nav />
      <main className="site-main">
        <HomeHero />
      </main>
      <Footer />
    </>
  );
}
