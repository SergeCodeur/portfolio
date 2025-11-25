"use client";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

const ContactSection = () => {
  const container = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: container as React.RefObject<HTMLDivElement>,
    offset: ["start end", "end end"],
  });
  const y = useTransform(scrollYProgress, [0, 1], [-100, 0]);

  return (
    <div
      ref={container}
      className="relative h-[80vh] bg-[#050816] text-white flex flex-col items-center justify-center overflow-hidden"
    >
      <motion.div style={{ y }} className="relative z-10 text-center">
        <h2 className="text-[10vw] font-black uppercase leading-none tracking-tighter">
          Parlons
        </h2>
        <h2 className="text-[10vw] font-black uppercase leading-none tracking-tighter text-[#FDFD96]">
          Projet ?
        </h2>

        <div className="mt-12">
          <button className="group relative px-10 py-5 rounded-full bg-white text-black font-bold text-xl overflow-hidden">
            <span className="relative z-10 group-hover:text-white transition-colors duration-300">
              serge@example.com
            </span>
            <div className="absolute inset-0 bg-[#FDFD96] translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-in-out z-0"></div>
          </button>
        </div>
      </motion.div>

      <div className="absolute bottom-10 w-full flex justify-between px-10 text-sm text-gray-500 uppercase tracking-widest">
        <span>© 2024 Anani Serge</span>
        <span>Benin, Cotonou</span>
        <span>
          Local Time:{" "}
          {new Date().toLocaleTimeString("fr-FR", {
            hour: "2-digit",
            minute: "2-digit",
          })}
        </span>
      </div>
    </div>
  );
};

export default ContactSection;
