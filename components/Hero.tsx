"use client";

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

  return (
    <section
      ref={containerRef}
      className="relative h-[110vh] w-full overflow-hidden bg-background"
    >
      {!mounted ? (
        <div className="absolute inset-0 flex items-center justify-center bg-background" />
      ) : (
        <>
          {/* ✅ VIDEO — now permanent (not inside AnimatePresence) */}
          <video
            autoPlay
            muted
            loop
            playsInline
            className={`absolute inset-0 w-full h-full object-cover pointer-events-none transition-all duration-[2s] ${
              isDark
                ? "brightness-[1] saturate-[0.8]"
                : "brightness-[1] saturate-[0.8]"
            }`}
          >
            <source src="/download.mp4" type="video/mp4" />
          </video>

          {/* Gradient overlay */}
          <div
            className={`absolute inset-0 bg-gradient-to-b`}
          />

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
                  <motion.h1 className="text-fluid-h1 font-black mb-10 leading-[0.9] tracking-tighter text-foreground !text-white">
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

                  <motion.p className="text-fluid-p text-muted-foreground mb-16 max-w-2xl mx-auto leading-relaxed font-medium !text-white">
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
                  <button className="relative group px-12 py-5 rounded-full bg-primary text-white font-black text-xs uppercase tracking-[0.2em] overflow-hidden shadow-2xl shadow-primary/30">
                    <span className="relative z-10">Start a Project</span>
                    <div className="absolute inset-0 bg-white translate-y-full group-hover:translate-y-0 transition-transform duration-500" />
                    <span className="absolute inset-0 z-0 bg-primary" />
                    <span className="relative z-10 group-hover:text-primary transition-colors duration-500 ml-2">
                      →
                    </span>
                  </button>
                </MagneticButton>

                <a
                  href="#work"
                  className="font-mono text-[10px] text-muted-foreground hover:text-primary transition-colors tracking-[0.4em] uppercase border-b border-muted-foreground/20 pb-2"
                >
                  View Portfolio
                </a>
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
              <div className="w-[1px] h-20 bg-gradient-to-b from-primary/50 via-primary to-transparent" />
            </motion.div>
          </div>
        </>
      )}
    </section>
  );
}