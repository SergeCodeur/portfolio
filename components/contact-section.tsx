"use client";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import TimeDisplay from "./time-display";

const ContactSection = () => {
  const container = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: container as React.RefObject<HTMLDivElement>,
    offset: ["start end", "end end"],
  });
  const y = useTransform(scrollYProgress, [0, 1], [-100, 0]);

  return (
    <div
      id="contact"
      ref={container}
      className="relative h-[70vh] sm:h-[80vh] bg-[#050816] text-white flex flex-col items-center justify-center overflow-hidden"
    >
      <motion.div style={{ y }} className="relative z-10 text-center px-4">
        <h2 className="text-[12vw] sm:text-[10vw] md:text-[8vw] font-black uppercase leading-none tracking-tighter">
          Parlons
        </h2>
        <h2 className="text-[12vw] sm:text-[10vw] md:text-[8vw] font-black uppercase leading-none tracking-tighter text-accent">
          Projet ?
        </h2>

        <div className="mt-8 sm:mt-12">
          <button className="group relative px-6 sm:px-8 md:px-10 py-3 sm:py-4 md:py-5 rounded-full bg-white text-black font-bold text-base sm:text-lg md:text-xl overflow-hidden">
            <span className="relative z-10 group-hover:text-white transition-colors duration-300 break-all sm:break-normal">
              serge@example.com
            </span>
            <div className="absolute inset-0 bg-accent translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-in-out z-0"></div>
          </button>
        </div>
      </motion.div>

      <div className="absolute bottom-4 sm:bottom-6 md:bottom-10 w-full flex flex-col sm:flex-row justify-between items-center sm:items-start gap-2 sm:gap-0 px-4 sm:px-6 md:px-10 text-xs sm:text-sm text-gray-500 uppercase tracking-widest">
        <span className="text-center sm:text-left">
          © {new Date().getFullYear()} Anani Serge
        </span>
        <span className="text-center sm:text-left">Benin, Cotonou</span>
        <TimeDisplay />
      </div>
    </div>
  );
};

export default ContactSection;
