"use client";
import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import type { ExpertiseCategoryData } from "@/types";

interface ExpertiseEditorialProps {
  categories: ExpertiseCategoryData[];
}

const ExpertiseEditorial = ({ categories }: ExpertiseEditorialProps) => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(0);

  if (categories.length === 0) return null;

  return (
    <section
      id="expertise"
      className="bg-white text-background py-16 sm:py-24 md:py-32 px-4 sm:px-6"
    >
      <div className="max-w-5xl mx-auto">
        <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-8xl font-black tracking-tighter text-background mb-8 sm:mb-12 md:mb-16 font-syne">
          Stack <br /> <span className="text-background/50">Technique.</span>
        </h2>

        <div className="flex flex-col">
          {categories.map((stack, index) => (
            <motion.div
              key={stack.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              onMouseEnter={() => setHoveredIndex(index)}
              className="group border-t border-background/10 py-6 sm:py-8 md:py-10 relative cursor-default"
            >
              <div className="flex flex-col md:flex-row md:items-baseline justify-between gap-3 sm:gap-4 relative z-10">
                <h3 className="text-3xl sm:text-4xl md:text-5xl font-bold text-background font-syne group-hover:text-accent transition-colors">
                  {stack.category}
                </h3>
                <p className="text-sm sm:text-base text-background/70 font-sans">
                  {stack.description}
                </p>
              </div>

              <AnimatePresence>
                {hoveredIndex === index && (
                  <motion.div
                    initial={{ opacity: 0, height: 0, marginTop: 0 }}
                    animate={{ opacity: 1, height: "auto", marginTop: 20 }}
                    exit={{ opacity: 0, height: 0, marginTop: 0 }}
                    transition={{ duration: 0.6, ease: [0.43, 0, 0.17, 1] }}
                    className="overflow-hidden"
                  >
                    <div className="flex flex-wrap gap-2 sm:gap-3">
                      {stack.items.map((item, i) => (
                        <span
                          key={i}
                          className="px-3 sm:px-4 py-1.5 sm:py-2 rounded-full border border-background/20 text-background text-xs sm:text-sm bg-background/5"
                        >
                          {item}
                        </span>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
          <motion.div
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: "circOut" }}
            className="border-t border-background/10 origin-left"
          />
        </div>
      </div>
    </section>
  );
};

export default ExpertiseEditorial;
