"use client";
import { AnimatePresence, motion } from "framer-motion";
import { CaretLeftIcon, CaretRightIcon, QuotesIcon } from "@phosphor-icons/react";
import { useState } from "react";
import type { TestimonialData } from "@/types";

interface TestimonialsSectionProps {
  testimonials: TestimonialData[];
}

const TestimonialsSection = ({ testimonials }: TestimonialsSectionProps) => {
  const [active, setActive] = useState(0);

  const next = () => setActive((prev) => (prev + 1) % testimonials.length);
  const prev = () =>
    setActive((prev) => (prev - 1 + testimonials.length) % testimonials.length);

  if (testimonials.length === 0) return null;

  return (
    <section
      id="testimonials"
      className="w-full bg-background py-16 sm:py-24 md:py-32 px-4 sm:px-6 md:px-20 relative overflow-hidden"
    >
      {/* Background Decor */}
      <div className="absolute top-10 sm:top-20 right-4 sm:right-10 md:right-20 text-accent opacity-5">
        <QuotesIcon size={200} className="sm:hidden" />
        <QuotesIcon size={300} className="hidden sm:block md:hidden" />
        <QuotesIcon size={400} className="hidden md:block" />
      </div>

      <div className="max-w-[1000px] mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="mb-12 sm:mb-16 md:mb-20 text-center md:text-left"
        >
          <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-8xl font-black tracking-tighter text-white mb-4 sm:mb-6 font-syne">
            Clients <br />
            <span className="text-accent">Heureux.</span>
          </h2>
        </motion.div>

        <div className="min-h-[300px] sm:min-h-[350px] md:min-h-[400px] flex flex-col justify-between">
          <AnimatePresence mode="wait">
            <motion.div
              key={active}
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              transition={{ duration: 0.7, ease: [0.43, 0, 0.17, 1] }}
            >
              <p className="text-xl sm:text-2xl md:text-3xl lg:text-5xl font-bold text-white leading-tight font-syne mb-6 sm:mb-8">
                &quot;{testimonials[active].quote}&quot;
              </p>

              <div className="flex items-center gap-3 sm:gap-4">
                <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-accent flex items-center justify-center text-black font-bold text-lg sm:text-xl shrink-0">
                  {testimonials[active].name.charAt(0)}
                </div>
                <div>
                  <h3 className="text-base sm:text-lg md:text-xl text-white font-bold">
                    {testimonials[active].name}
                  </h3>
                  <p className="text-sm sm:text-base text-gray-400">
                    {testimonials[active].role}
                  </p>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Controls */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4, duration: 0.6 }}
            className="flex gap-3 sm:gap-4 mt-8 sm:mt-12"
          >
            <button
              onClick={prev}
              aria-label="Témoignage précédent"
              className="p-3 sm:p-4 rounded-full border border-white/10 text-white hover:bg-primary hover:text-background transition-colors"
            >
              <CaretLeftIcon className="w-5 h-5 sm:w-6 sm:h-6" />
            </button>
            <button
              onClick={next}
              aria-label="Témoignage suivant"
              className="p-3 sm:p-4 rounded-full border border-white/10 text-white hover:bg-primary hover:text-background transition-colors"
            >
              <CaretRightIcon className="w-5 h-5 sm:w-6 sm:h-6" />
            </button>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
