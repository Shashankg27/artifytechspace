"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { portfolioContent } from "@/lib/data";

export default function IndustriesSection() {
  return (
    <section className="py-32 bg-background relative overflow-hidden noise">
      <div className="container mx-auto px-6 flex flex-col lg:flex-row items-center gap-24">
        <div className="lg:w-1/2">
          <span className="text-primary font-black tracking-widest uppercase text-[10px] mb-4 block border-l-2 border-primary pl-4">Domains</span>
          <h2 className="text-3xl md:text-5xl font-black mb-12 tracking-tighter text-foreground">Industries we work in</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-10">
            {portfolioContent.industries.map((industry, index) => (
              <motion.div
                key={industry.name}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05 }}
                className="group border-b border-border pb-8 hover:border-primary/30 transition-colors"
              >
                <h4 className="text-base font-bold text-foreground mb-3 group-hover:text-primary transition-colors">{industry.name}</h4>
                <p className="text-[11px] text-muted-foreground leading-relaxed italic italic">
                  {industry.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
        <div className="lg:w-1/2 relative">
          <motion.div 
             initial={{ opacity: 0, scale: 0.9 }}
             whileInView={{ opacity: 1, scale: 1 }}
             viewport={{ once: true }}
             className="relative rounded-[3rem] overflow-hidden shadow-2xl border border-white/5"
          >
            <Image 
              src="https://images.pexels.com/photos/3183150/pexels-photo-3183150.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
              alt="Industries"
              width={600}
              height={800}
              className="w-full h-auto grayscale saturate-50 contrast-125 hover:grayscale-0 transition-all duration-1000"
            />
            <div className="absolute inset-0 bg-primary/20 mix-blend-overlay pointer-events-none" />
          </motion.div>
          
          <div className="section-blob bottom-[-10%] right-[-10%] opacity-30" />
        </div>
      </div>
    </section>
  );
}
