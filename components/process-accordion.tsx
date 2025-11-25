// components/process-accordion.tsx
"use client";

import { AnimatePresence, motion } from "framer-motion";
import {
  Code,
  DollarSign,
  Minus,
  Palette,
  Phone,
  Plus,
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
      "Appel visio pour comprendre votre vision, vos objectifs business et définir le périmètre technique du projet.",
  },
  {
    number: 2,
    icon: DollarSign,
    title: "Devis & Stratégie",
    duration: "48h max",
    description:
      "Envoi d'une proposition commerciale détaillée incluant le budget fixe, la stack technique et le planning prévisionnel.",
  },
  {
    number: 3,
    icon: Palette,
    title: "Design UI/UX",
    duration: "1-2 semaines",
    detail: "Figma",
    description:
      "Création des maquettes interactives haute-fidélité. Nous itérons jusqu'à ce que le design valide parfaitement votre vision.",
  },
  {
    number: 4,
    icon: Code,
    title: "Développement",
    duration: "Sprint Agile",
    detail: "Updates hebdo",
    description:
      "Codage de l'application avec les meilleures pratiques (Clean Code). Tests unitaires et intégration continue.",
  },
  {
    number: 5,
    icon: Rocket,
    title: "Livraison & Support",
    duration: "Jour J",
    detail: "+60j Support",
    description:
      "Mise en ligne, formation de vos équipes à l'outil d'administration et garantie de fonctionnement.",
  },
];

const ProcessAccordion = () => {
  const [activeStep, setActiveStep] = useState<number>(1);

  return (
    <section className="w-full bg-[#050816] py-32 px-6 md:px-20 relative">
      <div className="max-w-5xl mx-auto">
        <div className="mb-20">
          <h2 className="text-4xl md:text-6xl font-bold text-white mb-6 font-syne">
            Processus <span className="text-[#FDFD96]">Créatif</span>
          </h2>
        </div>

        <div className="flex flex-col">
          {steps.map((step) => (
            <div
              key={step.number}
              onMouseEnter={() => setActiveStep(step.number)}
              className={`group border-t border-white/10 py-8 md:py-12 cursor-pointer transition-all duration-500 ${
                activeStep === step.number
                  ? "opacity-100"
                  : "opacity-40 hover:opacity-70"
              }`}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-6 md:gap-12">
                  <span className="text-3xl md:text-5xl font-syne font-bold text-transparent bg-clip-text bg-linear-to-r from-white to-white/50 w-16">
                    0{step.number}
                  </span>
                  <h3 className="text-2xl md:text-4xl font-bold text-white font-syne">
                    {step.title}
                  </h3>
                </div>

                {/* Icon indicator */}
                <div
                  className={`p-3 rounded-full border border-white/10 transition-colors duration-300 ${
                    activeStep === step.number
                      ? "bg-[#FDFD96] text-black"
                      : "text-white"
                  }`}
                >
                  {activeStep === step.number ? (
                    <Minus className="w-6 h-6" />
                  ) : (
                    <Plus className="w-6 h-6" />
                  )}
                </div>
              </div>

              <AnimatePresence>
                {activeStep === step.number && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{
                      duration: 0.4,
                      ease: [0.04, 0.62, 0.23, 0.98],
                    }}
                    className="overflow-hidden"
                  >
                    <div className="pt-8 md:pl-28 flex flex-col md:flex-row gap-8 md:gap-16 items-start">
                      <p className="text-lg text-gray-400 max-w-lg leading-relaxed">
                        {step.description}
                      </p>

                      <div className="flex gap-6">
                        <div className="bg-white/5 border border-white/10 rounded-xl p-4 min-w-[140px]">
                          <div className="text-[#FDFD96] mb-2">
                            <step.icon className="w-6 h-6" />
                          </div>
                          <p className="text-xs text-gray-500 uppercase tracking-wider mb-1">
                            Durée
                          </p>
                          <p className="text-white font-bold">
                            {step.duration}
                          </p>
                        </div>

                        {step.detail && (
                          <div className="bg-white/5 border border-white/10 rounded-xl p-4 min-w-[140px]">
                            <div className="text-[#FDFD96] mb-2">
                              <Rocket className="w-6 h-6" />
                            </div>
                            <p className="text-xs text-gray-500 uppercase tracking-wider mb-1">
                              Inclus
                            </p>
                            <p className="text-white font-bold">
                              {step.detail}
                            </p>
                          </div>
                        )}
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
          {/* Border bottom for last item */}
          <div className="border-t border-white/10" />
        </div>
      </div>
    </section>
  );
};

export default ProcessAccordion;
