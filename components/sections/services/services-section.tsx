"use client";
import { motion, useScroll, useTransform } from "framer-motion";
import { CheckCircleIcon } from "@phosphor-icons/react";
import { useRef } from "react";
import { getIcon } from "@/lib/icons";
import type { ServiceData } from "@/types";

interface ServicesSectionProps {
  services: ServiceData[];
}

const ServicesSection = ({ services }: ServicesSectionProps) => {
  const targetRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: targetRef as React.RefObject<HTMLDivElement>,
  });

  const x = useTransform(scrollYProgress, [0, 1], ["0%", "-75%"]);

  const ServiceCard = ({ service }: { service: ServiceData }) => {
    const Icon = getIcon(service.icon);
    return (
      <div className="group relative h-full bg-[#f5f5f7] rounded-3xl p-6 sm:p-7 laptop:p-8 laptop-lg:p-8 flex flex-col border border-gray-200 overflow-hidden">
        {/* Contenu principal (Z-Index élevé) */}
        <div className="relative z-10 flex flex-col h-full">
          {/* Header: Icon & Title */}
          <div className="flex flex-col items-start gap-4 laptop:gap-5 laptop-lg:gap-5 mb-5 laptop:mb-6 laptop-lg:mb-6">
            <div
              className={`w-12 h-12 sm:w-13 sm:h-13 laptop:w-14 laptop:h-14 laptop-lg:w-14 laptop-lg:h-14 rounded-2xl ${service.color} flex items-center justify-center shadow-lg group-hover:scale-110 group-hover:rotate-3 transition-transform duration-500`}
            >
              <Icon className="w-6 h-6 sm:w-6.5 sm:h-6.5 laptop:w-7 laptop:h-7 laptop-lg:w-7 laptop-lg:h-7 text-white" />
            </div>
            <div>
              <h3 className="text-2xl sm:text-2.5xl laptop:text-3xl laptop-lg:text-3xl font-bold text-[#050816] font-heading leading-tight mb-1">
                {service.title}
              </h3>
              <p className="text-xs sm:text-xs laptop:text-sm laptop-lg:text-sm font-bold text-gray-600 uppercase tracking-wider">
                {service.subtitle}
              </p>
            </div>
          </div>

          {/* Body: Description */}
          <p className="text-sm sm:text-sm laptop:text-base laptop-lg:text-base text-gray-600 leading-relaxed font-sans mb-6 laptop:mb-7 laptop-lg:mb-8">
            {service.description}
          </p>

          {/* Footer: Details & Tags */}
          <div className="mt-auto pt-5 laptop:pt-6 laptop-lg:pt-6 border-t border-gray-200">
            {/* Livrables */}
            <div className="flex items-center gap-2 mb-3 laptop:mb-4 laptop-lg:mb-4 text-xs sm:text-xs laptop:text-sm laptop-lg:text-sm font-bold text-[#050816]">
              <CheckCircleIcon className="w-4 h-4 laptop:w-4 laptop:h-4 laptop-lg:w-4 laptop-lg:h-4 text-green-500 shrink-0" />
              <span>Inclus : {service.deliverables}</span>
            </div>

            {/* Tags */}
            <div className="flex flex-wrap gap-2">
              {service.examples.map((ex, idx) => (
                <span
                  key={idx}
                  className="px-3 py-1 laptop:px-3 laptop:py-1 laptop-lg:px-3 laptop-lg:py-1 rounded-md bg-white border border-gray-200 text-[10px] sm:text-[10px] laptop:text-xs laptop-lg:text-xs font-bold text-gray-500 uppercase tracking-wide"
                >
                  {ex}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <section ref={targetRef} className="relative bg-white text-background">
      {/* --- MOBILE LAYOUT (Vertical Stack) --- */}
      <div className="md:hidden py-20 px-4 sm:px-6">
        <div className="max-w-2xl mx-auto">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mb-12"
          >
            <h2 className="text-4xl sm:text-5xl font-black tracking-tighter mb-4 text-[#050816] font-heading">
              Mes <br />
              <span className="text-[#050816]/50">Services.</span>
            </h2>
            <p className="text-base text-[#050816]/70 font-sans">
              Solutions web modernes qui génèrent des résultats mesurables. Du
              MVP au produit scalable.
            </p>
          </motion.div>

          {/* Cards Stack */}
          <div className="flex flex-col gap-6">
            {services.map((service, i) => (
              <motion.div
                key={service.id}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="h-auto min-h-[450px]"
              >
                <ServiceCard service={service} />
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* --- DESKTOP LAYOUT (Horizontal Scroll) --- */}
      <div className="hidden md:block relative h-[300vh]">
        <div className="sticky top-0 flex h-screen items-center overflow-hidden">
          <motion.div
            style={{ x }}
            className="flex gap-8 laptop:gap-10 laptop-lg:gap-10 px-6 md:px-20"
          >
            {/* Header Card (Static text on the left) */}
            <div className="min-w-[500px] lg:min-w-[550px] laptop:min-w-[580px] laptop-lg:min-w-[600px] flex flex-col justify-center shrink-0">
              <h2 className="text-7xl lg:text-7xl laptop:text-8xl laptop-lg:text-8xl font-black tracking-tighter mb-6 text-[#050816] font-heading">
                Mes <br />
                <span className="text-[#050816]/50">Services.</span>
              </h2>
              <p className="text-xl laptop:text-xl laptop-lg:text-xl max-w-md text-[#050816]/70 font-sans">
                Solutions web modernes qui génèrent des résultats mesurables. Du
                MVP au produit scalable.
              </p>
            </div>

            {/* Service Cards (Horizontal) */}
            {services.map((service, i) => (
              <div
                key={service.id}
                className="h-[60vh] sm:h-[68vh] laptop:h-[72vh] laptop-lg:h-[70vh] w-[80vw] sm:w-[45vw] lg:w-[38vw] laptop:w-[36vw] laptop-lg:w-[35vw] shrink-0"
              >
                <ServiceCard service={service} />
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
