// components/process-expandable.tsx
"use client";

import { motion } from "framer-motion";
import { Code, DollarSign, Palette, Phone, Rocket } from "lucide-react";
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
    description: "Analyse approfondie de vos besoins.",
  },
  {
    number: 2,
    icon: DollarSign,
    title: "Devis",
    duration: "48h max",
    description: "Proposition détaillée et chiffrée.",
  },
  {
    number: 3,
    icon: Palette,
    title: "Design",
    duration: "1-2 sem.",
    detail: "Figma",
    description: "Maquettes UI/UX interactives.",
  },
  {
    number: 4,
    icon: Code,
    title: "Dev",
    duration: "Sprint",
    detail: "Agile",
    description: "Développement Next.js performant.",
  },
  {
    number: 5,
    icon: Rocket,
    title: "Livraison",
    duration: "Jour J",
    detail: "Support",
    description: "Déploiement et formation.",
  },
];

const ProcessExpandable = () => {
  const [active, setActive] = useState<number>(1);

  return (
    <section className="w-full bg-[#050816] py-32 px-6 md:px-20 overflow-hidden">
      <div className="max-w-[1400px] mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-6xl font-bold text-white font-syne">
            Workflow
          </h2>
        </div>

        {/* Container Flex */}
        <div className="flex flex-col md:flex-row gap-4 h-[600px] md:h-[500px]">
          {steps.map((step) => {
            const isActive = active === step.number;
            return (
              <motion.div
                key={step.number}
                onMouseEnter={() => setActive(step.number)}
                layout
                className={`relative rounded-3xl overflow-hidden cursor-pointer border border-white/10 transition-all duration-500 ease-out ${
                  isActive
                    ? "flex-3 bg-white/5"
                    : "flex-1 bg-[#0A0F1E] hover:bg-white/5"
                }`}
              >
                {/* Background Number (Decorative) */}
                <div className="absolute -bottom-10 -right-10 text-[10rem] font-black text-white/5 font-syne select-none pointer-events-none">
                  {step.number}
                </div>

                <div className="h-full flex flex-col justify-between p-8 relative z-10">
                  {/* Top: Icon & Number */}
                  <div className="flex justify-between items-start">
                    <div
                      className={`w-12 h-12 rounded-full flex items-center justify-center text-lg font-bold transition-colors duration-300 ${
                        isActive
                          ? "bg-[#FDFD96] text-black"
                          : "bg-white/10 text-white"
                      }`}
                    >
                      {step.number}
                    </div>
                    {isActive && (
                      <motion.div
                        initial={{ opacity: 0, scale: 0 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="p-2 bg-white/10 rounded-lg text-[#FDFD96]"
                      >
                        <step.icon size={24} />
                      </motion.div>
                    )}
                  </div>

                  {/* Middle: Content (Only visible when active) */}
                  <div className="grow flex flex-col justify-center">
                    {isActive ? (
                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                      >
                        <h3 className="text-3xl md:text-4xl font-bold text-white font-syne mb-4">
                          {step.title}
                        </h3>
                        <p className="text-lg text-gray-400 max-w-sm">
                          {step.description}
                        </p>

                        <div className="mt-8 flex gap-4">
                          <div className="px-4 py-2 rounded-full border border-white/20 text-sm text-white">
                            ⏱ {step.duration}
                          </div>
                          {step.detail && (
                            <div className="px-4 py-2 rounded-full border border-white/20 text-sm text-[#FDFD96]">
                              ★ {step.detail}
                            </div>
                          )}
                        </div>
                      </motion.div>
                    ) : (
                      // Rotated Text for inactive state (Vertical text)
                      <div className="absolute bottom-8 left-8 origin-bottom-left -rotate-90 translate-x-full w-[300px]">
                        <span className="text-xl font-bold text-gray-500 whitespace-nowrap">
                          {step.title}
                        </span>
                      </div>
                    )}
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default ProcessExpandable;
