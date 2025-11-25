// components/expertise-section.tsx
"use client";
import { motion } from "framer-motion";
import MagneticItem from "./magnetic-tech";

const ExpertiseSection = () => {
  const categories = [
    {
      title: "Frontend",
      colSpan: "md:col-span-2",
      items: [
        { name: "React", color: "#61DAFB" },
        { name: "Vue.js", color: "#4FC08D" },
        { name: "Next.js", color: "#ffffff" },
        { name: "Tailwind", color: "#06B6D4" },
        { name: "TypeScript", color: "#3178C6" },
        { name: "Framer", color: "#0055FF" },
        { name: "Vite", color: "#646CFF" },
        { name: "SvelteKit", color: "#FF3E00" },
        { name: "Figma", color: "#F24E1E" },
      ],
    },
    {
      title: "Backend",
      colSpan: "md:col-span-1",
      items: [
        { name: "Node.js", color: "#339933" },
        { name: "Express", color: "#ffffff" },
        { name: "Python", color: "#3776AB" },
        { name: "PostgreSQL", color: "#336791" },
        { name: "Prisma", color: "#ffffff" },
        { name: "Fastify", color: "#ffffff" },
      ],
    },
    {
      title: "Automatisation",
      colSpan: "md:col-span-1",
      items: [
        { name: "n8n", color: "#FF6D5A" },
        { name: "Make", color: "#ffffff" },
        { name: "Zapier", color: "#FF4A00" },
        { name: "APIs", color: "#FFD966" },
      ],
    },
    {
      title: "DevOps",
      colSpan: "md:col-span-1",
      items: [
        { name: "Vercel", color: "#ffffff" },
        { name: "Docker", color: "#2496ED" },
        { name: "Supabase", color: "#3ECF8E" },
        { name: "GitHub", color: "#ffffff" },
      ],
    },
  ];

  return (
    <section className="w-full bg-[#050816] py-32 px-6 md:px-20">
      <div className="max-w-[1200px] mx-auto">
        <div className="text-center mb-20">
          <h2 className="text-4xl md:text-6xl font-bold text-white mb-6 font-syne">
            Technologies
          </h2>
          <p className="text-lg text-gray-400">
            Stack moderne pour performance maximale
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {categories.map((cat, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
              viewport={{ once: true }}
              className={`${cat.colSpan} bg-white/5 backdrop-blur-md rounded-3xl p-8 border border-white/10 hover:border-white/20 transition-colors duration-500`}
            >
              <h3 className="text-2xl font-bold text-white mb-8 font-syne">
                {cat.title}
              </h3>
              <div className="flex flex-wrap gap-4">
                {cat.items.map((tech, i) => (
                  <MagneticItem key={i} className="group relative">
                    <div className="flex flex-col items-center gap-2 cursor-pointer p-4 rounded-xl bg-white/5 hover:bg-white/10 transition-colors border border-white/5">
                      <div
                        className="w-8 h-8 rounded-full flex items-center justify-center font-bold text-lg"
                        style={{
                          color: tech.color,
                          textShadow: `0 0 10px ${tech.color}40`,
                        }}
                      >
                        {tech.name.charAt(0)}
                      </div>
                      <span className="text-xs text-gray-400 group-hover:text-white transition-colors">
                        {tech.name}
                      </span>
                    </div>
                  </MagneticItem>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ExpertiseSection;
