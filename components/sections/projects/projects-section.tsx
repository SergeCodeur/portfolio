"use client";
import { Card } from "@/components/ui/project-card";
import { motion, useScroll } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRef } from "react";
import type { ProjectData } from "@/types";

interface ProjectsSectionProps {
  projects: ProjectData[];
}

const ProjectsSection = ({ projects }: ProjectsSectionProps) => {
  const container = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: container as React.RefObject<HTMLDivElement>,
    offset: ["start start", "end end"],
  });

  return (
    <section
      id="projects"
      ref={container}
      className="relative bg-background px-4 md:px-0"
    >
      {/* Mobile Header - Not Sticky */}
      <div className="md:hidden py-12 px-4">
        <div className="text-center w-full max-w-full">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center w-full max-w-full"
          >
            <h2 className="text-4xl sm:text-5xl font-black tracking-tighter text-foreground font-syne leading-[0.95] uppercase mb-2">
              Projets
            </h2>
            <h2 className="text-4xl sm:text-5xl font-black tracking-tighter text-accent font-syne leading-[0.95] uppercase">
              Phares
            </h2>
          </motion.div>
        </div>
      </div>

      {/* Desktop Header - Sticky */}
      <div className="hidden md:flex min-h-[50vh] items-center justify-center sticky top-0 z-0 px-4 overflow-hidden">
        <div className="text-center w-full max-w-full">
          {/* Ligne 1 : Arrière-plan */}
          <h2
            className="font-black tracking-tighter text-white font-syne leading-[0.95] uppercase opacity-20 select-none"
            style={{ fontSize: "clamp(3rem, 10vw, 11rem)" }}
          >
            Projets
          </h2>
          {/* Ligne 2 : Premier plan avec effet overlay */}
          <h2
            className="font-black tracking-tighter text-accent font-syne leading-[0.95] uppercase relative z-10 mix-blend-overlay"
            style={{
              fontSize: "clamp(3rem, 10vw, 11rem)",
              marginTop: "clamp(-0.5rem, -1vw, -2rem)",
            }}
          >
            Phares
          </h2>
        </div>
      </div>

      {/* Mobile Layout - Vertical Stack */}
      <div className="md:hidden relative z-10 py-12 px-4">
        <div className="max-w-2xl mx-auto flex flex-col gap-8 sm:gap-10">
          {projects.map((project, i) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{
                duration: 0.6,
                ease: [0.43, 0, 0.17, 1],
                delay: i * 0.15,
              }}
              style={{ backgroundColor: project.color }}
              className="flex flex-col relative h-auto min-h-[380px] min-[375px]:min-h-[400px] sm:min-h-[450px] w-full rounded-[20px] sm:rounded-[25px] p-6 sm:p-8 border border-white/10 shadow-2xl overflow-hidden"
            >
              <div className="flex h-full gap-5 min-[375px]:gap-6 sm:gap-8 flex-col">
                {/* Contenu Texte */}
                <div className="relative z-10 flex flex-col justify-between flex-1">
                  <div>
                    <h2
                      style={{ color: project.textColor }}
                      className="text-2xl sm:text-3xl font-bold font-syne mb-3 sm:mb-4 leading-tight"
                    >
                      {project.title}
                    </h2>
                    <p
                      style={{ color: project.textColor }}
                      className="text-sm sm:text-base font-sans leading-relaxed opacity-70"
                    >
                      {project.description}
                    </p>
                  </div>

                  <div className="flex items-center gap-4 mt-5 min-[375px]:mt-6 sm:mt-8">
                    <Link
                      href={project.link}
                      style={{
                        color: project.textColor,
                        borderColor: project.textColor,
                      }}
                      className="flex items-center gap-2 font-bold uppercase tracking-widest text-xs sm:text-sm border-b pb-1 cursor-pointer hover:opacity-70 transition-opacity"
                    >
                      Voir le projet
                      <ArrowUpRight className="w-3 h-3 sm:w-4 sm:h-4" />
                    </Link>
                  </div>
                </div>

                {/* Contenu Image */}
                <div className="relative w-full h-[120px] min-[375px]:h-[153px] min-[425px]:h-[180px] sm:h-80 rounded-xl sm:rounded-2xl overflow-hidden shadow-inner">
                  <div className="w-full h-full relative">
                    <Image
                      fill
                      src={project.imagePath}
                      alt={project.title}
                      className="object-contain"
                    />
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Desktop Layout - Horizontal Scroll with Stack Effect */}
      <div className="hidden md:block relative z-10 pb-[20vh]">
        {projects.map((project, i) => {
          const targetScale = 1 - (projects.length - i) * 0.05;
          return (
            <Card
              key={project.id}
              i={i}
              title={project.title}
              description={project.description}
              src={project.imagePath}
              url={project.link}
              color={project.color}
              textColor={project.textColor}
              progress={scrollYProgress}
              range={[i / projects.length, 1]}
              targetScale={targetScale}
            />
          );
        })}
      </div>
    </section>
  );
};

export default ProjectsSection;
