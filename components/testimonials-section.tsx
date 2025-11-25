"use client";

import { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface Testimonial {
  id: number;
  quote: string;
  name: string;
  title: string;
  company: string;
  location?: string;
}

const TestimonialsSection = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const testimonials: Testimonial[] = [
    {
      id: 1,
      quote:
        "Anani a dépassé toutes nos attentes. Le dashboard a complètement transformé notre façon de travailler. Nous avons vu un ROI immédiat et nos équipes sont ravies de l'outil.",
      name: "Marie Kouassi",
      title: "Directrice Marketing",
      company: "Digital Boost Agency",
      location: "Cotonou, Bénin",
    },
    {
      id: 2,
      quote:
        "Un professionnel exceptionnel ! Le système d'automatisation qu'il a créé nous fait gagner plus de 20 heures par semaine. Communication parfaite et livraison dans les temps.",
      name: "Jean-Baptiste Adou",
      title: "CEO",
      company: "Tech Solutions Bénin",
      location: "Porto-Novo, Bénin",
    },
    {
      id: 3,
      quote:
        "Travail de qualité supérieure. Anani a su comprendre nos besoins complexes et livrer une solution sur mesure qui répond parfaitement à nos attentes. Je recommande sans hésitation !",
      name: "Sophie Mensah",
      title: "Fondatrice",
      company: "E-commerce Plus",
      location: "Lomé, Togo",
    },
  ];

  const nextTestimonial = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  const goToTestimonial = (index: number) => {
    setCurrentIndex(index);
  };

  // Auto-rotate every 6 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % testimonials.length);
    }, 6000);

    return () => clearInterval(interval);
  }, [testimonials.length]);

  const current = testimonials[currentIndex];

  return (
    <section className="w-full bg-background py-[120px] px-6 md:px-20">
      <div className="max-w-[1280px] mx-auto">
        {/* Header */}
        <div className="text-center mb-12 md:mb-16">
          <h2 className="text-3xl md:text-5xl font-heading font-bold text-foreground mb-4">
            Ce que disent mes clients
          </h2>
          <p className="text-base md:text-lg text-foreground-70 font-sans max-w-2xl mx-auto">
            Leur satisfaction, ma plus grande récompense
          </p>
        </div>

        {/* Carousel */}
        <div className="relative max-w-[800px] mx-auto">
          {/* Previous Button */}
          <button
            onClick={prevTestimonial}
            className="hidden md:flex absolute -left-20 top-1/2 -translate-y-1/2 w-14 h-14 rounded-full glass-subtle border border-border items-center justify-center hover:border-accent hover:scale-110 transition-all duration-300 z-10"
            aria-label="Témoignage précédent"
          >
            <ChevronLeft className="w-6 h-6 text-foreground" />
          </button>

          {/* Testimonial Card */}
          <div className="glass-subtle rounded-3xl p-8 md:p-14 border border-border relative overflow-hidden">
            {/* Quote Icon */}
            <div className="absolute top-6 left-6 md:top-8 md:left-8 text-accent/20 text-6xl md:text-8xl font-serif">
              &quot;
            </div>

            {/* Star Rating */}
            <div className="flex gap-1 mb-6 md:mb-8">
              {[...Array(5)].map((_, i) => (
                <span key={i} className="text-xl md:text-2xl text-accent">
                  ★
                </span>
              ))}
            </div>

            {/* Testimonial Text */}
            <p className="text-lg md:text-xl md:text-2xl text-foreground font-sans italic leading-relaxed mb-8 md:mb-10 relative z-10">
              {current.quote}
            </p>

            {/* Client Info */}
            <div className="flex items-center gap-4 relative z-10">
              <div className="w-12 h-12 md:w-16 md:h-16 rounded-full bg-surface border border-border flex items-center justify-center flex-shrink-0">
                <span className="text-lg md:text-xl font-heading font-bold text-foreground">
                  {current.name.charAt(0)}
                </span>
              </div>
              <div>
                <h4 className="text-base md:text-lg font-heading font-semibold text-foreground mb-1">
                  {current.name}
                </h4>
                <p className="text-sm md:text-base text-foreground-70 font-sans">
                  {current.title}, {current.company}
                </p>
                {current.location && (
                  <p className="text-xs md:text-sm text-foreground-50 font-sans mt-1">
                    {current.location}
                  </p>
                )}
              </div>
            </div>
          </div>

          {/* Next Button */}
          <button
            onClick={nextTestimonial}
            className="hidden md:flex absolute -right-20 top-1/2 -translate-y-1/2 w-14 h-14 rounded-full glass-subtle border border-border items-center justify-center hover:border-accent hover:scale-110 transition-all duration-300 z-10"
            aria-label="Témoignage suivant"
          >
            <ChevronRight className="w-6 h-6 text-foreground" />
          </button>

          {/* Mobile Navigation */}
          <div className="md:hidden flex items-center justify-center gap-4 mt-8">
            <button
              onClick={prevTestimonial}
              className="w-12 h-12 rounded-full glass-subtle border border-border flex items-center justify-center hover:border-accent transition-all"
              aria-label="Témoignage précédent"
            >
              <ChevronLeft className="w-5 h-5 text-foreground" />
            </button>

            {/* Dots Indicator */}
            <div className="flex gap-3">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => goToTestimonial(index)}
                  className={`transition-all duration-300 ${
                    index === currentIndex
                      ? "w-3 h-3 rounded-full bg-accent"
                      : "w-2 h-2 rounded-full bg-foreground/30"
                  }`}
                  aria-label={`Aller au témoignage ${index + 1}`}
                />
              ))}
            </div>

            <button
              onClick={nextTestimonial}
              className="w-12 h-12 rounded-full glass-subtle border border-border flex items-center justify-center hover:border-accent transition-all"
              aria-label="Témoignage suivant"
            >
              <ChevronRight className="w-5 h-5 text-foreground" />
            </button>
          </div>

          {/* Desktop Dots Indicator */}
          <div className="hidden md:flex justify-center gap-3 mt-8">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => goToTestimonial(index)}
                className={`transition-all duration-300 ${
                  index === currentIndex
                    ? "w-3 h-3 rounded-full bg-accent"
                    : "w-2 h-2 rounded-full bg-foreground/30"
                }`}
                aria-label={`Aller au témoignage ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;

