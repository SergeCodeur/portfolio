// components/process-orbital.tsx
"use client";

import { AnimatePresence, motion } from "framer-motion";
import {
  ArrowRight,
  Code,
  DollarSign,
  Palette,
  Phone,
  Rocket,
} from "lucide-react";
import { useState } from "react";

interface Step {
  number: number;
  icon: React.ElementType;
  title: string;
  duration: string;
  detail?: string;
  description: string;
}

const steps: Step[] = [
  {
    number: 1,
    icon: Phone,
    title: "Découverte",
    duration: "30 min",
    detail: "Gratuit",
    description:
      "Premier échange pour aligner la vision technique avec vos objectifs business.",
  },
  {
    number: 2,
    icon: DollarSign,
    title: "Validation",
    duration: "48h",
    description:
      "Devis détaillé, choix de la stack technique et planning prévisionnel.",
  },
  {
    number: 3,
    icon: Palette,
    title: "Design",
    duration: "Sprint 1",
    detail: "Figma",
    description:
      "Conception des interfaces. On ne code rien tant que le design n'est pas validé.",
  },
  {
    number: 4,
    icon: Code,
    title: "Development",
    duration: "Sprint 2-3",
    detail: "Agile",
    description:
      "Développement React/Next.js. Code propre, modulaire et optimisé SEO.",
  },
  {
    number: 5,
    icon: Rocket,
    title: "Lancement",
    duration: "Jour J",
    detail: "Support",
    description:
      "Mise en production, configuration domaine/SSL et formation admin.",
  },
];

