"use client";
import { useScroll } from "framer-motion";
import { useRef } from "react";
import { Card } from "./card";

const projects = [
  {
    title: "Dashboard Agence",
    description:
      "Une interface de gestion complète pour agences digitales, intégrant analytique temps réel et gestion d'équipe automatisée.",
    src: "/project1.jpg", // Remplacez par vos images
    link: "https://www.google.com",
    color: "#EFECEC", // Gris très clair/Blanc cassé
  },
  {
    title: "E-commerce Luxe",
    description:
      "Expérience d'achat immersive pour une marque de haute couture. Architecture Headless Shopify + Next.js pour une rapidité extrême.",
    src: "/project2.jpg",
    link: "https://www.google.com",
    color: "#C6C4BD", // Beige/Taupe élégant
  },
  {
    title: "CRM Immobilier",
    description:
      "Plateforme SaaS B2B révolutionnant la gestion de biens. Cartographie interactive et matching IA pour les agents.",
    src: "/project3.jpg",
    link: "https://www.google.com",
    color: "#A3A3A3", // Gris moyen
  },
  {
    title: "Crypto Tracker",
    description:
      "Application Fintech temps réel. Websockets pour les cours, graphiques SVG animés et sécurité bancaire.",
    src: "/project4.jpg",
    link: "https://www.google.com",
    color: "#2C2C2C", // Gris très foncé (texte deviendra blanc via CSS conditionnel si besoin, ou garder noir sur fond sombre pour style brutaliste)
  },
];

const ProjectsSection = () => {
  const container = useRef<HTMLDivElement>(null);

  // On track le scroll global du conteneur
  const { scrollYProgress } = useScroll({
    target: container as React.RefObject<HTMLDivElement>,
    offset: ["start start", "end end"],
  });

  return (
    // Le conteneur principal a une couleur de fond qui contraste avec les cartes
    <section ref={container} className="relative bg-[#050816] px-4 md:px-0">
      {/* Introduction Section */}
      <div className="h-[50vh] flex items-center justify-center sticky top-0 z-0">
        <div className="text-center">
          <h2 className="text-[10vw] font-black text-white font-syne leading-[0.8] uppercase opacity-20">
            Selected
          </h2>
          <h2 className="text-[10vw] font-black text-[#FDFD96] font-syne leading-[0.8] uppercase relative -mt-4 z-10 mix-blend-overlay">
            Works
          </h2>
        </div>
      </div>

      {/* La boucle des cartes */}
      <div className="relative z-10 pb-[20vh]">
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
