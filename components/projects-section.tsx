"use client";

import { useState } from "react";

type ProjectType = "Tous" | "Dashboards" | "E-commerce" | "SaaS" | "Automatisation";

interface Project {
  id: number;
  title: string;
  tags: string[];
  type: "B2B" | "B2C";
  category: ProjectType[];
  price: string;
  image: string;
}

const ProjectsSection = () => {
  const [activeFilter, setActiveFilter] = useState<ProjectType>("Tous");

  const projects: Project[] = [
    {
      id: 1,
      title: "Dashboard Marketing Agence",
      tags: ["React", "n8n", "Charts"],
      type: "B2B",
      category: ["Dashboards"],
      price: "€3,200",
      image: "/api/placeholder/600/450",
    },
    {
      id: 2,
      title: "Plateforme Réservation Salon",
      tags: ["Next.js", "Stripe", "SMS"],
      type: "B2C",
      category: ["E-commerce"],
      price: "€2,800",
      image: "/api/placeholder/600/450",
    },
    {
      id: 3,
      title: "CRM Immobilier + AI",
      tags: ["Vue", "PostgreSQL", "ML"],
      type: "B2B",
      category: ["SaaS"],
      price: "€4,200",
      image: "/api/placeholder/600/450",
    },
    {
      id: 4,
      title: "Tracker Crypto SaaS",
      tags: ["Svelte", "APIs", "Real-time"],
      type: "B2C",
      category: ["SaaS"],
      price: "€4,500",
      image: "/api/placeholder/600/450",
    },
    {
      id: 5,
      title: "E-commerce + Analytics",
      tags: ["Next.js", "Shopify", "ML"],
      type: "B2C",
      category: ["E-commerce"],
      price: "€3,500",
      image: "/api/placeholder/600/450",
    },
    {
      id: 6,
      title: "Système Restaurant QR",
      tags: ["React Native", "n8n"],
      type: "B2B",
      category: ["Automatisation"],
      price: "€3,200",
      image: "/api/placeholder/600/450",
    },
  ];

  const filters: ProjectType[] = ["Tous", "Dashboards", "E-commerce", "SaaS", "Automatisation"];

  const filteredProjects =
    activeFilter === "Tous"
      ? projects
      : projects.filter((project) => project.category.includes(activeFilter));

  return (
    <section className="w-full bg-background py-[120px] px-6 md:px-20">
      <div className="max-w-[1280px] mx-auto">
        {/* Header */}
        <div className="text-center mb-12 md:mb-16">
          <h2 className="text-3xl md:text-5xl font-heading font-bold text-foreground mb-4">
            Projets qui parlent d&apos;eux-mêmes
          </h2>
          <p className="text-base md:text-lg text-foreground-70 font-sans mb-8 md:mb-12 max-w-2xl mx-auto">
            Chaque ligne de code pensée pour un impact business mesurable
          </p>

          {/* Filter Tabs */}
          <div className="flex flex-wrap justify-center gap-3 md:gap-4">
            {filters.map((filter) => (
              <button
                key={filter}
                onClick={() => setActiveFilter(filter)}
                className={`px-5 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                  activeFilter === filter
                    ? "bg-accent text-primary-foreground"
                    : "bg-transparent border border-border text-foreground hover:border-accent"
                }`}
              >
                {filter}
              </button>
            ))}
          </div>
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {filteredProjects.map((project) => (
            <div
              key={project.id}
              className="group relative aspect-[4/3] rounded-2xl overflow-hidden border border-border hover:border-accent hover:shadow-[0_0_20px_rgba(255,217,102,0.3)] transition-all duration-300 hover:scale-[1.02] cursor-pointer"
            >
              {/* Project Image */}
              <div className="absolute inset-0 bg-gradient-to-br from-surface via-surface/80 to-background">
                <div className="w-full h-full bg-gradient-to-b from-transparent via-transparent to-background/60 group-hover:to-background/80 transition-all duration-300" />
                <div className="absolute inset-0 bg-surface/20" />
                {/* Placeholder pattern */}
                <div className="absolute inset-0 opacity-10">
                  <div className="w-full h-full bg-[linear-gradient(45deg,transparent_25%,rgba(255,255,255,0.05)_25%,rgba(255,255,255,0.05)_50%,transparent_50%,transparent_75%,rgba(255,255,255,0.05)_75%,rgba(255,255,255,0.05))] bg-[length:20px_20px]" />
                </div>
              </div>

              {/* Badge */}
              <div className="absolute top-4 right-4 z-10">
                <span className="px-3 py-1 rounded-full bg-accent text-primary-foreground text-xs font-semibold">
                  {project.type}
                </span>
              </div>

              {/* Info Overlay */}
              <div className="absolute bottom-0 left-0 right-0 p-4 md:p-6 z-10">
                <h3 className="text-lg md:text-xl font-heading font-semibold text-foreground mb-2">
                  {project.title}
                </h3>
                <div className="flex flex-wrap gap-2 mb-3">
                  {project.tags.map((tag, index) => (
                    <span
                      key={index}
                      className="px-2 py-1 rounded-md bg-surface/50 border border-border/50 text-xs text-foreground-70 font-sans"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* Hover Button */}
              <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-20">
                <button className="px-6 py-3 rounded-lg bg-accent text-primary-foreground font-semibold text-base hover:scale-105 transition-transform">
                  Voir le projet →
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProjectsSection;

