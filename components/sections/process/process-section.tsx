"use client";

import { AnimatePresence, motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { useState } from "react";
import { getIcon } from "@/lib/icons";
import type { ProcessStepData } from "@/types";

interface ProcessSectionProps {
  steps: ProcessStepData[];
}

const ProcessSection = ({ steps }: ProcessSectionProps) => {
  const [active, setActive] = useState(0);
  const totalSteps = steps.length;

  const handleNext = () => {
    setActive((prev) => (prev + 1) % totalSteps);
  };

  const radius = 250;

  const baseRotation = -90;
  const stepAngle = 360 / totalSteps;
  const rotation = baseRotation - active * stepAngle;

  if (steps.length === 0) return null;

  return (
    <section
      id="process"
      className="w-full bg-background py-12 sm:py-16 md:py-20 lg:py-32 px-4 sm:px-6 overflow-hidden min-h-[600px] sm:min-h-[700px] md:min-h-[800px] flex items-center justify-center relative"
    >
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#FDFD96] opacity-[0.03] blur-[100px] rounded-full pointer-events-none" />

      <div className="relative w-full max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="text-center mb-8 sm:mb-12 md:mb-16 lg:mb-24"
        >
          <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-8xl font-black tracking-tighter text-foreground mb-4 sm:mb-6 font-syne">
            Mon <br />
            <span className="text-accent">Process.</span>
          </h2>
          <p className="text-base sm:text-lg md:text-xl text-gray-400 font-sans max-w-md mx-auto px-4">
            De la première idée au lancement, vous savez exactement où vous en
            êtes. Pas de surprise, que des résultats.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="flex flex-col lg:flex-row items-center justify-center gap-8 sm:gap-10 md:gap-12 lg:gap-24"
        >
          {/* --- ORBITAL SYSTEM --- */}
          <div className="relative w-[250px] h-[250px] sm:w-[300px] sm:h-[300px] md:w-[375px] md:h-[375px] lg:w-[500px] lg:h-[500px] shrink-0">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] scale-[0.5] sm:scale-[0.6] md:scale-[0.75] lg:scale-100 transition-transform duration-500 origin-center">
              {/* Anneau décoratif principal */}
              <div className="absolute inset-0 rounded-full border border-white/5" />

              {/* Anneau intérieur pointillé */}
              <div className="absolute inset-[25%] rounded-full border border-white/5 border-dashed animate-[spin_60s_linear_infinite]" />

              {/* ROTATING CONTAINER */}
              <motion.div
                className="absolute inset-0 rounded-full will-change-transform"
                animate={{ rotate: rotation }}
                transition={{
                  type: "spring",
                  stiffness: 80,
                  damping: 25,
                  mass: 0.8,
                }}
              >
                {steps.map((step, index) => {
                  const angle = index * stepAngle;
                  const finalAngle = angle + rotation;
                  const xPos =
                    Math.cos((finalAngle * Math.PI) / 180) * radius;
                  const yPos =
                    Math.sin((finalAngle * Math.PI) / 180) * radius;
                  const StepIcon = getIcon(step.icon);

                  return (
                    <motion.div
                      key={step.id}
                      className="absolute top-1/2 left-1/2 w-24 h-24 -ml-12 -mt-12 flex items-center justify-center rounded-full cursor-pointer"
                      animate={{
                        x: xPos,
                        y: yPos,
                        rotate: -rotation,
                      }}
                      transition={{
                        type: "spring",
                        stiffness: 80,
                        damping: 25,
                        mass: 0.8,
                      }}
                      onClick={() => setActive(index)}
                    >
                      {/* Le cercle de l'étape */}
                      <div
                        className={`relative w-full h-full rounded-full border-2 flex items-center justify-center transition-all duration-300 bg-[#050816] ${
                          active === index
                            ? "border-accent shadow-[0_0_30px_rgba(253,253,150,0.3)] scale-110"
                            : "border-white/10 hover:border-white/30 hover:bg-white/5"
                        }`}
                      >
                        <StepIcon
                          className={`w-8 h-8 transition-colors duration-300 ${
                            active === index ? "text-accent" : "text-gray-500"
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

              {/* CENTER CORE */}
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={active}
                    initial={{ opacity: 0, scale: 0.8, filter: "blur(10px)" }}
                    animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
                    exit={{ opacity: 0, scale: 0.8, filter: "blur(10px)" }}
                    transition={{ duration: 0.5, ease: [0.43, 0, 0.17, 1] }}
                    className="text-center z-10"
                  >
                    <h3 className="text-8xl font-black font-syne text-transparent bg-clip-text bg-linear-to-b from-white to-white/10 select-none">
                      0{steps[active].number}
                    </h3>
                    <p className="text-accent text-2xl sm:text-xl md:text-lg lg:text-sm uppercase tracking-[0.3em] font-bold mt-1 sm:mt-2">
                      Phase
                    </p>
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>
          </div>

          {/* --- CONTENT PANEL (Right side) --- */}
          <div className="flex-1 max-w-md relative min-h-[250px] sm:min-h-[300px] z-20 px-4 sm:px-0">
            <AnimatePresence mode="wait">
              <motion.div
                key={active}
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -30 }}
                transition={{ duration: 0.6, ease: [0.43, 0, 0.17, 1] }}
                className="flex flex-col justify-center h-full"
              >
                {/* Top Meta Data */}
                <div className="flex items-center gap-3 sm:gap-4 mb-6 sm:mb-8">
                  <div className="h-[2px] w-8 sm:w-12 bg-accent" />
                  <span className="text-accent text-xs sm:text-sm font-bold uppercase tracking-widest">
                    {steps[active].duration}
                  </span>
                </div>

                {/* Title */}
                <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white font-syne mb-4 sm:mb-6 leading-[1.1]">
                  {steps[active].title}
                </h2>

                {/* Description */}
                <p className="text-base sm:text-lg text-gray-400 leading-relaxed mb-6 sm:mb-10">
                  {steps[active].description}
                </p>

                {/* Footer Actions */}
                <div className="flex items-center gap-4 sm:gap-6 flex-wrap">
                  {steps[active].detail && (
                    <div className="px-4 sm:px-5 py-2 sm:py-3 rounded-xl bg-white/5 border border-white/10 text-xs sm:text-sm text-gray-300">
                      Inclus :{" "}
                      <span className="text-white font-bold ml-1">
                        {steps[active].detail}
                      </span>
                    </div>
                  )}

                  {/* Bouton Next Actif */}
                  <button
                    onClick={handleNext}
                    className="w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-accent flex items-center justify-center hover:scale-110 hover:shadow-[0_0_20px_rgba(253,253,150,0.5)] transition-all duration-300 cursor-pointer group shrink-0"
                    aria-label="Étape suivante"
                  >
                    <ArrowRight className="w-5 h-5 sm:w-6 sm:h-6 text-black group-hover:translate-x-1 transition-transform" />
                  </button>
                </div>
              </motion.div>
            </AnimatePresence>

            {/* Mobile Navigation Dots */}
            <div className="absolute -bottom-8 sm:-bottom-12 lg:bottom-0 lg:-left-12 flex lg:flex-col gap-2 sm:gap-3">
              {steps.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setActive(i)}
                  className={`rounded-full transition-all duration-300 ${
                    active === i
                      ? "w-6 sm:w-8 h-1 sm:h-1.5 lg:w-1.5 lg:h-8 bg-accent"
                      : "w-1.5 h-1.5 sm:w-2 sm:h-2 bg-white/20 hover:bg-white/40"
                  }`}
                  aria-label={`Aller à l'étape ${i + 1}`}
                />
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default ProcessSection;
