import Nav from "@/components/sections/Nav";
import Footer from "@/components/sections/Footer";
import Team from "@/components/sections/Team";

export const metadata = {
  title: "Aretex Labs | Team",
  description: "Meet the founding team behind Aretex Labs.",
};

export default function TeamPage() {
  return (
    <>
      <Nav />
      <main className="pt-16">
        <Team />
      </main>
      <Footer />
    </>
  );
}
