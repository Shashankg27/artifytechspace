"use client";

import Link from "next/link";
import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";
import { homeContent } from "@/lib/data";
import { useTheme } from "next-themes";
import MagneticButton from "./MagneticButton";

export default function Hero() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const slides = homeContent.heroSlides;
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  const textY = useTransform(scrollYProgress, [0, 1], [0, 200]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  useEffect(() => {
    setMounted(true);
    const timer = setInterval(() => {
      setCurrentSlide((prev: number) => (prev + 1) % slides.length);
    }, 8000);
    return () => clearInterval(timer);
  }, [slides.length]);

  const isDark = mounted ? resolvedTheme === "dark" : true;
  
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    const { left, top, width, height } = containerRef.current.getBoundingClientRect();
    const x = (e.clientX - left) / width;
    const y = (e.clientY - top) / height;
    containerRef.current.style.setProperty('--mouse-x', `${x * 100}%`);
    containerRef.current.style.setProperty('--mouse-y', `${y * 100}%`);
    containerRef.current.style.setProperty('--mouse-x-raw', x.toString());
    containerRef.current.style.setProperty('--mouse-y-raw', y.toString());
  };

  return (
    <section
      ref={containerRef}
      onMouseMove={handleMouseMove}
      className="relative h-[110vh] w-full overflow-hidden bg-background"
    >
      {!mounted ? (
        <div className="absolute inset-0 flex items-center justify-center bg-background" />
      ) : (
        <>
          {/* 🌌 Ultimate Architectural Masterpiece Background */}
          <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
            {/* Base Mesh Gradient (Subtle & Deep) */}
            <motion.div 
              animate={{
                scale: [1, 1.1, 1],
                rotate: [0, 5, 0],
              }}
              transition={{
                duration: 20,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className={`absolute inset-0 transition-colors duration-[2s] ${
                isDark 
                  ? 'bg-[radial-gradient(circle_at_50%_50%,#009fe315_0%,#050505_100%)]' 
                  : 'bg-[radial-gradient(circle_at_50%_50%,#009fe310_0%,#f8fafc_100%)]'
              }`}
            />

            {/* Premium Interactive Mouse Spotlight */}
            <motion.div
              className={`absolute inset-0 z-1 pointer-events-none transition-opacity duration-1000 ${
                isDark ? 'opacity-40' : 'opacity-60'
              }`}
              style={{
                background: `radial-gradient(800px circle at var(--mouse-x, 50%) var(--mouse-y, 50%), ${isDark ? '#009fe335' : '#009fe345'}, ${isDark ? '#009fe310' : '#009fe315'} 40%, transparent 80%)`,
              }}
            />

            {/* SVG Architectural Layer: Primary Hub with Magnetic Tilt */}
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 80, repeat: Infinity, ease: "linear" }}
              style={{
                perspective: 1000,
                rotateX: 'calc((var(--mouse-y-raw, 0) - 0.5) * 15deg)',
                rotateY: 'calc((var(--mouse-x-raw, 0) - 0.5) * -15deg)',
              }}
              className={`absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[130vh] h-[130vh] transition-all duration-300 ease-out ${
                isDark ? 'opacity-[0.12]' : 'opacity-[0.35]'
              }`}
            >
              <svg viewBox="0 0 100 100" className="w-full h-full stroke-primary fill-none">
                <circle cx="50" cy="50" r="48" strokeWidth="0.1" strokeDasharray="1 2" />
                <circle cx="50" cy="50" r="40" strokeWidth="0.05" />
                <rect x="25" y="25" width="50" height="50" strokeWidth="0.05" rotate="45" />
                <path d="M50 2 L50 98 M2 50 L98 50" strokeWidth="0.05" opacity="0.5" />
                {/* Advanced Geometric Internals */}
                <path d="M50 15 L85 50 L50 85 L15 50 Z" strokeWidth="0.05" opacity="0.3" />
                <path d="M50 30 L67.32 40 L67.32 60 L50 70 L32.68 60 L32.68 40 Z" strokeWidth="0.15" />
              </svg>
            </motion.div>

            {/* Premium "Digital Rain" Data Streams */}
            <div className="absolute inset-0">
              {[...Array(12)].map((_, i) => (
                <motion.div
                  key={i}
                  animate={{
                    y: ['-100%', '250%'],
                    opacity: isDark ? [0, 0.6, 0] : [0, 0.9, 0],
                  }}
                  transition={{
                    duration: 3 + i * 1,
                    repeat: Infinity,
                    ease: "linear",
                    delay: i * 1.5,
                  }}
                  className="absolute w-[1px] h-[50vh] bg-gradient-to-b from-transparent via-primary to-transparent"
                  style={{ left: `${5 + i * 8}%`, opacity: isDark ? 0.3 : 0.6 }}
                />
              ))}
            </div>

            {/* Floating 3D "Glass" Cards */}
            {[...Array(5)].map((_, i) => (
              <motion.div
                key={i}
                animate={{
                  y: [0, -30, 0],
                  x: [0, 15, 0],
                  rotateX: [15, 25, 15],
                  rotateY: [10, 20, 10],
                }}
                transition={{
                  duration: 8 + i * 2,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: i * 1.5,
                }}
                className={`absolute w-40 h-40 rounded-[2.5rem] border backdrop-blur-[4px] shadow-2xl transition-colors duration-500 ${
                  isDark 
                    ? 'bg-white/[0.03] border-white/10' 
                    : 'bg-black/[0.08] border-black/15 shadow-black/10'
                }`}
                style={{
                  left: `${15 + i * 18}%`,
                  top: `${10 + (i % 3) * 20}%`,
                  transform: 'perspective(1200px)',
                }}
              />
            ))}

            {/* Floating Tech Icons (Parallax Layer) */}
            <div className="absolute inset-0">
              {[
                { Icon: 'Code', x: 20, y: 30, size: 24 },
                { Icon: 'Cpu', x: 75, y: 25, size: 32 },
                { Icon: 'Globe', x: 85, y: 70, size: 28 },
                { Icon: 'Zap', x: 15, y: 75, size: 20 },
                { Icon: 'Layers', x: 45, y: 15, size: 30 },
              ].map((item, i) => (
                <motion.div
                  key={i}
                  animate={{
                    y: [0, -20, 0],
                    rotate: [0, 360],
                  }}
                  transition={{
                    y: { duration: 5 + i, repeat: Infinity, ease: "easeInOut" },
                    rotate: { duration: 20 + i * 5, repeat: Infinity, ease: "linear" }
                  }}
                  className={`absolute transition-opacity duration-500 ${
                    isDark ? 'text-primary/30' : 'text-primary/60'
                  }`}
                  style={{
                    left: `${item.x}%`,
                    top: `${item.y}%`,
                    filter: isDark ? 'drop-shadow(0 0 8px var(--primary))' : 'none',
                  }}
                >
                  <div style={{ transform: `scale(${item.size / 24})` }}>
                    {/* Simplified manual SVG icons to avoid dynamic import dependency issues */}
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                      {item.Icon === 'Code' && <path d="m18 16 4-4-4-4M6 8l-4 4 4 4" />}
                      {item.Icon === 'Cpu' && <rect x="4" y="4" width="16" height="16" rx="2" />}
                      {item.Icon === 'Globe' && <circle cx="12" cy="12" r="10" />}
                      {item.Icon === 'Zap' && <path d="M13 2 L3 14 L12 14 L11 22 L21 10 L12 10 Z" />}
                      {item.Icon === 'Layers' && <path d="M12 2 2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />}
                    </svg>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Parallax Particle Layer */}
            <div className="absolute inset-0">
              {[...Array(30)].map((_, i) => (
                <motion.div
                  key={i}
                  animate={{
                    y: [0, -120, 0],
                    opacity: isDark ? [0.1, 0.6, 0.1] : [0.3, 0.9, 0.3],
                  }}
                  transition={{
                    duration: 10 + Math.random() * 15,
                    repeat: Infinity,
                    ease: "linear",
                    delay: Math.random() * 5,
                  }}
                  className={`absolute w-1 h-1 rounded-full transition-colors duration-500 ${
                    isDark ? 'bg-primary/50' : 'bg-primary/80'
                  }`}
                  style={{
                    left: `${Math.random() * 100}%`,
                    top: `${Math.random() * 100}%`,
                    boxShadow: isDark ? '0 0 12px var(--primary)' : '0 0 6px var(--primary)',
                  }}
                />
              ))}
            </div>

            {/* Dynamic Grid Overlay */}
            <div 
              className={`absolute inset-0 opacity-[0.05] pointer-events-none mix-blend-overlay ${
                isDark ? 'invert' : ''
              }`}
              style={{
                backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
              }}
            />

            {/* Subtle Vignette */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,rgba(0,0,0,0.2)_100%)] pointer-events-none" />
          </div>

          {/* CONTENT */}
          <div className="relative h-full container mx-auto px-6 flex items-center justify-center text-center">
            <motion.div style={{ y: textY, opacity }} className="max-w-5xl z-10">
              
              {/* Animate only TEXT when slide changes */}
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentSlide}
                  initial={{ opacity: 0, y: 40 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -40 }}
                  transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                >
                  <motion.h1 className={`text-fluid-h1 font-black mb-10 leading-[0.9] tracking-tighter transition-colors duration-500 ${
                    isDark ? 'text-white' : 'text-[#050505]'
                  }`}>
                    {currentSlide === 0 ? (
                      <>
                        Design. Develop.{" "}
                        <span className="text-primary">Dominate.</span>
                      </>
                    ) : (
                      slides[currentSlide].headline.split(" ").map((word, i) => (
                        <span
                          key={i}
                          className={i % 2 === 1 ? "text-primary" : ""}
                        >
                          {word}{" "}
                        </span>
                      ))
                    )}
                  </motion.h1>

                  <motion.p className={`text-fluid-p mb-16 max-w-2xl mx-auto leading-relaxed font-medium transition-colors duration-500 ${
                    isDark ? 'text-white/70' : 'text-[#050505]/60'
                  }`}>
                    {slides[currentSlide].description}
                  </motion.p>
                </motion.div>
              </AnimatePresence>

              {/* BUTTONS */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="flex flex-col sm:flex-row gap-10 justify-center items-center"
              >
                <MagneticButton>
                  <Link href="/contact" className="relative group px-12 py-5 rounded-full bg-primary text-white font-black text-xs uppercase tracking-[0.2em] overflow-hidden shadow-2xl shadow-primary/30 inline-block">
                    <span className="relative z-10">Start a Project</span>
                    <div className="absolute inset-0 bg-white translate-y-full group-hover:translate-y-0 transition-transform duration-500" />
                    <span className="absolute inset-0 z-0 bg-primary" />
                    <span className="relative z-10 group-hover:text-primary transition-colors duration-500 ml-2">
                      →
                    </span>
                  </Link>
                </MagneticButton>

                <Link
                  href="/portfolio"
                  className="font-mono text-[10px] text-muted-foreground hover:text-primary transition-colors tracking-[0.4em] uppercase border-b border-muted-foreground/20 pb-2"
                >
                  View Portfolio
                </Link>
              </motion.div>
            </motion.div>
          </div>

          {/* SCROLL INDICATOR */}
          <div className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-10">
            <div className="flex gap-4">
              {slides.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentSlide(index)}
                  className="group relative"
                >
                  <div
                    className={`h-[2px] transition-all duration-1000 rounded-full ${
                      currentSlide === index
                        ? "bg-primary w-12"
                        : "bg-foreground/10 w-6 group-hover:bg-foreground/30"
                    }`}
                  />
                </button>
              ))}
            </div>

            <motion.div
              animate={{ y: [0, 10, 0] }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className="flex flex-col items-center gap-4"
            >
              <motion.div 
                animate={{ scale: [1, 1.5, 1], opacity: [0.3, 0.7, 0.3] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="w-2 h-2 rounded-full bg-primary shadow-[0_0_15px_var(--primary)]" 
              />
              <div className="w-[1px] h-20 bg-gradient-to-b from-primary/50 via-primary to-transparent" />
            </motion.div>
          </div>
        </>
      )}
    </section>
  );
}