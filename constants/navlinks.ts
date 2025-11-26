export const navLinks = [
  { name: "Process", href: "#process" },
  { name: "Projets", href: "#projects" },
  { name: "Expertise", href: "#expertise" },
  { name: "Témoignages", href: "#testimonials" },
  { name: "Contact", href: "#contact" },
];

interface LenisInstance {
  scrollTo: (
    target: number | string | HTMLElement,
    options?: { duration?: number; easing?: (t: number) => number }
  ) => void;
}

declare global {
  interface Window {
    lenis?: LenisInstance;
  }
}

export const handleScroll = (
  e: React.MouseEvent<HTMLAnchorElement, MouseEvent>,
  href: string
) => {
  e.preventDefault();
  const element = document.querySelector(href);
  if (element) {
    // Utiliser Lenis si disponible, sinon fallback sur scrollIntoView
    const lenis = window.lenis;
    if (lenis) {
      const yOffset = -80; // Ajuster selon la hauteur de votre navbar
      const y =
        element.getBoundingClientRect().top + window.pageYOffset + yOffset;
      lenis.scrollTo(y, {
        duration: 1.5,
        easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      });
    } else {
      // Fallback si Lenis n'est pas disponible
      const yOffset = -80;
      const y =
        element.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({
        top: y,
        behavior: "smooth",
      });
    }
  }
};
