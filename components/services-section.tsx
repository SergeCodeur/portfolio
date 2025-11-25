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

  // Transforme le scroll vertical en mouvement horizontal
  const x = useTransform(scrollYProgress, [0, 1], ["0%", "-66%"]);

  return (
    <section ref={targetRef} className="relative h-[300vh] bg-white text-black">
      <div className="sticky top-0 flex h-screen items-center overflow-hidden">
        <motion.div style={{ x }} className="flex gap-10 px-20">
          {/* Header Card */}
          <div className="min-w-[400px] md:min-w-[600px] flex flex-col justify-center">
            <h2 className="text-6xl md:text-8xl font-black tracking-tighter mb-6">
              Mon <br />
              <span className="text-gray-400">Expertise.</span>
            </h2>
            <p className="text-xl max-w-md">
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
                className="group relative h-[60vh] w-[80vw] md:w-[35vw] bg-[#f5f5f7] rounded-3xl p-10 flex flex-col justify-between border border-gray-200 hover:bg-black hover:text-white transition-colors duration-500"
              >
                <div
                  className={`w-16 h-16 rounded-full ${service.color} flex items-center justify-center mb-4`}
                >
                  <Icon className="w-8 h-8 text-white" />
                </div>
                <div>
                  <h3 className="text-4xl font-bold mb-4">{service.title}</h3>
                  <p className="text-lg text-gray-500 group-hover:text-gray-300">
                    {service.desc}
                  </p>
                </div>
                <div className="text-9xl font-black text-gray-200 absolute bottom-4 right-4 group-hover:text-gray-800 transition-colors">
                  0{i + 1}
                </div>
              </div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
};

export default ServicesSection;
