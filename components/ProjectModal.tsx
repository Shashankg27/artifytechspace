"use client";

import { motion, AnimatePresence } from "framer-motion";
import { X, ExternalLink, Cpu, CheckCircle2 } from "lucide-react";
import Image from "next/image";
import MagneticButton from "./MagneticButton";

interface Project {
  id: string;
  title: string;
  category: string;
  image: string;
  description: string;
  techStack: string[];
  features: string[];
  link: string;
}

interface ProjectModalProps {
  project: Project | null;
  isOpen: boolean;
  onClose: () => void;
  allProjects: Project[];
  onProjectChange: (project: Project) => void;
}

export default function ProjectModal({ project, isOpen, onClose, allProjects, onProjectChange }: ProjectModalProps) {
  if (!project) return null;

  // Find related projects (same category, excluding current)
  const relatedProjects = allProjects
    .filter((p) => p.category === project.category && p.id !== project.id)
    .slice(0, 3); // Show top 3 related

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-10">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-background/80 backdrop-blur-xl"
          />

          {/* Modal Content */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="relative w-full max-w-5xl bg-card border border-primary/10 rounded-[3rem] overflow-hidden shadow-2xl flex flex-col md:flex-row max-h-[90vh]"
          >
            {/* Close Button */}
            <button
              onClick={onClose}
              className="absolute top-6 right-6 z-10 w-12 h-12 rounded-full bg-background/20 backdrop-blur-md border border-white/10 flex items-center justify-center text-white hover:bg-primary hover:border-primary transition-all duration-300 shadow-xl"
            >
              <X size={24} />
            </button>

            {/* Left: Image Section */}
            <div className="md:w-1/2 relative h-64 md:h-auto overflow-hidden">
              <AnimatePresence mode="wait">
                <motion.div
                  key={project.id}
                  initial={{ opacity: 0, scale: 1.1 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 1.1 }}
                  transition={{ duration: 0.6 }}
                  className="absolute inset-0"
                >
                  <Image
                    src={project.image}
                    alt={project.title}
                    fill
                    className="object-cover"
                  />
                </motion.div>
              </AnimatePresence>
              <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent opacity-60" />
            </div>

            {/* Right: Info Section */}
            <div className="md:w-1/2 p-8 md:p-12 overflow-y-auto custom-scrollbar bg-card">
              <AnimatePresence mode="wait">
                <motion.div
                  key={project.id}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.4 }}
                >
                  <div className="mb-8">
                    <span className="text-primary font-black tracking-[0.4em] uppercase text-[10px] mb-2 block">
                      {project.category}
                    </span>
                    <h2 className="text-3xl md:text-4xl font-black tracking-tighter text-foreground mb-4">
                      {project.title}
                    </h2>
                    <p className="text-muted-foreground leading-relaxed">
                      {project.description}
                    </p>
                  </div>

                  {/* Tech Stack */}
                  <div className="mb-8">
                    <div className="flex items-center gap-2 mb-4 text-primary">
                      <Cpu size={18} />
                      <span className="font-bold uppercase tracking-widest text-[10px]">Technology Stack</span>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {project.techStack.map((tech) => (
                        <span
                          key={tech}
                          className="px-4 py-2 rounded-full bg-primary/5 border border-primary/10 text-[11px] font-bold text-foreground"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Key Features */}
                  <div className="mb-10">
                    <div className="flex items-center gap-2 mb-4 text-primary">
                      <CheckCircle2 size={18} />
                      <span className="font-bold uppercase tracking-widest text-[10px]">Key Features</span>
                    </div>
                    <ul className="grid grid-cols-1 gap-3">
                      {project.features.map((feature) => (
                        <li key={feature} className="flex items-center gap-3 text-sm text-muted-foreground">
                          <div className="w-1.5 h-1.5 rounded-full bg-primary flex-shrink-0" />
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Related Projects */}
                  {relatedProjects.length > 0 && (
                    <div className="mb-10 pt-10 border-t border-primary/10">
                      <div className="flex items-center justify-between mb-6">
                        <span className="font-bold uppercase tracking-widest text-[10px] text-primary">Discover More in {project.category}</span>
                      </div>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        {relatedProjects.map((rel) => (
                          <button
                            key={rel.id}
                            onClick={() => onProjectChange(rel)}
                            className="group flex items-center gap-4 p-3 rounded-2xl bg-background/40 border border-white/5 hover:border-primary/30 hover:bg-primary/5 transition-all text-left"
                          >
                            <div className="relative w-16 h-16 rounded-xl overflow-hidden flex-shrink-0">
                              <Image src={rel.image} alt={rel.title} fill className="object-cover group-hover:scale-110 transition-transform duration-500" />
                            </div>
                            <div className="min-w-0">
                              <h4 className="text-sm font-bold truncate text-foreground group-hover:text-primary transition-colors">{rel.title}</h4>
                              <span className="text-[9px] uppercase tracking-widest text-muted-foreground">View Project</span>
                            </div>
                          </button>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Action Button */}
                  <div className="flex items-center gap-6 pt-6">
                    <MagneticButton>
                      <a
                        href={project.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="h-16 px-10 rounded-full bg-primary text-white font-black uppercase tracking-widest text-xs flex items-center justify-center gap-3 shadow-[0_20px_40px_rgba(0,159,227,0.3)] hover:shadow-[0_30px_60px_rgba(0,159,227,0.5)] transition-all hover:-translate-y-1 active:translate-y-0"
                      >
                        Launch Project
                        <ExternalLink size={18} />
                      </a>
                    </MagneticButton>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
