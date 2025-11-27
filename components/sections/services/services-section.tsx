"use client";
import { motion, useScroll, useTransform } from "framer-motion";
import { BarChart3, Code, Zap } from "lucide-react";
import { useRef } from "react";

const services = [
  {
    title: "Développement Full-Stack",
    desc: "Applications robustes et scalables.",
    icon: Code,
    color: "bg-blue-500",
  },
  {
    title: "Automatisation & IA",
    desc: "Connectez vos outils, gagnez du temps.",
    icon: Zap,
    color: "bg-yellow-400",
  },
  {
    title: "Data Visualization",
    desc: "Transformez vos données en décisions.",
    icon: BarChart3,
    color: "bg-purple-500",
  },
];

const ServicesSection = () => {
  const targetRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: targetRef });

  const x = useTransform(scrollYProgress, [0, 1], ["0%", "-75%"]);

  return (
    <section ref={targetRef} className="relative bg-white text-background">
      {/* Mobile Layout - Vertical Stack */}
      <div className="md:hidden py-12 px-4 sm:px-6">
        <div className="max-w-2xl mx-auto">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: [0.43, 0, 0.17, 1] }}
            className="mb-12"
          >
            <h2 className="text-4xl sm:text-5xl font-black tracking-tighter mb-4 sm:mb-6 text-background font-heading">
              Mon <br />
              <span className="text-background/50">Expertise.</span>
            </h2>
            <p className="text-base sm:text-lg max-w-md text-background/70 font-sans">
              Des solutions techniques conçues pour la performance et
              l&apos;impact business.
            </p>
          </motion.div>

          {/* Service Cards - Vertical Stack */}
          <div className="flex flex-col gap-6 sm:gap-8">
            {services.map((service, i) => {
              const Icon = service.icon;
              return (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{
                    duration: 0.6,
                    ease: [0.43, 0, 0.17, 1],
                    delay: i * 0.15,
                  }}
                  className="group relative min-h-[300px] sm:min-h-[350px] bg-[#f5f5f7] rounded-2xl sm:rounded-3xl p-6 sm:p-8 flex flex-col justify-between border border-border/20 hover:bg-[#050816] hover:text-foreground hover:border-accent/30 hover:shadow-[0_0_30px_rgba(255,217,102,0.2)] transition-all duration-500 overflow-hidden"
                >
                  <div className="relative z-10 flex flex-col h-full justify-between">
                    <div
                      className={`w-12 h-12 sm:w-14 sm:h-14 rounded-full ${service.color} flex items-center justify-center mb-3 sm:mb-4 shrink-0 group-hover:bg-accent group-hover:shadow-[0_0_20px_rgba(255,217,102,0.4)] transition-all duration-500`}
                    >
                      <Icon className="w-6 h-6 sm:w-7 sm:h-7 text-white group-hover:text-background transition-colors duration-500" />
                    </div>

                    <div>
                      <h3 className="text-2xl sm:text-3xl font-bold mb-3 sm:mb-4 leading-tight wrap-break-word hyphens-auto text-background group-hover:text-foreground transition-colors duration-500 font-heading">
                        {service.title}
                      </h3>
                      <p className="text-sm sm:text-base text-background/70 group-hover:text-foreground-70 leading-relaxed font-sans">
                        {service.desc}
                      </p>
                    </div>
                  </div>

                  <div className="absolute -bottom-4 right-0 sm:-bottom-6 sm:-right-6 text-[7rem] sm:text-[8rem] font-black text-gray-300 sm:text-gray-200 group-hover:text-gray-800 transition-colors pointer-events-none z-0 leading-none select-none opacity-80 sm:opacity-100">
                    0{i + 1}
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Desktop Layout - Horizontal Scroll */}
      <div className="hidden md:block relative h-[300vh]">
        <div className="sticky top-0 flex h-screen items-center overflow-hidden">
          <motion.div
            style={{ x }}
            className="flex gap-6 md:gap-10 px-6 md:px-20"
          >
            {/* Header Card */}
            <div className="min-w-[500px] lg:min-w-[600px] flex flex-col justify-center shrink-0">
              <h2 className="text-7xl lg:text-8xl font-black tracking-tighter mb-6 text-[#050816] font-heading">
                Mon <br />
                <span className="text-[#050816]/50">Expertise.</span>
              </h2>
              <p className="text-lg md:text-xl max-w-md text-[#050816]/70 font-sans">
                Des solutions techniques conçues pour la performance et
                l&apos;impact business.
              </p>
            </div>

            {/* Service Cards */}
            {services.map((service, i) => {
              const Icon = service.icon;
              return (
                <div
                  key={i}
                  className="group relative h-[60vh] w-[40vw] lg:w-[35vw] bg-[#f5f5f7] rounded-3xl p-8 md:p-10 flex flex-col justify-between border border-border/20 hover:bg-[#050816] hover:text-foreground hover:border-accent/30 hover:shadow-[0_0_30px_rgba(255,217,102,0.2)] transition-all duration-500 overflow-hidden shrink-0"
                >
                  {/* Contenu principal (Z-Index élevé pour passer au dessus du numéro) */}
                  <div className="relative z-10 flex flex-col h-full justify-between">
                    <div
                      className={`w-16 h-16 rounded-full ${service.color} flex items-center justify-center mb-4 shrink-0 group-hover:bg-accent group-hover:shadow-[0_0_20px_rgba(255,217,102,0.4)] transition-all duration-500`}
                    >
                      <Icon className="w-8 h-8 text-white group-hover:text-[#050816] transition-colors duration-500" />
                    </div>

                    <div>
                      <h3 className="text-3xl md:text-4xl font-bold mb-4 leading-tight wrap-break-word hyphens-auto text-[#050816] group-hover:text-foreground transition-colors duration-500 font-heading">
                        {service.title}
                      </h3>
                      <p className="text-base md:text-lg text-[#050816]/70 group-hover:text-foreground-70 leading-relaxed font-sans">
                        {service.desc}
                      </p>
                    </div>
                  </div>

                  {/* Numéro en arrière-plan (Z-Index bas) */}
                  <div className="absolute -bottom-6 -right-6 text-[10rem] lg:text-[12rem] font-black text-gray-200 group-hover:text-gray-800 transition-colors pointer-events-none z-0 leading-none select-none">
                    0{i + 1}
                  </div>
                </div>
              );
            })}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
