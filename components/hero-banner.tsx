"use client";
import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import { useRef } from "react";

const HeroBanner = () => {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  const yText = useTransform(scrollYProgress, [0, 1], [0, 200]);
  const yImage = useTransform(scrollYProgress, [0, 1], [0, -100]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  return (
    <div
      ref={containerRef}
      className="relative h-screen w-full overflow-hidden bg-[#050816] flex flex-col items-center justify-center"
    >
      {/* Background Noise Texture */}
      <div
        className="absolute inset-0 opacity-[0.03] pointer-events-none z-0 mix-blend-overlay"
        style={{
          backgroundImage:
            'url("https://grainy-gradients.vercel.app/noise.svg")',
        }}
      ></div>

      {/* Text Layer - Parallax Down */}
      <motion.div
        style={{ y: yText, opacity }}
        className="relative z-10 flex flex-col items-center text-center"
      >
        <h1 className="text-[12vw] leading-[0.8] font-black uppercase tracking-tighter text-white mix-blend-difference">
          <span className="block overflow-hidden">
            <motion.span
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              transition={{ duration: 1, ease: [0.76, 0, 0.24, 1] }}
              className="block"
            >
              Développeur
            </motion.span>
          </span>
        </h1>

        <div className="flex gap-[4vw] md:gap-[10vw]">
          <h1 className="text-[12vw] leading-[0.8] font-black uppercase tracking-tighter text-white/90">
            <span className="block overflow-hidden">
              <motion.span
                initial={{ y: "100%" }}
                animate={{ y: 0 }}
                transition={{
                  duration: 1,
                  delay: 0.1,
                  ease: [0.76, 0, 0.24, 1],
                }}
                className="block"
              >
                Web
              </motion.span>
            </span>
          </h1>
          <h1 className="text-[12vw] leading-[0.8] font-black uppercase tracking-tighter text-[#FDFD96]">
            <span className="block overflow-hidden">
              <motion.span
                initial={{ y: "100%" }}
                animate={{ y: 0 }}
                transition={{
                  duration: 1,
                  delay: 0.2,
                  ease: [0.76, 0, 0.24, 1],
                }}
                className="block"
              >
                Créatif
              </motion.span>
            </span>
          </h1>
        </div>
      </motion.div>

      {/* Image Layer - Parallax Up */}
      <motion.div
        style={{ y: yImage }}
        className="absolute bottom-0 z-20 w-[90%] md:w-[40%] max-w-[600px]"
      >
        <Image
          src="/serge.png" // Assure-toi que l'image est détourée (PNG transparent)
          alt="Anani Serge"
          width={600}
          height={800}
          className="w-full h-auto object-contain drop-shadow-2xl"
          priority
        />
        {/* Gradient Mask to blend bottom */}
        <div className="absolute bottom-0 left-0 w-full h-32 bg-linear-to-t from-[#050816] to-transparent" />
      </motion.div>

      {/* Floating Stats - Glassmorphism */}
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1, duration: 1 }}
        className="absolute bottom-10 z-30 hidden md:flex gap-12 px-8 py-4 rounded-full bg-white/5 backdrop-blur-md border border-white/10"
      >
        <div className="text-center">
          <div className="text-3xl font-bold text-white font-syne">+3</div>
          <div className="text-xs text-gray-400 uppercase tracking-widest">
            Années
          </div>
        </div>
        <div className="w-px bg-white/10"></div>
        <div className="text-center">
          <div className="text-3xl font-bold text-white font-syne">+15</div>
          <div className="text-xs text-gray-400 uppercase tracking-widest">
            Projets
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default HeroBanner;
