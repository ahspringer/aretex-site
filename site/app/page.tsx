import Nav from "@/components/sections/Nav";
import Hero from "@/components/sections/Hero";
import Problem from "@/components/sections/Problem";
import ProductDetail from "@/components/sections/ProductDetail";
import Technology from "@/components/sections/Technology";
import Team from "@/components/sections/Team";
import Investors from "@/components/sections/Investors";
import Contact from "@/components/sections/Contact";
import Footer from "@/components/sections/Footer";
import SectionDivider from "@/components/ui/SectionDivider";

export default function Home() {
  return (
    <>
      <Nav />
      <main>
        <Hero />
        <SectionDivider />
        <Problem />
        <SectionDivider />
        <ProductDetail />
        <SectionDivider />
        <Technology />
        <SectionDivider />
        <Team />
        <SectionDivider />
        <Investors />
        <SectionDivider />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
