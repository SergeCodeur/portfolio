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

  const transition = { duration: 0.8, ease: [0.76, 0, 0.24, 1] as const };

  const textReveal: Variants = {
    hidden: {
      y: "110%",
      opacity: 0,
    },
    visible: (i: number) => ({
      y: "0%",
      opacity: 1,
      transition: { ...transition, delay: i * 0.1 },
    }),
  };

  const imageReveal: Variants = {
    hidden: { opacity: 0, scale: 1.1, y: 50 },
    visible: {
      opacity: 0.7,
      scale: 1,
      y: 0,
      transition: { duration: 0.8, ease: "easeOut", delay: 0 },
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
          className="absolute top-20 min-[375px]:top-24 min-[425px]:top-28 sm:top-32 min-[768px]:top-28 md:top-32 lg:top-28 laptop:top-36 left-0 right-0 flex flex-col items-center w-full z-20 select-none px-3 min-[375px]:px-4 min-[768px]:px-10 sm:px-4 will-change-transform"
          initial="hidden"
          animate="visible"
        >
          {/* Ligne 1 : DÉVELOPPEUR */}
          <h1 className="text-[8.5vw] min-[375px]:text-[9vw] min-[425px]:text-[9.5vw] min-[768px]:text-[4.8vw] sm:text-[8vw] md:text-[5rem] lg:text-[6.5rem] laptop:text-[7rem] xl:text-[7.5rem] laptop-lg:text-[9rem] leading-[0.9] font-extrabold tracking-tighter text-foreground drop-shadow-2xl overflow-hidden pb-4 -mb-4 text-center w-full">
            <motion.span custom={0} variants={textReveal} className="block">
              Développeur
            </motion.span>
          </h1>

          {/* Ligne 2 : WEB CRÉATIF */}
          <div className="flex w-full justify-center items-center gap-1 min-[375px]:gap-1.5 min-[425px]:gap-2 min-[768px]:gap-1.5 sm:gap-4 md:gap-6 lg:gap-8 laptop:gap-10 laptop-lg:gap-10 mt-0 sm:mt-1 md:mt-0 flex-wrap min-[375px]:flex-nowrap justify-center">
            <span className="text-[8.5vw] min-[375px]:text-[9vw] min-[425px]:text-[9.5vw] min-[768px]:text-[4.8vw] sm:text-[8vw] md:text-[5rem] lg:text-[6.5rem] laptop:text-[7rem] xl:text-[7.5rem] laptop-lg:text-[9rem] leading-[0.9] font-extrabold tracking-tighter text-foreground drop-shadow-2xl overflow-hidden pb-4 -mb-4 px-0.5 min-[375px]:px-0.5 min-[425px]:px-1 min-[768px]:px-0.5">
              <motion.span custom={1} variants={textReveal} className="block">
                Web
              </motion.span>
            </span>
            <span className="text-[8.5vw] min-[375px]:text-[9vw] min-[425px]:text-[9.5vw] min-[768px]:text-[4.8vw] sm:text-[8vw] md:text-[5rem] lg:text-[6.5rem] laptop:text-[7rem] xl:text-[7.5rem] laptop-lg:text-[9rem] leading-[0.9] font-extrabold tracking-tighter text-accent drop-shadow-2xl overflow-hidden pb-4 -mb-4 px-0.5 min-[375px]:px-0.5 min-[425px]:px-1 min-[768px]:px-0.5">
              <motion.span custom={2} variants={textReveal} className="block">
                Créatif
              </motion.span>
            </span>
          </div>
        </motion.div>

        {/* Image Layer - Parallax Up */}
        <motion.div
          style={{ y: yImage }}
          className="absolute bottom-0 z-10 flex justify-center items-end w-full h-full pointer-events-none will-change-transform"
        >
          <motion.div
            initial="hidden"
            animate="visible"
            variants={imageReveal}
            className="relative w-[70%] sm:w-[45%] md:w-[25%] lg:w-[20%] laptop:w-[22%] xl:w-[18%] laptop-lg:w-[20%] max-w-[300px] laptop-lg:max-w-[380px] mb-0 sm:mb-8 md:mb-0"
          >
            <Image
              src="/amoussougbo-serge.webp"
              alt="Anani Serge"
              width={320}
              height={427}
              className="w-full h-auto object-contain drop-shadow-2xl"
              priority={true}
              fetchPriority="high"
              sizes="(max-width: 640px) 70vw, (max-width: 1024px) 40vw, 25vw"
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
            <div className="flex items-center justify-center gap-3 sm:gap-4 md:gap-5 lg:gap-8 laptop:gap-6 laptop-lg:gap-8 px-4 sm:px-6 md:px-8 lg:px-10 laptop:px-8 laptop-lg:px-10 py-2.5 sm:py-3 md:py-3.5 lg:py-4 laptop:py-3 laptop-lg:py-4 rounded-full border border-border bg-surface/50 backdrop-blur-md shadow-2xl glass-subtle mx-auto">
              <div className="flex flex-col items-center min-w-0">
                <span className="text-2xl sm:text-3xl md:text-3xl lg:text-4xl laptop:text-3xl laptop-lg:text-4xl font-extrabold text-foreground font-heading whitespace-nowrap">
                  +3
                </span>
                <span className="text-[8px] sm:text-[9px] md:text-[9px] lg:text-[10px] laptop:text-[9px] laptop-lg:text-[10px] uppercase tracking-widest text-foreground-70 font-semibold mt-0.5 sm:mt-1 text-center leading-tight">
                  Années d&apos;expérience
                </span>
              </div>

              <div className="w-px h-8 sm:h-10 md:h-10 laptop-lg:h-10 bg-border shrink-0"></div>

              <div className="flex flex-col items-center min-w-0">
                <span className="text-2xl sm:text-3xl md:text-3xl lg:text-4xl laptop:text-3xl laptop-lg:text-4xl font-extrabold text-foreground font-heading whitespace-nowrap">
                  +15
                </span>
                <span className="text-[8px] sm:text-[9px] md:text-[9px] lg:text-[10px] laptop:text-[9px] laptop-lg:text-[10px] uppercase tracking-widest text-foreground-70 font-semibold mt-0.5 sm:mt-1 text-center leading-tight">
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
