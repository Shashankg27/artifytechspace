"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { partners } from "@/lib/data";

export default function LogoCarousel() {
  // Create two separate sets of partners for the two rows
  const row1Partners = [...partners, ...partners];
  const row2Partners = [...partners.reverse(), ...partners];

  const CarouselRow = ({ 
    items, 
    direction = "left", 
    duration = 30 
  }: { 
    items: typeof partners, 
    direction?: "left" | "right", 
    duration?: number 
  }) => (
    <div className="flex relative items-center mb-8 last:mb-0">
      <motion.div
        animate={{
          x: direction === "left" ? ["0%", "-50%"] : ["-50%", "0%"],
        }}
        transition={{
          duration: duration,
          ease: "linear",
          repeat: Infinity,
        }}
        className="flex"
      >
        {items.map((partner, index) => (
          <div
            key={index}
            className="flex-shrink-0 px-4"
          >
            <div className="w-40 h-40 md:w-48 md:h-48 flex flex-col items-center justify-center p-6 bg-white/[0.03] dark:bg-white/[0.02] border border-white/10 rounded-3xl backdrop-blur-md transition-all duration-500 cursor-pointer group hover:bg-primary/5 hover:border-primary/30 hover:shadow-[0_0_30px_-10px_rgba(var(--primary-rgb),0.3)]">
              <div className="relative w-16 h-16 md:w-20 md:h-20 mb-4 opacity-40 group-hover:opacity-100 grayscale group-hover:grayscale-0 transition-all duration-500 transform group-hover:scale-110">
                <Image
                  src={partner.logo}
                  alt={partner.name}
                  fill
                  className="object-contain dark:brightness-200"
                />
              </div>
              <p className="text-sm md:text-base font-medium text-muted-foreground group-hover:text-primary transition-colors text-center">
                {partner.name}
              </p>
            </div>
          </div>
        ))}
      </motion.div>
    </div>
  );

  return (
    <section className="py-24 bg-background overflow-hidden relative">
      {/* Decorative background elements */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-[120px] -z-10" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-blue-500/5 rounded-full blur-[120px] -z-10" />

      <div className="container mx-auto px-6 mb-16 text-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-4">Trusted by Industry Leaders</h2>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          We collaborate with the world's most innovative companies to build digital excellence.
        </p>
      </div>
      
      <div className="relative">
        {/* Gradients to fade edges */}
        <div className="absolute left-0 top-0 bottom-0 w-32 md:w-64 bg-gradient-to-r from-background via-background/80 to-transparent z-20 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-32 md:w-64 bg-gradient-to-l from-background via-background/80 to-transparent z-20 pointer-events-none" />

        <CarouselRow items={row1Partners} direction="left" duration={40} />
        <CarouselRow items={row2Partners} direction="right" duration={45} />
      </div>
    </section>
  );
}
