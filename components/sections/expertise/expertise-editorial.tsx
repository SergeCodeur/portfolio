"use client";
import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";

const techStack = [
  {
    category: "Frontend",
    description: "Interfaces réactives et animations fluides",
    items: [
      "React",
      "Next.js",
      "TypeScript",
      "Tailwind",
      "Framer Motion",
      "Three.js",
    ],
  },
  {
    category: "Backend",
    description: "Architecture solide et bases de données",
    items: ["Node.js", "PostgreSQL", "Supabase", "Python", "Prisma"],
  },
  {
    category: "Automatisation",
    description: "Workflows et connexions API",
    items: ["n8n", "Make", "Zapier", "OpenAI API"],
  },
  {
    category: "DevOps",
    description: "Déploiement et CI/CD",
    items: ["Vercel", "Docker", "Git", "AWS"],
  },
];

const ExpertiseEditorial = () => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(0);

  return (
    <section id="expertise" className="bg-white text-black py-16 sm:py-24 md:py-32 px-4 sm:px-6">
      <div className="max-w-5xl mx-auto">
        <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-8xl font-black tracking-tighter text-[#050816] mb-8 sm:mb-12 md:mb-16 font-syne">
          Stack <br /> <span className="text-[#050816]/50">Technique.</span>
        </h2>

        <div className="flex flex-col">
          {techStack.map((stack, index) => (
            <div
              key={index}
              onMouseEnter={() => setHoveredIndex(index)}

              className="group border-t border-[#050816]/10 py-6 sm:py-8 md:py-10 relative cursor-default"
            >
              <div className="flex flex-col md:flex-row md:items-baseline justify-between gap-3 sm:gap-4 relative z-10">
                <h3 className="text-3xl sm:text-4xl md:text-5xl font-bold text-[#050816] font-syne group-hover:text-accent transition-colors">
                  {stack.category}
                </h3>
                <p className="text-sm sm:text-base text-[#050816]/70 font-sans">{stack.description}</p>
              </div>

              {/* Reveal Logos on Hover */}
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
                          className="px-3 sm:px-4 py-1.5 sm:py-2 rounded-full border border-[#050816]/20 text-[#050816] text-xs sm:text-sm bg-[#050816]/5"
                        >
                          {item}
                        </span>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
          <div className="border-t border-[#050816]/10" />
        </div>
      </div>
    </section>
  );
};

export default ExpertiseEditorial;
