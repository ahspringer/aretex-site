import Nav from "@/components/sections/Nav";
import Footer from "@/components/sections/Footer";
import EngineeringDomains from "@/components/sections/EngineeringDomains";

export const metadata = {
  title: "Aretex Labs | Engineering",
  description:
    "Aretex Labs operates across embedded systems, ballistics simulation, hardware prototyping, and optical human-machine interface design.",
};

export default function EngineeringPage() {
  return (
    <>
      <Nav />
      <main className="site-main">
        {/* Page header */}
        <section className="relative site-section pt-24 lg:pt-28 pb-4">
          <div className="site-container">
            <p className="text-xs font-mono text-teal-500 uppercase tracking-[0.3em] mb-4">
              Engineering
            </p>
            <h1 className="text-5xl md:text-6xl font-extrabold text-white leading-[0.95] tracking-tight max-w-2xl">
              Precision across the stack.
            </h1>
            <p className="mt-6 text-base md:text-lg text-gray-400 leading-relaxed max-w-2xl">
              From sensor to sight picture, we own the full system. Our work
              spans hardware, firmware, physics, and the interfaces that connect
              them to people.
            </p>
          </div>
        </section>

        <EngineeringDomains />
      </main>
      <Footer />
    </>
  );
}
