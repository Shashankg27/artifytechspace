import PortfolioSection from "@/components/PortfolioSection";
import IndustriesSection from "@/components/IndustriesSection";

export default function PortfolioPage() {
  return (
    <div className="pt-20">
      <section className="py-32 bg-gradient-to-b from-primary/10 to-background text-center">
        <div className="container mx-auto px-6">
          <h1 className="text-3xl md:text-5xl font-extrabold mb-6 text-foreground">Portfolio</h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto italic">
            Check out some of our latest projects and the industries we serve.
          </p>
        </div>
      </section>

      <PortfolioSection />
      <IndustriesSection />
    </div>
  );
}
