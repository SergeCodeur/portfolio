import ContactSection from "@/components/contact-section";
import ExpertiseEditorial from "@/components/expertise-editorial";
import HeroSection from "@/components/hero-section";
import ProcessSection from "@/components/process-section";
import ProjectsSection from "@/components/projects-section";
import ServicesSection from "@/components/services-section";
import SmoothScroll from "@/components/smooth-scroll";
import TestimonialsSection from "@/components/testimonials-section";

export default function Home() {
  return (
    <SmoothScroll>
      <main className="bg-[#050816] min-h-screen w-full selection:bg-accent selection:text-black">
        <HeroSection />
        <ServicesSection />
        <div className="bg-[#050816] relative z-20">
          <ProcessSection />
          <ProjectsSection />
          <ExpertiseEditorial />
          <TestimonialsSection />
          <ContactSection />
        </div>
      </main>
    </SmoothScroll>
  );
}
