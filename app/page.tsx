import ContactSection from "@/components/contact-section";
import ExpertiseSection from "@/components/expertise-section";
import HeroSection from "@/components/hero-section";
import ProcessSection from "@/components/process-section";
import ProjectsSection from "@/components/projects-section";
import ServicesSection from "@/components/services-section";
import TestimonialsSection from "@/components/testimonials-section";

export default function Home() {
  return (
    <div className="relative">
      <HeroSection />
      <ServicesSection />
      <ProjectsSection />
      <ProcessSection />
      <ExpertiseSection />
      <TestimonialsSection />
      <ContactSection />
    </div>
  );
}
