import Nav from "@/components/sections/Nav";
import Footer from "@/components/sections/Footer";
import Contact from "@/components/sections/Contact";

export const metadata = {
  title: "Aretex Labs | Contact",
  description: "Get in touch with Aretex Labs.",
};

export default function ContactPage() {
  return (
    <>
      <Nav />
      <main className="site-main">
        <Contact />
      </main>
      <Footer />
    </>
  );
}
