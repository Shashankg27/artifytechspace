"use client";

import { motion, useScroll, useTransform, MotionValue } from "framer-motion";
import { homeContent } from "@/lib/data";
import { useRef, useState, useEffect } from "react";
import * as LucideIcons from "lucide-react";
import Image from "next/image";
import Link from "next/link";

interface ServiceItemProps {
  service: any;
  index: number;
  total: number;
  scrollYProgress: MotionValue<number>;
  gradient: string;
  color: string;
}

function ProgressDot({
  index,
  total,
  scrollYProgress,
}: {
  index: number;
  total: number;
  scrollYProgress: MotionValue<number>;
}) {
  const start = index / total;
  const end = (index + 1) / total;

  const opacity = useTransform(
    scrollYProgress,
    [start - 0.1, start, end, end + 0.1],
    [0.3, 1, 1, 0.3]
  );

  const scale = useTransform(
    scrollYProgress,
    [start - 0.1, start, end, end + 0.1],
    [1, 1.2, 1.2, 1]
  );

  const scaleY = useTransform(scrollYProgress, [start, end], [0, 1]);

  return (
    <motion.div
      style={{ opacity, scale, transformOrigin: "left center" }}
      className="flex items-center gap-6 group cursor-pointer"
    >
      <div className="relative w-2 h-2">
        <div className="w-2 h-2 rounded-full bg-primary/20 border border-primary/40 shadow-[0_0_20px_rgba(0,159,227,0.4)]" />
        <motion.div
          style={{ scaleY, originY: 0 }}
          className="absolute inset-0 bg-primary rounded-full shadow-primary-glow"
        />
      </div>

      <span className="text-[15px] font-mono uppercase tracking-[0.2em] font-black group-hover:text-primary transition-colors text-glow">
        {homeContent.services.items[index].title}
      </span>
    </motion.div>
  );
}

function ServiceCardSticky({
  service,
  index,
  total,
  scrollYProgress,
  gradient,
  color,
}: ServiceItemProps) {
  const start = index / total;
  const end = (index + 1) / total;

  const opacity = useTransform(
    scrollYProgress,
    [start, start + 0.05, end - 0.05, end],
    [0, 1, 1, 0]
  );

  const y = useTransform(
    scrollYProgress,
    [start, start + 0.05, end - 0.05, end],
    [100, 0, 0, -100]
  );

  const scale = useTransform(
    scrollYProgress,
    [start, start + 0.05, end - 0.05, end],
    [0.9, 1, 1, 0.9]
  );

  const mid = (start + end) / 2;

  const zIndex = useTransform(scrollYProgress, (v) => {
    const distanceFromCenter = Math.abs(v - mid);
    return Math.round(50 - distanceFromCenter * 100);
  });

  return (
    <motion.div style={{ opacity, y, scale, zIndex }} className="absolute inset-0">
      <div 
        style={{ borderColor: `${color}20` }}
        className="glass-neo p-8 md:p-16 rounded-[2rem] md:rounded-[4rem] h-full flex flex-col justify-between shadow-[0_50px_100px_rgba(0,0,0,0.1)] group transition-all duration-500 overflow-hidden relative"
      >
        {/* Background Image & Overlay */}
        <div className="absolute inset-0 z-0">
          <Image
            src={`/card${index + 1}.jpg`}
            alt=""
            fill
            className="object-cover transition-opacity duration-700"
          />
          <div 
            className="absolute inset-0 bg-black/40"
          />
        </div>

        <div className="flex flex-col gap-6 md:gap-10 relative z-10">
          <div 
            style={{ backgroundColor: `${color}15` }}
            className="w-16 h-16 md:w-20 md:h-20 rounded-2xl md:rounded-3xl flex items-center justify-center group-hover:scale-110 transition-all duration-700 shadow-2xl overflow-hidden relative"
          >
            <div 
              className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700"
              style={{ background: `radial-gradient(circle at center, ${color}40 0%, transparent 70%)` }}
            />
            {(() => {
              const IconComponent = (LucideIcons as any)[service.icon];
              return IconComponent ? (
                <IconComponent 
                  size={42} 
                  strokeWidth={1.5} 
                  color="#009FE3" 
                  className="relative z-10"
                />
              ) : (
                <Image
                  src={service.icon}
                  alt={service.title}
                  width={40}
                  height={40}
                  className="w-8 h-8 md:w-10 md:h-10 relative z-10"
                />
              );
            })()}
          </div>

          <div>
            <h3 className="text-3xl md:text-5xl font-black mb-4 md:mb-8 text-white tracking-tighter uppercase leading-none text-glow-white">
              {service.title}
            </h3>

            <p className="text-base md:text-xl text-white/70 leading-relaxed font-medium max-w-xl">
              {service.description}
            </p>
          </div>
        </div>

        <Link 
          href="/contact"
          style={{ color: "white", borderColor: "rgba(255,255,255,0.2)" }}
          className="flex items-center font-black text-[10px] md:text-xs uppercase tracking-[0.4em] pt-8 md:pt-12 border-t group-hover:translate-x-2 transition-transform duration-500 cursor-pointer text-white"
        >
          Launch Project <i className="bi bi-arrow-right ml-4"></i>
        </Link>
      </div>
    </motion.div>
  );
}

