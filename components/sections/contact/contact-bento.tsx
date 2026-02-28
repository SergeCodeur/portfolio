"use client";
import { GitHub, LinkedIn, XformerlyTwitter } from "@/components/icons";
import { motion } from "framer-motion";
import { ArrowUpRightIcon, CalendarBlankIcon, EnvelopeIcon } from "@phosphor-icons/react";
import Link from "next/link";

const ContactBento = () => {
  return (
    <section
      id="contact"
      className="w-full py-16 px-4 sm:py-20 md:py-32 md:px-8"
    >
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-12 sm:mb-16 md:mb-20">
          <h2 className="text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-black text-white font-syne leading-[0.95] mb-6 md:mb-8">
            Un Projet
            <br />
            <span className="text-primary">En Tête ?</span>
          </h2>
          <p className="text-base sm:text-lg text-white/70 max-w-xl">
            Parlons-en ! Réservez 30 minutes gratuites pour transformer votre
            idée en réalité.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 lg:h-[500px]">
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="md:col-span-2 bg-white/5 border border-white/10 rounded-2xl sm:rounded-3xl p-6 sm:p-8 md:p-10 lg:p-12 flex flex-col justify-between group hover:bg-white/10 transition-colors duration-500 min-h-[280px] sm:min-h-80 lg:min-h-0"
          >
            <div>
              <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-[#ffd966] flex items-center justify-center mb-4 sm:mb-6">
                <EnvelopeIcon className="text-[#0a1628] w-5 h-5 sm:w-6 sm:h-6" />
              </div>
              <h3 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white font-syne mb-2 sm:mb-3">
                Lancer un projet
              </h3>
              <p className="text-sm sm:text-base text-gray-400 max-w-md">
                Vous avez une idée ? Discutons-en. Je réponds généralement sous
                24h.
              </p>
            </div>
            <a
              href="mailto:amoussougboserge@gmail.com"
              className="mt-6 sm:mt-8 text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold text-white border-b border-white/30 pb-2 self-start group-hover:border-[#ffd966] group-hover:text-primary transition-all break-all sm:break-normal"
            >
              amoussougboserge@gmail.com
            </a>
          </motion.div>

          <div className="flex flex-col gap-4 sm:gap-5 md:gap-6">
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.5, delay: 0.1, ease: "easeOut" }}
              className="bg-white/5 border border-white/10 rounded-2xl sm:rounded-3xl p-6 sm:p-8 flex flex-col justify-center gap-3 sm:gap-4 lg:flex-1"
            >
              <span className="text-xs uppercase tracking-widest text-gray-500 mb-1 sm:mb-2">
                Réseaux
              </span>
              {[
                {
                  name: "LinkedIn",
                  icon: LinkedIn,
                  href: "https://linkedin.com/in/serge-anani-amoussougbo",
                },
                {
                  name: "GitHub",
                  icon: GitHub,
                  href: "https://github.com/serge-codeur",
                },
                {
                  name: "Twitter",
                  icon: XformerlyTwitter,
                  href: "https://twitter.com/s_amoussougbo",
                },
              ].map((social, i) => (
                <Link
                  key={i}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between group py-1"
                >
                  <div className="flex items-center gap-3 text-white group-hover:text-primary transition-colors">
                    <social.icon className="sm:w-5 sm:h-5 w-4 h-4 fill-current" />
                    <span className="font-bold text-base sm:text-lg">
                      {social.name}
                    </span>
                  </div>
                  <ArrowUpRightIcon
                    size={20}
                    className="text-gray-600 group-hover:text-primary group-hover:rotate-45 transition-all"
                  />
                </Link>
              ))}
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.5, delay: 0.2, ease: "easeOut" }}
              className="lg:flex-1"
            >
              <Link
                href="https://calendly.com/serge-amoussougbo/30min"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-primary rounded-2xl sm:rounded-3xl p-6 sm:p-8 text-background flex flex-col justify-center group cursor-pointer relative overflow-hidden min-h-40 sm:min-h-[180px] h-full"
              >
                <div className="flex items-center justify-between mb-3 sm:mb-4 relative z-10">
                  <div className="flex items-center gap-2">
                    <CalendarBlankIcon size={18} className="sm:w-5 sm:h-5" />
                    <span className="font-bold uppercase tracking-wide text-xs sm:text-sm">
                      Appel Gratuit
                    </span>
                  </div>
                  <ArrowUpRightIcon
                    size={24}
                    className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform"
                  />
                </div>
                <div className="text-3xl sm:text-4xl font-black font-syne relative z-10 leading-tight">
                  Réserver <br /> 30 min.
                </div>

                <div className="absolute -bottom-10 -right-10 w-24 h-24 sm:w-32 sm:h-32 bg-black/10 rounded-full blur-2xl group-hover:scale-150 transition-transform duration-500" />
              </Link>
            </motion.div>
          </div>
        </div>

        {/* Footer Bottom */}
        <div className="mt-12 sm:mt-16 md:mt-20 flex flex-row justify-between items-center border-t border-white/10 pt-6 sm:pt-8 text-gray-400 text-xs sm:text-sm uppercase tracking-widest">
          <span>© {new Date().getFullYear()} Anani Serge</span>
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="hover:text-primary transition-colors cursor-pointer"
          >
            Back to top ↑
          </button>
        </div>
      </div>
    </section>
  );
};

export default ContactBento;
