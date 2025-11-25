interface TechItem {
  name: string;
  color?: string;
}

interface TechCategory {
  title: string;
  items: TechItem[];
  gridCols: string;
}

const ExpertiseSection = () => {
  const categories: TechCategory[] = [
    {
      title: "Frontend",
      gridCols: "grid-cols-3",
      items: [
        { name: "React", color: "#61DAFB" },
        { name: "Vue.js", color: "#4FC08D" },
        { name: "Next.js", color: "#000000" },
        { name: "Tailwind CSS", color: "#06B6D4" },
        { name: "TypeScript", color: "#3178C6" },
        { name: "Framer Motion", color: "#0055FF" },
        { name: "Vite", color: "#646CFF" },
        { name: "SvelteKit", color: "#FF3E00" },
        { name: "Figma", color: "#F24E1E" },
      ],
    },
    {
      title: "Backend",
      gridCols: "grid-cols-3",
      items: [
        { name: "Node.js", color: "#339933" },
        { name: "Express", color: "#000000" },
        { name: "Fastify", color: "#000000" },
        { name: "Python", color: "#3776AB" },
        { name: "PostgreSQL", color: "#336791" },
        { name: "Prisma", color: "#2D3748" },
      ],
    },
    {
      title: "Automatisation & APIs",
      gridCols: "grid-cols-2",
      items: [
        { name: "n8n", color: "#FF6D5A" },
        { name: "Make", color: "#000000" },
        { name: "Zapier", color: "#FF4A00" },
        { name: "REST APIs", color: "#FFD966" },
      ],
    },
    {
      title: "DevOps & Cloud",
      gridCols: "grid-cols-2",
      items: [
        { name: "Vercel", color: "#000000" },
        { name: "Railway", color: "#0B0D0E" },
        { name: "Supabase", color: "#3ECF8E" },
        { name: "GitHub", color: "#181717" },
        { name: "Docker", color: "#2496ED" },
        { name: "Redis", color: "#DC382D" },
      ],
    },
  ];

  return (
    <section className="w-full bg-background py-[120px] px-6 md:px-20">
      <div className="max-w-[1200px] mx-auto">
        {/* Header */}
        <div className="text-center mb-16 md:mb-20">
          <h2 className="text-3xl md:text-5xl font-heading font-bold text-foreground mb-4">
            Technologies maîtrisées
          </h2>
          <p className="text-base md:text-lg text-foreground-70 font-sans max-w-2xl mx-auto">
            Stack moderne pour des solutions performantes et scalables
          </p>
        </div>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
          {/* Frontend - Largest block */}
          <div className="md:col-span-2 glass-subtle rounded-2xl p-8 md:p-10 border border-border hover:border-accent transition-all duration-300">
            <h3 className="text-xl md:text-2xl font-heading font-semibold text-accent mb-6">
              Frontend
            </h3>
            <div className="grid grid-cols-3 md:grid-cols-3 gap-4 md:gap-6">
              {categories[0].items.map((tech, index) => (
                <div
                  key={index}
                  className="group flex flex-col items-center cursor-pointer"
                >
                  <div className="w-14 h-14 md:w-16 md:h-16 rounded-xl bg-surface/50 border border-border flex items-center justify-center mb-2 group-hover:scale-110 group-hover:border-accent group-hover:shadow-[0_0_15px_rgba(255,217,102,0.3)] transition-all duration-300 group-hover:rotate-[5deg]">
                    <span
                      className="text-xs md:text-sm font-bold text-foreground"
                      style={{ color: tech.color || "#ffffff" }}
                    >
                      {tech.name.charAt(0)}
                    </span>
                  </div>
                  <span className="text-xs md:text-sm text-foreground-70 font-sans text-center">
                    {tech.name}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Backend */}
          <div className="glass-subtle rounded-2xl p-8 md:p-10 border border-border hover:border-accent transition-all duration-300">
            <h3 className="text-xl md:text-2xl font-heading font-semibold text-accent mb-6">
              Backend
            </h3>
            <div className="grid grid-cols-3 gap-4 md:gap-6">
              {categories[1].items.map((tech, index) => (
                <div
                  key={index}
                  className="group flex flex-col items-center cursor-pointer"
                >
                  <div className="w-14 h-14 md:w-16 md:h-16 rounded-xl bg-surface/50 border border-border flex items-center justify-center mb-2 group-hover:scale-110 group-hover:border-accent group-hover:shadow-[0_0_15px_rgba(255,217,102,0.3)] transition-all duration-300 group-hover:rotate-[5deg]">
                    <span
                      className="text-xs md:text-sm font-bold text-foreground"
                      style={{ color: tech.color || "#ffffff" }}
                    >
                      {tech.name.charAt(0)}
                    </span>
                  </div>
                  <span className="text-xs md:text-sm text-foreground-70 font-sans text-center">
                    {tech.name}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Automatisation */}
          <div className="glass-subtle rounded-2xl p-8 md:p-10 border border-border hover:border-accent transition-all duration-300">
            <h3 className="text-xl md:text-2xl font-heading font-semibold text-accent mb-6">
              Automatisation & APIs
            </h3>
            <div className="grid grid-cols-2 gap-4 md:gap-6">
              {categories[2].items.map((tech, index) => (
                <div
                  key={index}
                  className="group flex flex-col items-center cursor-pointer"
                >
                  <div className="w-14 h-14 md:w-16 md:h-16 rounded-xl bg-surface/50 border border-border flex items-center justify-center mb-2 group-hover:scale-110 group-hover:border-accent group-hover:shadow-[0_0_15px_rgba(255,217,102,0.3)] transition-all duration-300 group-hover:rotate-[5deg]">
                    <span
                      className="text-xs md:text-sm font-bold text-foreground"
                      style={{ color: tech.color || "#ffffff" }}
                    >
                      {tech.name.charAt(0)}
                    </span>
                  </div>
                  <span className="text-xs md:text-sm text-foreground-70 font-sans text-center">
                    {tech.name}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* DevOps */}
          <div className="glass-subtle rounded-2xl p-8 md:p-10 border border-border hover:border-accent transition-all duration-300">
            <h3 className="text-xl md:text-2xl font-heading font-semibold text-accent mb-6">
              DevOps & Cloud
            </h3>
            <div className="grid grid-cols-2 gap-4 md:gap-6">
              {categories[3].items.map((tech, index) => (
                <div
                  key={index}
                  className="group flex flex-col items-center cursor-pointer"
                >
                  <div className="w-14 h-14 md:w-16 md:h-16 rounded-xl bg-surface/50 border border-border flex items-center justify-center mb-2 group-hover:scale-110 group-hover:border-accent group-hover:shadow-[0_0_15px_rgba(255,217,102,0.3)] transition-all duration-300 group-hover:rotate-[5deg]">
                    <span
                      className="text-xs md:text-sm font-bold text-foreground"
                      style={{ color: tech.color || "#ffffff" }}
                    >
                      {tech.name.charAt(0)}
                    </span>
                  </div>
                  <span className="text-xs md:text-sm text-foreground-70 font-sans text-center">
                    {tech.name}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ExpertiseSection;

