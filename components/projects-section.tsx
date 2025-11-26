"use client";
import { motion, useScroll } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRef } from "react";
import { Card } from "./card";

const projects = [
  {
    title: "Dashboard Agence",
    description:
      "Une interface de gestion complète pour agences digitales, intégrant analytique temps réel et gestion d'équipe automatisée.",
    src: "/projets.jpg",
    link: "https://www.google.com",
    color: "#EFECEC",
  },
  {
    title: "E-commerce Luxe",
    description:
      "Expérience d'achat immersive pour une marque de haute couture. Architecture Headless Shopify + Next.js pour une rapidité extrême.",
    src: "/projets.jpg",
    link: "https://www.google.com",
    color: "#C6C4BD",
  },
  {
    title: "CRM Immobilier",
    description:
      "Plateforme SaaS B2B révolutionnant la gestion de biens. Cartographie interactive et matching IA pour les agents.",
    src: "/projets.jpg",
    link: "https://www.google.com",
    color: "#A3A3A3",
  },
  {
    title: "Crypto Tracker",
    description:
      "Application Fintech temps réel. Websockets pour les cours, graphiques SVG animés et sécurité bancaire.",
    src: "/projets.jpg",
    link: "https://www.google.com",
    color: "#2C2C2C",
  },
];

const ProjectsSection = () => {
  const container = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: container as React.RefObject<HTMLDivElement>,
    offset: ["start start", "end end"],
  });

  return (
    <section
      id="projects"
      ref={container}
      className="relative bg-[#050816] px-4 md:px-0"
    >
      {/* Mobile Header - Not Sticky */}
      <div className="md:hidden py-12 px-4">
        <div className="text-center w-full max-w-full">
          <h2 className="text-4xl sm:text-5xl font-black tracking-tighter text-white font-syne leading-[0.95] uppercase mb-2">
            Projets
          </h2>
          <h2 className="text-4xl sm:text-5xl font-black tracking-tighter text-accent font-syne leading-[0.95] uppercase">
            Phares
          </h2>
        </div>
      </div>

      {/* Desktop Header - Sticky */}
      <div className="hidden md:flex h-[40vh] sm:h-[45vh] md:h-[50vh] items-center justify-center sticky top-0 z-0 px-4 overflow-hidden">
        <div className="text-center w-full max-w-full">
          {/* Ligne 1 : Arrière-plan */}
          <h2 className="text-[10vw] sm:text-[9vw] md:text-[8vw] lg:text-[11vw] font-black tracking-tighter text-white font-syne leading-[0.95] uppercase opacity-20 select-none wrap-break-word">
            Projets
          </h2>
          {/* Ligne 2 : Premier plan avec effet overlay */}
          <h2 className="text-[10vw] sm:text-[9vw] md:text-[8vw] lg:text-[11vw] font-black tracking-tighter text-accent font-syne leading-[0.95] uppercase relative -mt-1 sm:-mt-2 md:-mt-4 lg:-mt-8 z-10 mix-blend-overlay wrap-break-word">
            Phares
          </h2>
        </div>
      </div>

      {/* Mobile Layout - Vertical Stack */}
      <div className="md:hidden relative z-10 py-12 px-4">
        <div className="max-w-2xl mx-auto flex flex-col gap-8 sm:gap-10">
          {projects.map((project, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{
                duration: 0.6,
                ease: [0.43, 0, 0.17, 1],
                delay: i * 0.15,
              }}
              style={{ backgroundColor: project.color }}
              className="flex flex-col relative h-auto min-h-[400px] sm:min-h-[450px] w-full rounded-[20px] sm:rounded-[25px] p-6 sm:p-8 border border-white/10 shadow-2xl overflow-hidden"
            >
              <div className="flex h-full gap-6 sm:gap-8 flex-col">
                {/* Contenu Texte */}
                <div className="relative z-10 flex flex-col justify-between flex-1">
                  <div>
                    <h2 className="text-2xl sm:text-3xl font-bold font-syne text-[#050816] mb-3 sm:mb-4 leading-tight">
                      {project.title}
                    </h2>
                    <p className="text-sm sm:text-base text-[#050816]/70 font-sans leading-relaxed">
                      {project.description}
                    </p>
                  </div>

                  <div className="flex items-center gap-4 mt-6 sm:mt-8">
                    <Link
                      href={project.link}
                      className="flex items-center gap-2 text-[#050816] font-bold uppercase tracking-widest text-xs sm:text-sm border-b border-[#050816] pb-1 cursor-pointer hover:opacity-70 transition-opacity"
                    >
                      Voir le projet
                      <ArrowUpRight className="w-3 h-3 sm:w-4 sm:h-4" />
                    </Link>
                  </div>
                </div>

                {/* Contenu Image */}
                <div className="relative w-full h-[200px] sm:h-[250px] rounded-xl sm:rounded-2xl overflow-hidden shadow-inner">
                  <div className="w-full h-full relative">
                    <Image
                      fill
                      src={project.src}
                      alt={project.title}
                      className="object-cover"
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
              key={i}
              i={i}
              {...project}
              url={project.link}
              progress={scrollYProgress}
              range={[i * 0.25, 1]}
              targetScale={targetScale}
            />
          );
        })}
      </div>
    </section>
  );
};

export default ProjectsSection;
