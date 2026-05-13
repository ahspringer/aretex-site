import Nav from "@/components/sections/Nav";
import Footer from "@/components/sections/Footer";
import Contact from "@/components/sections/Contact";

export const metadata = {
  title: "Contact — Aretex Labs",
  description: "Get in touch with Aretex Labs.",
};

export default function ContactPage() {
  return (
    <>
      <Nav />
      <main className="pt-16">
        <Contact />
      </main>
      <Footer />
    </>
  );
}
