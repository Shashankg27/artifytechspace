"use client";

import { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { portfolioContent } from "@/lib/data";
import MagneticButton from "./MagneticButton";
import ProjectModal from "./ProjectModal";

export default function PortfolioSection() {
  const [selectedProject, setSelectedProject] = useState<any>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openProject = (project: any) => {
    setSelectedProject(project);
    setIsModalOpen(true);
  };

  return (
    <section className="py-32 bg-background relative overflow-hidden">
      <div className="container mx-auto px-6 relative z-10">
        <div className="text-center mb-24">
          <motion.span 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            className="text-primary font-black tracking-[0.4em] uppercase text-[10px] mb-4 block"
          >
            Our Masterpieces
          </motion.span>
          <h2 className="text-3xl md:text-5xl font-black mb-6 tracking-tighter text-foreground text-glow uppercase">
            Portfolio <span className="text-primary font-outline">Projects</span>
          </h2>
          <p className="text-sm text-muted-foreground italic max-w-2xl mx-auto border-y border-primary/10 py-4">
            Transforming complex challenges into elegant digital experiences that drive growth.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {portfolioContent.projects.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 1, ease: [0.16, 1, 0.3, 1] }}
              className="group relative rounded-[3rem] overflow-hidden aspect-[4/5] perspective-hover shimmer-border cursor-pointer focus:outline-none"
              onClick={() => openProject(project)}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => e.key === "Enter" && openProject(project)}
            >
              <Image 
                src={project.image} 
                alt={project.title} 
                fill 
                className="object-cover transition-transform duration-[1.5s] group-hover:scale-110 brightness-[0.7] saturate-[0.9]"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/20 to-transparent opacity-80 group-hover:opacity-100 transition-opacity duration-700" />
              
              <div className="absolute inset-0 p-10 flex flex-col justify-end translate-y-6 group-hover:translate-y-0 transition-transform duration-700">
                <span className="text-primary font-black text-[10px] mb-2 uppercase tracking-[0.4em]">{project.category}</span>
                <h3 className="text-xl md:text-2xl font-black text-white mb-6 leading-[1.1] tracking-tighter">{project.title}</h3>
                
                <div className="flex items-center justify-between">
                  <MagneticButton>
                    <div className="w-14 h-14 rounded-full bg-primary flex items-center justify-center text-white shadow-[0_0_40px_rgba(0,159,227,0.5)] group/btn">
                      <i className="bi bi-arrow-up-right text-xl group-hover/btn:translate-x-1 group-hover/btn:-translate-y-1 transition-transform"></i>
                    </div>
                  </MagneticButton>
                  
                  <div className="text-[10px] font-bold text-white/40 uppercase tracking-widest group-hover:text-white/80 transition-colors">
                    View Project
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
      
      <div className="section-blob bottom-[-10%] left-0 opacity-20" />

      {/* Project Modal */}
      <ProjectModal 
        project={selectedProject}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        allProjects={portfolioContent.projects}
        onProjectChange={(project) => setSelectedProject(project)}
      />
    </section>
  );
}
