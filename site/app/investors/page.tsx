import Nav from "@/components/sections/Nav";
import Footer from "@/components/sections/Footer";
import Investors from "@/components/sections/Investors";

export const metadata = {
  title: "Aretex Labs | Investors",
  description:
    "Aretex Labs investor information, development roadmap, and contact form.",
};

export default function InvestorsPage() {
  return (
    <>
      <Nav />
      <main className="site-main">
        <Investors />
      </main>
      <Footer />
    </>
  );
}
