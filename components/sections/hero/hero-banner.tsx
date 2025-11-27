"use client";
import { motion, useScroll, useTransform, Variants } from "framer-motion";
import Image from "next/image";
import { useRef } from "react";

const HeroBanner = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  const yText = useTransform(scrollYProgress, [0, 1], [0, 150]);
  const yImage = useTransform(scrollYProgress, [0, 1], [0, -80]);
  const opacity = useTransform(scrollYProgress, [0, 0.6], [1, 0]);

  const transition = { duration: 1, ease: [0.76, 0, 0.24, 1] as const };

  const textReveal: Variants = {
    hidden: {
      y: "110%",
      opacity: 0,
    },
    visible: (i: number) => ({
      y: "0%",
      opacity: 1,
      transition: { ...transition, delay: i * 0.15 },
    }),
  };

  const imageReveal: Variants = {
    hidden: { opacity: 0, scale: 1.1, y: 50 },
    visible: {
      opacity: 0.7,
      scale: 1,
      y: 0,
      transition: { duration: 1.4, ease: "easeOut", delay: 0.5 },
    },
  };

  const statsReveal: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, delay: 1.2 },
    },
  };

  return (
    <div
      ref={containerRef}
      className="relative min-h-screen w-full bg-background text-foreground overflow-hidden font-heading flex flex-col"
    >
      <div className="grow flex flex-col items-center justify-center relative pt-20 sm:pt-24">
        {/* Text Layer - Parallax Down */}
        <motion.div
          style={{ y: yText, opacity }}
          className="absolute top-32 sm:top-36 md:top-32 lg:top-28 left-0 right-0 flex flex-col items-center w-full z-20 select-none px-2 sm:px-4"
          initial="hidden"
          animate="visible"
        >
          {/* Ligne 1 : DÉVELOPPEUR */}
          <h1 className="text-[8.5vw] sm:text-[8vw] md:text-[6rem] lg:text-[8rem] leading-[0.95] font-extrabold tracking-tighter text-foreground drop-shadow-2xl overflow-hidden pb-4 -mb-4 text-center w-full">
            <motion.span custom={0} variants={textReveal} className="block">
              Développeur
            </motion.span>
          </h1>

          {/* Ligne 2 : WEB CRÉATIF */}
          <div className="flex w-full justify-center items-center gap-2 sm:gap-[4vw] md:gap-12 lg:gap-16 mt-0.5 sm:mt-1 md:mt-2 flex-nowrap whitespace-nowrap">
            <span className="text-[8.5vw] sm:text-[8vw] md:text-[6rem] lg:text-[8rem] leading-[0.95] font-extrabold tracking-tighter text-foreground drop-shadow-2xl overflow-hidden pb-4 -mb-4 px-1">
              <motion.span custom={1} variants={textReveal} className="block">
                Web
              </motion.span>
            </span>
            <span className="text-[8.5vw] sm:text-[8vw] md:text-[6rem] lg:text-[8rem] leading-[0.95] font-extrabold tracking-tighter text-accent drop-shadow-2xl overflow-hidden pb-4 -mb-4 px-1">
              <motion.span custom={2} variants={textReveal} className="block">
                Créatif
              </motion.span>
            </span>
          </div>
        </motion.div>

        {/* Image Layer - Parallax Up */}
        <motion.div
          style={{ y: yImage }}
          className="absolute bottom-0 z-10 flex justify-center items-end w-full h-full pointer-events-none"
        >
          <motion.div
            initial="hidden"
            animate="visible"
            variants={imageReveal}
            className="relative w-[85%] sm:w-[60%] md:w-[30%] lg:w-[20%] xl:w-[18%] max-w-[350px] mb-8 sm:mb-12 md:mb-16"
          >
            <Image
              src="/serge.png"
              alt="Anani Serge"
              width={320}
              height={427}
              className="w-full h-auto object-contain drop-shadow-2xl"
              priority
            />
            <div className="absolute bottom-0 left-0 w-full h-1/3 bg-linear-to-t from-background via-background/80 to-transparent"></div>
          </motion.div>
        </motion.div>

        {/* Stats Card */}
        <motion.div
          style={{ opacity }}
          className="absolute bottom-16 sm:bottom-12 md:bottom-12 z-20 left-1/2 -translate-x-1/2 w-[90%] sm:w-fit px-4"
        >
          <motion.div initial="hidden" animate="visible" variants={statsReveal}>
            <div className="flex items-center justify-center gap-3 sm:gap-4 md:gap-6 lg:gap-12 px-4 sm:px-6 md:px-10 lg:px-12 py-2.5 sm:py-3 md:py-4 lg:py-5 rounded-full border border-border bg-surface/50 backdrop-blur-md shadow-2xl glass-subtle mx-auto">
              <div className="flex flex-col items-center min-w-0">
                <span className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold text-foreground font-heading whitespace-nowrap">
                  +3
                </span>
                <span className="text-[8px] sm:text-[9px] md:text-[10px] lg:text-xs uppercase tracking-widest text-foreground-70 font-semibold mt-0.5 sm:mt-1 text-center leading-tight">
                  Années d&apos;expérience
                </span>
              </div>

              <div className="w-px h-8 sm:h-10 md:h-12 bg-border shrink-0"></div>

              <div className="flex flex-col items-center min-w-0">
                <span className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold text-foreground font-heading whitespace-nowrap">
                  +15
                </span>
                <span className="text-[8px] sm:text-[9px] md:text-[10px] lg:text-xs uppercase tracking-widest text-foreground-70 font-semibold mt-0.5 sm:mt-1 text-center leading-tight">
                  Projets Web Réalisés
                </span>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

export default HeroBanner;