export default function ServicesSection() {
  const { items } = homeContent.services;
  const containerRef = useRef<HTMLDivElement>(null);

  const cardThemes = [
    { color: "#009FE3", gradient: "linear-gradient(135deg, rgba(0, 159, 227, 0.12) 0%, rgba(0, 159, 227, 0.04) 100%)" }, // Blue
    { color: "#8B5CF6", gradient: "linear-gradient(135deg, rgba(139, 92, 246, 0.12) 0%, rgba(139, 92, 246, 0.04) 100%)" }, // Purple
    { color: "#EC4899", gradient: "linear-gradient(135deg, rgba(236, 72, 153, 0.12) 0%, rgba(236, 72, 153, 0.04) 100%)" }, // Pink
    { color: "#F59E0B", gradient: "linear-gradient(135deg, rgba(245, 158, 11, 0.12) 0%, rgba(245, 158, 11, 0.04) 100%)" }, // Amber
    { color: "#10B981", gradient: "linear-gradient(135deg, rgba(16, 185, 129, 0.12) 0%, rgba(16, 185, 129, 0.04) 100%)" }, // Emerald
    { color: "#3B82F6", gradient: "linear-gradient(135deg, rgba(59, 130, 246, 0.12) 0%, rgba(59, 130, 246, 0.04) 100%)" }, // Indigo
    { color: "#F43F5E", gradient: "linear-gradient(135deg, rgba(244, 63, 94, 0.12) 0%, rgba(244, 63, 94, 0.04) 100%)" }, // Rose
    { color: "#06B6D4", gradient: "linear-gradient(135deg, rgba(6, 182, 212, 0.12) 0%, rgba(6, 182, 212, 0.04) 100%)" }, // Cyan
  ];

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  return (
    <section ref={containerRef} className="relative h-[400vh] lg:h-[500vh] bg-background">
      <div
        style={{ position: "sticky", top: "0" }}
        className="h-screen w-full flex items-center overflow-hidden noise mesh-gradient z-20"
      >
        <div className="absolute inset-0 flex items-center justify-center opacity-[0.03] pointer-events-none select-none">
          <h1 className="text-[15vw] font-black text-foreground leading-none tracking-tighter">
            SOLUTIONS
          </h1>
        </div>

        <div className="container mx-auto px-6 h-full flex flex-col justify-center relative z-10">
          <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-24 h-full pt-20">
            <div className="w-full lg:w-5/12">
              <h2 className="text-fluid-h2 font-black tracking-tighter text-foreground mb-12 leading-[0.9]">
                Empowering <br /> your <span className="text-primary marker-highlight">Digital</span> future <br /> through <span className="text-primary marker-highlight">Logic</span>.
              </h2>

              <div className="hidden lg:flex flex-col gap-6 relative">
                <div className="absolute left-[3px] top-0 bottom-0 w-[1px] bg-primary/20" />
                {items.map((_, index) => (
                  <ProgressDot
                    key={index}
                    index={index}
                    total={items.length}
                    scrollYProgress={scrollYProgress}
                  />
                ))}
              </div>
            </div>

            <div className="w-full lg:w-7/12 relative h-[400px] md:h-[500px] isolate">
              {items.map((service, index) => (
                <ServiceCardSticky
                  key={service.title}
                  service={service}
                  index={index}
                  total={items.length}
                  scrollYProgress={scrollYProgress}
                  gradient={cardThemes[index % cardThemes.length].gradient}
                  color={cardThemes[index % cardThemes.length].color}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}