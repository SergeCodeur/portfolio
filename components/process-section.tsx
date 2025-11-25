import { Phone, DollarSign, Palette, Code, Rocket } from "lucide-react";

interface Step {
  number: number;
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  duration: string;
  detail?: string;
  description: string;
}

const ProcessSection = () => {
  const steps: Step[] = [
    {
      number: 1,
      icon: Phone,
      title: "Découverte",
      duration: "30 min",
      detail: "Gratuit",
      description: "Appel pour comprendre votre vision et vos objectifs",
    },
    {
      number: 2,
      icon: DollarSign,
      title: "Devis & Validation",
      duration: "48h max",
      description: "Proposition détaillée avec prix fixe et timeline",
    },
    {
      number: 3,
      icon: Palette,
      title: "Conception Design",
      duration: "1-2 semaines",
      detail: "Figma + Révisions",
      description: "Maquettes interactives avant tout développement",
    },
    {
      number: 4,
      icon: Code,
      title: "Développement",
      duration: "Selon projet",
      detail: "Updates hebdo",
      description: "Code propre, tests rigoureux, déploiement continu",
    },
    {
      number: 5,
      icon: Rocket,
      title: "Livraison & Formation",
      duration: "1 jour",
      detail: "Support inclus",
      description: "Formation équipe + documentation complète + 60j support",
    },
  ];

  return (
    <section className="w-full bg-background py-[120px] px-6 md:px-20">
      <div className="max-w-[1280px] mx-auto">
        {/* Header */}
        <div className="text-center mb-16 md:mb-20">
          <h2 className="text-3xl md:text-5xl font-heading font-bold text-foreground mb-4">
            Comment je travaille avec vous
          </h2>
          <p className="text-base md:text-lg text-foreground-70 font-sans max-w-2xl mx-auto">
            Un processus éprouvé, des résultats garantis
          </p>
        </div>

        {/* Desktop Timeline */}
        <div className="hidden md:block">
          <div className="relative max-w-[1000px] mx-auto">
            {/* Horizontal Line */}
            <div className="absolute top-[36px] left-0 right-0 h-0.5 bg-border" />

            {/* Steps */}
            <div className="relative flex justify-between">
              {steps.map((step, index) => {
                const Icon = step.icon;
                return (
                  <div key={step.number} className="flex flex-col items-center flex-1">
                    {/* Node */}
                    <div className="relative z-10 group">
                      <div className="w-[72px] h-[72px] rounded-full bg-gradient-to-br from-surface to-background border-[3px] border-accent flex items-center justify-center group-hover:scale-110 group-hover:shadow-[0_0_20px_rgba(255,217,102,0.4)] transition-all duration-300">
                        <span className="text-3xl font-heading font-bold text-foreground">
                          {step.number}
                        </span>
                      </div>
                    </div>

                    {/* Card */}
                    <div className="mt-8 w-[220px] glass-subtle rounded-2xl p-6 md:p-8 border border-border hover-lift group-hover:border-accent transition-all duration-300">
                      <div className="flex items-center justify-center mb-4">
                        <div className="w-12 h-12 rounded-lg bg-surface/50 border border-border flex items-center justify-center group-hover:border-accent transition-colors">
                          <Icon className="w-6 h-6 text-foreground group-hover:text-accent transition-colors" />
                        </div>
                      </div>
                      <h3 className="text-xl font-heading font-semibold text-foreground mb-2 text-center">
                        {step.title}
                      </h3>
                      <div className="flex items-center justify-center gap-2 mb-2">
                        <span className="text-sm font-semibold text-accent">{step.duration}</span>
                        {step.detail && (
                          <span className="text-xs text-foreground-70">• {step.detail}</span>
                        )}
                      </div>
                      <p className="text-sm text-foreground-70 font-sans text-center leading-relaxed">
                        {step.description}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Mobile Timeline */}
        <div className="md:hidden relative">
          {/* Vertical Line */}
          <div className="absolute left-[35px] top-0 bottom-0 w-0.5 bg-border" />
          
          <div className="space-y-8">
            {steps.map((step, index) => {
              const Icon = step.icon;
              return (
                <div key={step.number} className="flex gap-4 relative">
                  {/* Node */}
                  <div className="relative z-10 flex-shrink-0">
                    <div className="w-[72px] h-[72px] rounded-full bg-gradient-to-br from-surface to-background border-[3px] border-accent flex items-center justify-center">
                      <span className="text-2xl font-heading font-bold text-foreground">
                        {step.number}
                      </span>
                    </div>
                  </div>

                {/* Card */}
                <div className="flex-1 glass-subtle rounded-2xl p-6 border border-border">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-10 h-10 rounded-lg bg-surface/50 border border-border flex items-center justify-center">
                      <Icon className="w-5 h-5 text-foreground" />
                    </div>
                    <div>
                      <h3 className="text-lg font-heading font-semibold text-foreground">
                        {step.title}
                      </h3>
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-semibold text-accent">{step.duration}</span>
                        {step.detail && (
                          <span className="text-xs text-foreground-70">• {step.detail}</span>
                        )}
                      </div>
                    </div>
                  </div>
                  <p className="text-sm text-foreground-70 font-sans leading-relaxed">
                    {step.description}
                  </p>
                </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProcessSection;