const ProcessOrbital = () => {
  const [active, setActive] = useState(0);
  const totalSteps = steps.length;

  // Fonction pour passer à l'étape suivante
  const handleNext = () => {
    setActive((prev) => (prev + 1) % totalSteps);
  };

  // Rayon du cercle (Correspond à la moitié de w-[500px] soit 250px)
  const radius = 250;

  // Calcul de la rotation pour amener l'élément actif à -90deg (Midi / Haut du cercle)
  // On décale de -90deg car par défaut 0deg est à droite (3h)
  const baseRotation = -90;
  const stepAngle = 360 / totalSteps;
  const rotation = baseRotation - active * stepAngle;

  return (
    <section className="w-full bg-[#050816] py-20 md:py-32 px-6 overflow-hidden min-h-[800px] flex items-center justify-center relative">
      {/* Background Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#FDFD96] opacity-[0.03] blur-[100px] rounded-full pointer-events-none" />

      <div className="relative w-full max-w-6xl mx-auto flex flex-col lg:flex-row items-center justify-center gap-12 lg:gap-24">
        {/* --- ORBITAL SYSTEM --- */}
        {/* On utilise scale pour réduire proportionnellement sur mobile sans casser les calculs de pixels */}
        <div className="relative w-[500px] h-[500px] shrink-0 scale-[0.65] md:scale-90 lg:scale-100 transition-transform duration-500">
          {/* Anneau décoratif principal (Correspond au rayon des items) */}
          <div className="absolute inset-0 rounded-full border border-white/5" />

          {/* Anneau intérieur pointillé */}
          <div className="absolute inset-[25%] rounded-full border border-white/5 border-dashed animate-[spin_60s_linear_infinite]" />

          {/* ROTATING CONTAINER */}
          <motion.div
            className="absolute inset-0 rounded-full"
            animate={{ rotate: rotation }}
            transition={{ type: "spring", stiffness: 50, damping: 20 }}
          >
            {steps.map((step, index) => {
              // Calcul de l'angle initial de chaque élément
              const angle = index * stepAngle;
              // Angle final après rotation du conteneur
              const finalAngle = angle + rotation;
              // Position X et Y sur le cercle
              const x = Math.cos((finalAngle * Math.PI) / 180) * radius;
              const y = Math.sin((finalAngle * Math.PI) / 180) * radius;

              return (
                <motion.div
                  key={step.number}
                  className="absolute top-1/2 left-1/2 w-24 h-24 -ml-12 -mt-12 flex items-center justify-center rounded-full cursor-pointer"
                  animate={{
                    x: x,
                    y: y,
                    rotate: -rotation,
                  }}
                  transition={{ type: "spring", stiffness: 50, damping: 20 }}
                  onClick={() => setActive(index)}
                >
                  {/* Le cercle de l'étape */}
                  <div
                    className={`relative w-full h-full rounded-full border-2 flex items-center justify-center transition-all duration-300 bg-[#050816] ${
                      active === index
                        ? "border-[#FDFD96] shadow-[0_0_30px_rgba(253,253,150,0.3)] scale-110"
                        : "border-white/10 hover:border-white/30 hover:bg-white/5"
                    }`}
                  >
                    <step.icon
                      className={`w-8 h-8 transition-colors duration-300 ${
                        active === index ? "text-[#FDFD96]" : "text-gray-500"
                      }`}
                    />

                    {/* Badge Numéro */}
                    <div className="absolute -top-1 -right-1 w-7 h-7 rounded-full bg-[#1c2230] border border-white/20 flex items-center justify-center text-xs font-bold text-white z-10">
                      {step.number}
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </motion.div>

          {/* CENTER CORE (Titre de la phase active) */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <AnimatePresence mode="wait">
              <motion.div
                key={active}
                initial={{ opacity: 0, scale: 0.8, filter: "blur(10px)" }}
                animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
                exit={{ opacity: 0, scale: 0.8, filter: "blur(10px)" }}
                transition={{ duration: 0.3 }}
                className="text-center z-10"
              >
                <h3 className="text-8xl font-black font-syne text-transparent bg-clip-text bg-linear-to-b from-white to-white/10 select-none">
                  0{steps[active].number}
                </h3>
                <p className="text-[#FDFD96] text-sm uppercase tracking-[0.3em] font-bold mt-2">
                  Phase
                </p>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        {/* --- CONTENT PANEL (Right side) --- */}
        <div className="flex-1 max-w-md relative min-h-[300px] z-20">
          <AnimatePresence mode="wait">
            <motion.div
              key={active}
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -30 }}
              transition={{ duration: 0.4, ease: "easeOut" }}
              className="flex flex-col justify-center h-full"
            >
              {/* Top Meta Data */}
              <div className="flex items-center gap-4 mb-8">
                <div className="h-[2px] w-12 bg-[#FDFD96]" />
                <span className="text-[#FDFD96] text-sm font-bold uppercase tracking-widest">
                  {steps[active].duration}
                </span>
              </div>

              {/* Title */}
              <h2 className="text-5xl md:text-6xl font-bold text-white font-syne mb-6 leading-[1.1]">
                {steps[active].title}
              </h2>

              {/* Description */}
              <p className="text-lg text-gray-400 leading-relaxed mb-10">
                {steps[active].description}
              </p>

              {/* Footer Actions */}
              <div className="flex items-center gap-6">
                {steps[active].detail && (
                  <div className="px-5 py-3 rounded-xl bg-white/5 border border-white/10 text-sm text-gray-300">
                    Inclus :{" "}
                    <span className="text-white font-bold ml-1">
                      {steps[active].detail}
                    </span>
                  </div>
                )}

                {/* Bouton Next Actif */}
                <button
                  onClick={handleNext}
                  className="w-14 h-14 rounded-full bg-[#FDFD96] flex items-center justify-center hover:scale-110 hover:shadow-[0_0_20px_rgba(253,253,150,0.5)] transition-all duration-300 cursor-pointer group"
                  aria-label="Étape suivante"
                >
                  <ArrowRight className="w-6 h-6 text-black group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Mobile Navigation Dots */}
          <div className="absolute -bottom-12 lg:bottom-0 lg:-left-12 flex lg:flex-col gap-3">
            {steps.map((_, i) => (
              <button
                key={i}
                onClick={() => setActive(i)}
                className={`rounded-full transition-all duration-300 ${
                  active === i
                    ? "w-8 h-1.5 lg:w-1.5 lg:h-8 bg-[#FDFD96]"
                    : "w-2 h-2 bg-white/20 hover:bg-white/40"
                }`}
                aria-label={`Aller à l'étape ${i + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProcessOrbital;
