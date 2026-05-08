import Nav from "@/components/sections/Nav";
import Hero from "@/components/sections/Hero";
import Problem from "@/components/sections/Problem";
import ProductDetail from "@/components/sections/ProductDetail";
import Technology from "@/components/sections/Technology";
import Team from "@/components/sections/Team";
import Investors from "@/components/sections/Investors";
import Contact from "@/components/sections/Contact";
import Footer from "@/components/sections/Footer";

export default function Home() {
  return (
    <>
      <Nav />
      <main>
        <Hero />
        <Problem />
        <ProductDetail />
        <Technology />
        <Team />
        <Investors />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
