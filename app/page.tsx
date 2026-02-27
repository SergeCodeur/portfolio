import SmoothScroll from "@/components/layout/smooth-scroll";
import ContactBento from "@/components/sections/contact/contact-bento";
import ExpertiseEditorial from "@/components/sections/expertise/expertise-editorial";
import HeroSection from "@/components/sections/hero/hero-section";
import ProcessSection from "@/components/sections/process/process-section";
import ProjectsSection from "@/components/sections/projects/projects-section";
import ServicesSection from "@/components/sections/services/services-section";
import TestimonialsSection from "@/components/sections/testimonials/testimonials-section";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

export default async function Home() {
  const [projects, services, testimonials, steps, expertise] =
    await Promise.all([
      prisma.project.findMany({
        where: { visible: true },
        orderBy: { order: "asc" },
        select: {
          id: true,
          title: true,
          description: true,
          imagePath: true,
          link: true,
          color: true,
          textColor: true,
          order: true,
          visible: true,
        },
      }),
      prisma.service.findMany({
        where: { visible: true },
        orderBy: { order: "asc" },
        select: {
          id: true,
          title: true,
          subtitle: true,
          description: true,
          deliverables: true,
          icon: true,
          color: true,
          examples: true,
          order: true,
          visible: true,
        },
      }),
      prisma.testimonial.findMany({
        where: { visible: true },
        orderBy: { order: "asc" },
        select: {
          id: true,
          quote: true,
          name: true,
          role: true,
          order: true,
          visible: true,
        },
      }),
      prisma.processStep.findMany({
        where: { visible: true },
        orderBy: { order: "asc" },
        select: {
          id: true,
          number: true,
          icon: true,
          title: true,
          duration: true,
          detail: true,
          description: true,
          order: true,
          visible: true,
        },
      }),
      prisma.expertiseCategory.findMany({
        where: { visible: true },
        orderBy: { order: "asc" },
        select: {
          id: true,
          category: true,
          description: true,
          items: true,
          order: true,
          visible: true,
        },
      }),
    ]);

  return (
    <SmoothScroll>
      <main className="bg-[#050816] min-h-screen w-full selection:bg-accent selection:text-black">
        <HeroSection />
        <ServicesSection services={services} />
        <div className="relative z-20">
          <ProcessSection steps={steps} />
          <ProjectsSection projects={projects} />
          <ExpertiseEditorial categories={expertise} />
          <TestimonialsSection testimonials={testimonials} />
          <ContactBento />
        </div>
      </main>
    </SmoothScroll>
  );
}
