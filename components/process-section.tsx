// components/process-section.tsx
"use client";
import { motion, useScroll } from "framer-motion";
import { Code, DollarSign, Palette, Phone, Rocket } from "lucide-react";
import { useRef } from "react";

const ProcessSection = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef as React.RefObject<HTMLDivElement>,
    offset: ["start center", "end center"],
  });

  const steps = [
    {
      number: 1,
      icon: Phone,
      title: "Découverte",
      duration: "30 min",
      detail: "Gratuit",
      description: "Appel pour comprendre votre vision et vos objectifs",
    },
    {
      number: 2,
      icon: DollarSign,
      title: "Devis & Validation",
      duration: "48h max",
      description: "Proposition détaillée avec prix fixe et timeline",
    },
    {
      number: 3,
      icon: Palette,
      title: "Conception Design",
      duration: "1-2 semaines",
      detail: "Figma + Révisions",
      description: "Maquettes interactives avant tout développement",
    },
    {
      number: 4,
      icon: Code,
      title: "Développement",
      duration: "Selon projet",
      detail: "Updates hebdo",
      description: "Code propre, tests rigoureux, déploiement continu",
    },
    {
      number: 5,
      icon: Rocket,
      title: "Livraison",
      duration: "1 jour",
      detail: "Support inclus",
      description: "Documentation complète + 60j support",
    },
  ];

  return (
    <section
      ref={containerRef}
      className="w-full bg-[#050816] py-32 px-6 md:px-20 relative overflow-hidden"
    >
      <div className="max-w-[1280px] mx-auto relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-24"
        >
          <h2 className="text-4xl md:text-6xl font-bold text-white mb-6 font-syne">
            Comment je travaille <br />
            <span className="text-[#FDFD96]">avec vous</span>
          </h2>
          <p className="text-lg text-gray-400 font-sans max-w-2xl mx-auto">
            Un processus éprouvé, des résultats garantis
          </p>
        </motion.div>

        {/* Desktop Timeline */}
        <div className="hidden md:block relative">
          {/* Animated Line */}
          <div className="absolute top-[36px] left-0 right-0 h-0.5 bg-white/10">
            <motion.div
              style={{ scaleX: scrollYProgress, transformOrigin: "left" }}
              className="h-full bg-[#FDFD96]"
            />
          </div>

          <div className="relative flex justify-between">
            {steps.map((step, index) => {
              const Icon = step.icon;
              return (
                <div
                  key={step.number}
                  className="flex flex-col items-center flex-1 relative group"
                >
                  {/* Node */}
                  <motion.div
                    initial={{ scale: 0, opacity: 0 }}
                    whileInView={{ scale: 1, opacity: 1 }}
                    transition={{ delay: index * 0.2 }}
                    viewport={{ once: true }}
                    className="relative z-10 w-[72px] h-[72px] rounded-full bg-[#050816] border-[3px] border-[#FDFD96] flex items-center justify-center group-hover:scale-110 group-hover:shadow-[0_0_30px_rgba(253,253,150,0.3)] transition-all duration-500"
                  >
                    <span className="text-3xl font-bold text-white font-syne">
                      {step.number}
                    </span>
                  </motion.div>

                  {/* Card */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.2 + 0.2 }}
                    viewport={{ once: true }}
                    className="mt-8 w-[220px] bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10 hover:border-[#FDFD96]/50 transition-colors duration-300"
                  >
                    <div className="flex justify-center mb-4">
                      <div className="p-3 rounded-lg bg-white/5 text-[#FDFD96]">
                        <Icon className="w-6 h-6" />
                      </div>
                    </div>
                    <h3 className="text-xl font-bold text-white text-center mb-2 font-syne">
                      {step.title}
                    </h3>
                    <div className="flex justify-center gap-2 text-xs mb-3">
                      <span className="font-bold text-[#FDFD96]">
                        {step.duration}
                      </span>
                      {step.detail && (
                        <span className="text-gray-400">• {step.detail}</span>
                      )}
                    </div>
                    <p className="text-sm text-gray-400 text-center leading-relaxed">
                      {step.description}
                    </p>
                  </motion.div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Mobile Timeline (Simplified for brevity, keep your mobile logic here if needed) */}
        <div className="md:hidden space-y-8 relative pl-8 border-l border-white/10 ml-4">
          {steps.map((step, index) => {
            const Icon = step.icon;
            return (
              <div key={index} className="relative">
                <div className="absolute -left-[41px] top-0 w-5 h-5 rounded-full bg-[#FDFD96] border-4 border-[#050816]" />
                <div className="bg-white/5 p-6 rounded-xl border border-white/10">
                  <div className="flex items-center gap-3 mb-2">
                    <Icon className="w-5 h-5 text-[#FDFD96]" />
                    <h3 className="text-xl font-bold text-white">
                      {step.title}
                    </h3>
                  </div>
                  <p className="text-sm text-gray-400">{step.description}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default ProcessSection;
