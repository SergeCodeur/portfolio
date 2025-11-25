// components/testimonials-section.tsx
"use client";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronLeft, ChevronRight, Quote } from "lucide-react";
import { useState } from "react";

const TestimonialsSection = () => {
  const [active, setActive] = useState(0);
  const testimonials = [
    {
      id: 1,
      quote:
        "Anani a dépassé toutes nos attentes. Le dashboard a complètement transformé notre façon de travailler.",
      name: "Marie Kouassi",
      role: "Directrice Marketing, Digital Boost",
    },
    {
      id: 2,
      quote:
        "Le système d'automatisation nous fait gagner plus de 20 heures par semaine. Livraison parfaite.",
      name: "Jean-Baptiste Adou",
      role: "CEO, Tech Solutions Bénin",
    },
    {
      id: 3,
      quote:
        "Travail de qualité supérieure. Il a su comprendre nos besoins complexes pour une solution sur mesure.",
      name: "Sophie Mensah",
      role: "Fondatrice, E-commerce Plus",
    },
  ];

  const next = () => setActive((prev) => (prev + 1) % testimonials.length);
  const prev = () =>
    setActive((prev) => (prev - 1 + testimonials.length) % testimonials.length);

  return (
    <section className="w-full bg-[#050816] py-32 px-6 md:px-20 relative overflow-hidden">
      {/* Background Decor */}
      <div className="absolute top-20 right-20 text-[#FDFD96] opacity-5">
        <Quote size={400} />
      </div>

      <div className="max-w-[1000px] mx-auto relative z-10">
        <h2 className="text-sm uppercase tracking-widest text-[#FDFD96] mb-12 font-bold">
          Témoignages Clients
        </h2>

        <div className="min-h-[400px] flex flex-col justify-between">
          <AnimatePresence mode="wait">
            <motion.div
              key={active}
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            >
              <p className="text-3xl md:text-5xl font-bold text-white leading-tight font-syne mb-8">
                &quot;{testimonials[active].quote}&quot;
              </p>

              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-[#FDFD96] flex items-center justify-center text-black font-bold text-xl">
                  {testimonials[active].name.charAt(0)}
                </div>
                <div>
                  <h4 className="text-xl text-white font-bold">
                    {testimonials[active].name}
                  </h4>
                  <p className="text-gray-400">{testimonials[active].role}</p>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Controls */}
          <div className="flex gap-4 mt-12">
            <button
              onClick={prev}
              className="p-4 rounded-full border border-white/10 text-white hover:bg-white hover:text-black transition-colors"
            >
              <ChevronLeft />
            </button>
            <button
              onClick={next}
              className="p-4 rounded-full border border-white/10 text-white hover:bg-white hover:text-black transition-colors"
            >
              <ChevronRight />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
