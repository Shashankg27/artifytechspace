"use client";

import Hero from "@/components/Hero";
import LogoCarousel from "@/components/LogoCarousel";
import AboutSection from "@/components/AboutSection";
import ServicesSection from "@/components/ServicesSection";
import ImpactSection from "@/components/ImpactSection";
import ProcessSection from "@/components/ProcessSection";
import CaseStudiesSection from "@/components/CaseStudiesSection";
import GlobalReachSection from "@/components/GlobalReachSection";
import WhyChooseUsSection from "@/components/WhyChooseUsSection";
import TestimonialsSection from "@/components/TestimonialsSection";
import { motion } from "framer-motion";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

export default function Home() {
  const { theme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null; // prevent theme mismatch
  return (
    <div className="relative">
      <Hero />
      <LogoCarousel />
      
      <AboutSection />
      <ServicesSection />
      <ImpactSection />
      <ProcessSection />
      <CaseStudiesSection />
      <GlobalReachSection />
      
      <WhyChooseUsSection />
      <TestimonialsSection />
      {/* Final CTA Section */}
      <section className={`py-4 md:py-8 relative overflow-hidden transition-colors duration-500 ${
        theme === 'dark' ? 'bg-[#050505]' : 'bg-[#f0f4ff]'
      }`}>
        {/* Animated background blobs */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className={`absolute -top-32 left-1/4 w-[600px] h-[600px] rounded-full animate-pulse transition-all duration-500 ${
            theme === 'dark' ? 'bg-[#009fe3]/10 blur-[140px]' : 'bg-transparent'
          }`} style={{ animationDuration: '6s' }} />
          <div className={`absolute -bottom-32 right-1/4 w-[500px] h-[500px] rounded-full transition-all duration-500 ${
            theme === 'dark' ? 'bg-violet-500/10 blur-[140px]' : 'bg-transparent'
          }`} />
          <div className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] rounded-full transition-all duration-500 ${
            theme === 'dark' ? 'bg-blue-500/5 blur-[100px]' : 'bg-transparent'
          }`} />
        </div>

        {/* Dot grid pattern */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            backgroundImage: theme === 'dark'
              ? 'radial-gradient(circle, rgba(255,255,255,0.06) 1px, transparent 1px)'
              : 'radial-gradient(circle, rgba(0,0,0,0.08) 1px, transparent 1px)',
            backgroundSize: '32px 32px',
          }}
        />

        <div className="container mx-auto px-6 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 60 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className={`relative rounded-[3rem] md:rounded-[4rem] overflow-hidden p-12 md:p-24 text-center border transition-colors duration-500 ${
              theme === 'dark'
                ? 'bg-white/[0.03] border-white/[0.08] shadow-[0_0_120px_rgba(0,159,227,0.12),inset_0_1px_0_rgba(255,255,255,0.05)]'
                : 'bg-white/50 border-black/[0.06] shadow-[0_20px_80px_rgba(0,159,227,0.15),0_2px_0_rgba(255,255,255,0.9)_inset] backdrop-blur-xl'
            }`}
          >
            {/* Background Image Layer (Inside Card) */}
            <div className="absolute inset-0 pointer-events-none transition-opacity duration-700 select-none overflow-hidden z-0">
              <div 
                className="absolute inset-0 bg-cover bg-center h-full brightness-[1.1] md:brightness-125" 
                style={{ backgroundImage: 'url("/Blog.2.jpg")' }} 
              />
              {/* Theme-aware overlay to ensure text readability while keeping images bright */}
              <div className={`absolute inset-0 transition-colors duration-500 ${
                theme === 'dark' ? 'bg-[#050505]/45' : 'bg-black/35'
              }`} />
            </div>

            <div className="relative z-10">

            {/* Top label */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.15, duration: 0.6 }}
              className="mb-8 flex justify-center"
            >
              <span className={`inline-flex items-center gap-2 px-5 py-2 rounded-full text-[10px] font-black uppercase tracking-[0.35em] border transition-colors duration-500 ${
                theme === 'dark'
                  ? 'bg-[#009fe3]/10 border-[#009fe3]/20 text-[#009fe3]'
                  : 'bg-white/20 border-white/30 text-white'
              }`}>
                <span className={`w-1.5 h-1.5 rounded-full animate-pulse ${
                  theme === 'dark' ? 'bg-[#009fe3]' : 'bg-white'
                }`} />
                Ready to Dominate
              </span>
            </motion.div>

            {/* Headline */}
            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.25, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="text-fluid-h2 font-black mb-8 leading-[1.05] tracking-tighter transition-colors duration-500 text-white"
            >
              Experience the future
              <br />
              of{' '}
              <span className="relative inline-block">
                <span className="relative z-10 bg-clip-text text-primary">
                  Professional
                </span>
                <span
                  className={`absolute -inset-x-2 inset-y-0 rounded-xl transition-all duration-500 ${
                    theme === 'dark' ? 'blur-2xl opacity-30 bg-gradient-to-r from-[#009fe3] to-violet-500' : 'opacity-0'
                  }`}
                />
              </span>{' '}
              Logic.
            </motion.h2>

            {/* Subtext */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4, duration: 0.7 }}
              className="text-fluid-p mb-14 max-w-lg mx-auto font-medium leading-relaxed transition-colors duration-500 text-white/70"
            >
              Partner with Artify Tech Space to turn your vision into a high-performance digital reality. Our logic, your growth.
            </motion.p>

            {/* Divider line */}
            <motion.div
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.5, duration: 0.8 }}
              className="w-24 h-px mx-auto mb-14 transition-colors duration-500 bg-gradient-to-r from-transparent via-white/20 to-transparent"
            />

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.55, duration: 0.7 }}
              className="flex flex-col sm:flex-row justify-center gap-4"
            >
              {/* Primary */}
              <button
                className="group/btn relative px-10 py-4 rounded-full font-black text-xs uppercase tracking-[0.25em] text-white overflow-hidden transition-transform hover:scale-[1.03] active:scale-[0.98]"
                style={{
                  background: 'linear-gradient(135deg, #009fe3, #0077b3)',
                  boxShadow: '0 8px 32px rgba(0,159,227,0.4), 0 2px 8px rgba(0,159,227,0.2)',
                }}
              >
                <span className="relative z-10 flex items-center gap-2">
                  Launch Your Project
                  <svg className="w-3.5 h-3.5 translate-x-0 group-hover/btn:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                  </svg>
                </span>
                <div className="absolute inset-0 bg-white/10 opacity-0 group-hover/btn:opacity-100 transition-opacity duration-300" />
              </button>

              {/* Secondary */}
              <button className="group/btn2 px-10 py-4 rounded-full font-black text-xs uppercase tracking-[0.25em] border transition-all duration-300 hover:scale-[1.03] active:scale-[0.98] flex items-center justify-center gap-2 border-white/10 text-white/70 hover:border-white/20 hover:text-white hover:bg-white/5">
                Explore Our Work
                <svg className="w-3.5 h-3.5 opacity-50 group-hover/btn2:opacity-100 translate-x-0 group-hover/btn2:translate-x-1 transition-all" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                </svg>
              </button>
            </motion.div>

            {/* Bottom stats strip */}
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.75, duration: 0.8 }}
              className={`mt-16 pt-10 border-t flex flex-col sm:flex-row justify-center items-center gap-8 sm:gap-16 transition-colors duration-500 ${
                theme === 'dark' ? 'border-white/[0.06]' : 'border-black/[0.06]'
              }`}
            >
              {[
                { value: '150+', label: 'Projects Launched' },
                { value: '98%', label: 'Client Satisfaction' },
                { value: '5×', label: 'Average ROI' },
              ].map(({ value, label }) => (
                <div key={label} className="text-center">
                  <div className="text-2xl font-black tracking-tight bg-gradient-to-br bg-clip-text text-transparent from-white to-white/60">{value}</div>
                  <div className="text-[10px] uppercase tracking-[0.25em] font-semibold mt-0.5 transition-colors duration-500 text-white/30">{label}</div>
                </div>
              ))}
            </motion.div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}