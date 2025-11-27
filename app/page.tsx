import SmoothScroll from "@/components/layout/smooth-scroll";
import ContactBento from "@/components/sections/contact/contact-bento";
import ExpertiseEditorial from "@/components/sections/expertise/expertise-editorial";
import HeroSection from "@/components/sections/hero/hero-section";
import ProcessSection from "@/components/sections/process/process-section";
import ProjectsSection from "@/components/sections/projects/projects-section";
import ServicesSection from "@/components/sections/services/services-section";
import TestimonialsSection from "@/components/sections/testimonials/testimonials-section";

export default function Home() {
  return (
    <SmoothScroll>
      <main className="bg-[#050816] min-h-screen w-full selection:bg-accent selection:text-black">
        <HeroSection />
        <ServicesSection />
        <div className="relative z-20">
          <ProcessSection />
          <ProjectsSection />
          <ExpertiseEditorial />
          <TestimonialsSection />
          <ContactBento />
        </div>
      </main>
    </SmoothScroll>
  );
}
