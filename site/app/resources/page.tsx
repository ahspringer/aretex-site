import Nav from "@/components/sections/Nav";
import Footer from "@/components/sections/Footer";

export const metadata = {
  title: "Aretex Labs | Resources",
  description: "Resources page is currently in production.",
};

export default function ResourcesPage() {
  return (
    <>
      <Nav />
      <main className="site-main">
        <section className="relative min-h-[70svh] w-full">
          <div className="site-container py-24 md:py-28">
            <p className="text-xs font-mono text-teal-500 uppercase tracking-[0.3em] mb-4">
              Resources
            </p>
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-extrabold text-white leading-[0.92] tracking-tight">
              In production.
            </h1>
            <p className="mt-6 max-w-2xl text-base md:text-lg text-gray-400 leading-relaxed">
              We are building this section now. Check back soon for technical resources,
              documentation, and updates.
            </p>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
