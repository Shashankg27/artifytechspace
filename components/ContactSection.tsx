"use client";

import { motion } from "framer-motion";
import { siteConfig } from "@/lib/data";

export default function ContactSection() {
  const { phone, email, address, hours } = siteConfig.contact;

  return (
    <section className="py-32 relative overflow-hidden noise mesh-gradient bg-background">
      <div className="container mx-auto px-6">
        <div className="flex flex-col lg:flex-row gap-24">
          {/* Contact Info */}
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="lg:w-2/5 space-y-16"
          >
            <div>
              <span className="text-primary font-black uppercase tracking-[0.3em] text-[10px] mb-6 block border-l-2 border-primary pl-4">Connection</span>
              <h2 className="text-3xl md:text-5xl font-black mb-8 tracking-tighter leading-tight text-foreground">Let's build something <span className="text-primary">extraordinary.</span></h2>
              <p className="text-muted-foreground text-sm leading-relaxed italic border-b border-border pb-12">
                Write to us or give us a call. We will reply to you as soon as possible.
              </p>
            </div>

            <div className="space-y-10">
              <div className="flex items-center space-x-6 group">
                <div className="w-12 h-12 rounded-2xl bg-primary/10 border border-border flex items-center justify-center text-primary text-xl group-hover:bg-primary group-hover:text-white transition-all duration-300 shadow-xl">
                  <i className="bi bi-geo-alt"></i>
                </div>
                <div>
                  <h5 className="font-bold text-foreground text-sm mb-1 uppercase tracking-widest">Office Address</h5>
                  <p className="text-xs text-muted-foreground">{address}</p>
                </div>
              </div>

              <div className="flex items-center space-x-6 group">
                <div className="w-12 h-12 rounded-2xl bg-primary/10 border border-border flex items-center justify-center text-primary text-xl group-hover:bg-primary group-hover:text-white transition-all duration-300 shadow-xl">
                  <i className="bi bi-envelope"></i>
                </div>
                <div>
                  <h5 className="font-bold text-foreground text-sm mb-1 uppercase tracking-widest">Email Support</h5>
                  <p className="text-xs text-muted-foreground">{email}</p>
                </div>
              </div>

              <div className="flex items-center space-x-6 group">
                <div className="w-12 h-12 rounded-2xl bg-primary/10 border border-border flex items-center justify-center text-primary text-xl group-hover:bg-primary group-hover:text-white transition-all duration-300 shadow-xl">
                  <i className="bi bi-telephone"></i>
                </div>
                <div>
                  <h5 className="font-bold text-foreground text-sm mb-1 uppercase tracking-widest">Phone Number</h5>
                  <p className="text-xs text-muted-foreground">{phone}</p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Contact Form */}
          <motion.div 
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="lg:w-3/5"
          >
            <div className="glass p-10 md:p-14 rounded-[3rem] shadow-2xl relative z-10 border border-border">
              <form className="space-y-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="space-y-3">
                    <label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground/60">Full Name</label>
                    <input 
                      type="text" 
                      className="w-full bg-background/50 border border-border rounded-2xl px-5 py-4 text-xs focus:outline-none focus:border-primary transition-all duration-300 text-foreground"
                      placeholder="John Doe"
                    />
                  </div>
                  <div className="space-y-3">
                    <label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground/60">Your Email</label>
                    <input 
                      type="email" 
                      className="w-full bg-background/50 border border-border rounded-2xl px-5 py-4 text-xs focus:outline-none focus:border-primary transition-all duration-300 text-foreground"
                      placeholder="john@example.com"
                    />
                  </div>
                </div>
                <div className="space-y-3">
                  <label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground/60">Subject</label>
                  <input 
                    type="text" 
                    className="w-full bg-background/50 border border-border rounded-2xl px-5 py-4 text-xs focus:outline-none focus:border-primary transition-all duration-300 text-foreground"
                    placeholder="Project Inquiry"
                  />
                </div>
                <div className="space-y-3">
                  <label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground/60">How Can We Help You?</label>
                  <textarea 
                    rows={6}
                    className="w-full bg-background/50 border border-border rounded-3xl px-5 py-4 text-xs focus:outline-none focus:border-primary transition-all duration-300 text-foreground"
                    placeholder="Tell us about your project..."
                  />
                </div>
                <button 
                  type="submit" 
                  className="btn-theme w-full py-5 text-base uppercase tracking-[0.2em]"
                >
                  Send Message
                </button>
              </form>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
