"use client";
import { motion, MotionValue, useScroll, useTransform } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRef } from "react";

interface CardProps {
  i: number;
  title: string;
  description: string;
  src: string;
  url: string;
  color: string;
  progress: MotionValue<number>;
  range: number[];
  targetScale: number;
}

export const Card = ({
  i,
  title,
  description,
  src,
  url,
  color,
  progress,
  range,
  targetScale,
}: CardProps) => {
  const container = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: container as React.RefObject<HTMLDivElement>,
    offset: ["start end", "start start"],
  });

  const imageScale = useTransform(scrollYProgress, [0, 1], [1.2, 1]);

  const scale = useTransform(progress, range, [1, targetScale]);

  return (
    <div
      ref={container}
      className="h-screen flex items-center justify-center sticky top-0"
    >
      <motion.div
        style={{
          backgroundColor: color,
          scale,
          top: `calc(-5vh + ${i * 25}px)`,
        }}
        className="flex flex-col relative -top-[25%] h-[450px] sm:h-[500px] w-[95%] sm:w-[90%] md:w-[1000px] rounded-[20px] sm:rounded-[25px] md:rounded-[30px] p-6 sm:p-8 md:p-12 origin-top border border-white/10 shadow-2xl overflow-hidden"
      >
        <div className="flex h-full gap-6 sm:gap-8 md:gap-10 flex-col md:flex-row">
          {/* Contenu Texte */}
          <div className="w-full md:w-[40%] relative z-10 flex flex-col justify-between">
            <div>
              <h2 className="text-2xl sm:text-3xl md:text-5xl font-bold font-syne text-[#050816] mb-3 sm:mb-4 leading-tight">
                {title}
              </h2>
              <p className="text-sm sm:text-base md:text-lg text-[#050816]/70 font-sans leading-relaxed">
                {description}
              </p>
            </div>

            <div className="flex items-center gap-4 mt-4 sm:mt-6 md:mt-0">
              <Link
                href={url}
                className="flex items-center gap-2 text-[#050816] font-bold uppercase tracking-widest text-xs sm:text-sm border-b border-[#050816] pb-1 cursor-pointer hover:opacity-70 transition-opacity"
              >
                Voir le projet
                <ArrowUpRight className="w-3 h-3 sm:w-4 sm:h-4" />
              </Link>
            </div>
          </div>

          <div className="relative w-full md:w-[60%] h-[200px] sm:h-[250px] md:h-full rounded-xl sm:rounded-2xl overflow-hidden shadow-inner">
            <motion.div
              style={{ scale: imageScale }}
              className="w-full h-full relative"
            >
              <Image fill src={src} alt={title} className="object-cover" />
            </motion.div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};
