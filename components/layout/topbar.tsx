"use client";
import { handleScroll, navLinks } from "@/constants/navlinks";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, X } from "lucide-react";
import Image from "next/image";
import { useState } from "react";

const TopbarMagnetic = () => {
  const [isOpen, setIsOpen] = useState(false);

  const handleLinkClick = (
    e: React.MouseEvent<HTMLAnchorElement, MouseEvent>,
    href: string
  ) => {
    handleScroll(e, href);
    setIsOpen(false);
  };

  return (
    <>
      <motion.nav
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1], delay: 0.2 }}
        className="fixed top-0 left-0 right-0 z-50 px-4 sm:px-6 md:px-12 py-4 sm:py-6 flex justify-between items-center bg-linear-to-b from-[#050816] to-transparent pointer-events-auto"
      >
        {/* Logo Area */}
        <div className="flex items-center gap-2 sm:gap-4 glass-subtle px-2 sm:px-4 py-1.5 xl:py-2 rounded-full border border-border bg-surface/50 backdrop-blur-md">
          <div className="relative w-6 h-6 sm:w-7 sm:h-7 rounded-full overflow-hidden shrink-0">
            <Image
              src="/serge.webp"
              alt="Profile"
              width={32}
              height={32}
              className="object-cover"
              priority
            />
          </div>
          <span className="text-xs sm:text-sm font-bold text-white tracking-wide hidden sm:inline">
            Anani Serge
          </span>
        </div>

        {/* Desktop Links (Hidden on mobile) */}
        <div className="hidden lg:flex gap-6 xl:gap-8 items-center bg-surface/50 backdrop-blur-md px-6 xl:px-8 py-2.5 xl:py-3 rounded-full border border-border glass-subtle">
          {navLinks.slice(0, 4).map((link, i) => (
            <a
              key={i}
              href={link.href}
              onClick={(e) => handleLinkClick(e, link.href)}
              className="text-sm font-medium text-gray-300 hover:text-accent transition-colors relative group"
            >
              {link.name}
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-accent transition-all group-hover:w-full"></span>
            </a>
          ))}
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setIsOpen(true)}
          aria-label="Ouvrir le menu"
          className="lg:hidden w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-accent flex items-center justify-center text-black shrink-0"
        >
          <Menu className="w-5 h-5 sm:w-6 sm:h-6" />
        </button>
      </motion.nav>

      {/* Mobile Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{
              type: "spring",
              stiffness: 100,
              damping: 25,
              mass: 0.8,
            }}
            className="fixed inset-0 z-60 bg-background flex flex-col p-6 sm:p-8 lg:hidden"
          >
            <div className="flex justify-end mb-8 sm:mb-12">
              <button
                onClick={() => setIsOpen(false)}
                aria-label="Fermer le menu"
                className="p-2 bg-white/10 rounded-full text-white"
              >
                <X className="w-6 h-6 sm:w-8 sm:h-8" />
              </button>
            </div>
            <div className="flex flex-col gap-4 sm:gap-6">
              {navLinks.map((link, i) => (
                <a
                  key={i}
                  href={link.href}
                  onClick={(e) => handleLinkClick(e, link.href)}
                  className="text-3xl sm:text-4xl font-bold text-white font-syne hover:text-accent"
                >
                  {link.name}
                </a>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default TopbarMagnetic;
