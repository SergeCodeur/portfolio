import { Code, Zap, BarChart3 } from "lucide-react";

const ServicesSection = () => {
  const services = [
    {
      icon: Code,
      title: "Développement Web Full-Stack",
      description:
        "Applications web sur mesure avec React, Vue et Next.js. Interface moderne, performante et responsive.",
      price: "À partir de 1 500€",
    },
    {
      icon: Zap,
      title: "Automatisation Intelligente",
      description:
        "Connectez vos outils avec n8n, Make ou Zapier. Automatisez les tâches répétitives et gagnez du temps.",
      price: "À partir de 800€",
    },
    {
      icon: BarChart3,
      title: "Dashboards Analytiques",
      description:
        "Visualisez vos données en temps réel. KPIs, rapports automatiques et insights actionnables.",
      price: "À partir de 1 200€",
    },
  ];

  return (
    <section className="w-full bg-background py-[120px] px-6 md:px-20">
      <div className="max-w-[1280px] mx-auto">
        {/* Header */}
        <div className="text-center mb-16 md:mb-20">
          <h2 className="text-3xl md:text-5xl font-heading font-bold text-foreground mb-4">
            Ce que je propose
          </h2>
          <p className="text-base md:text-lg text-foreground-70 font-sans max-w-2xl mx-auto">
            Des solutions web qui génèrent des résultats
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
          {services.map((service, index) => {
            const Icon = service.icon;
            return (
              <div
                key={index}
                className="glass-subtle rounded-2xl p-8 md:p-12 border border-border hover-lift group transition-all duration-300 hover:border-accent hover:shadow-[0_0_20px_rgba(255,217,102,0.3)]"
              >
                {/* Icon */}
                <div className="mb-6 flex justify-center">
                  <div className="w-16 h-16 rounded-xl bg-surface/50 border border-border flex items-center justify-center group-hover:border-accent transition-colors">
                    <Icon className="w-8 h-8 text-foreground group-hover:text-accent transition-colors" />
                  </div>
                </div>

                {/* Title */}
                <h3 className="text-xl md:text-2xl font-heading font-semibold text-foreground mb-4">
                  {service.title}
                </h3>

                {/* Description */}
                <p className="text-sm md:text-base text-foreground-70 font-sans mb-6 leading-relaxed">
                  {service.description}
                </p>

                {/* Price */}
                <div className="mt-auto">
                  <p className="text-base md:text-lg font-semibold text-accent">
                    {service.price}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;

