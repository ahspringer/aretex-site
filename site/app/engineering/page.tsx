import Nav from "@/components/sections/Nav";
import Footer from "@/components/sections/Footer";
import DesignIt from "@/components/sections/DesignIt";
import PerfectIt from "@/components/sections/PerfectIt";
import BuildIt from "@/components/sections/BuildIt";
import EngineeringContact from "@/components/sections/EngineeringContact";

export const metadata = {
  title: "Aretex Labs | Engineering",
  description:
    "Design it. Perfect it. Build it. Aretex Labs delivers CAD-led design, engineering analysis, and rapid hardware execution.",
};

export default function EngineeringPage() {
  return (
    <>
      <Nav />
      <main className="site-main">
        <DesignIt />
        <PerfectIt />
        <BuildIt />
        <EngineeringContact />
      </main>
      <Footer />
    </>
  );
}
