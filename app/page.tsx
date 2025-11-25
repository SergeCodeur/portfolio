import ContactSection from "@/components/contact-section";
import ExpertiseSection from "@/components/expertise-section";
import HeroSection from "@/components/hero-section";
import ProcessAccordion from "@/components/process-accordion";
import ProcessExpandable from "@/components/process-expandable";
import ProcessOrbital from "@/components/process-orbital";
import ProcessSection from "@/components/process-section";
import ProjectsSection from "@/components/projects-section";
import ServicesSection from "@/components/services-section";
import SmoothScroll from "@/components/smooth-scroll";
import TestimonialsSection from "@/components/testimonials-section";

export default function Home() {
  return (
    <SmoothScroll>
      <main className="bg-[#050816] min-h-screen w-full selection:bg-[#FDFD96] selection:text-black">
        <HeroSection />
        <ServicesSection />
        <div className="bg-[#050816] relative z-20">
          <ProcessSection />
          <ProcessAccordion />
          <ProcessExpandable />
          <ProcessOrbital />
          <ProjectsSection />
          <ExpertiseSection />
          <TestimonialsSection />
          <ContactSection />
        </div>
      </main>
    </SmoothScroll>
  );
}
