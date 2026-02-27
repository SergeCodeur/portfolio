import { PrismaClient } from "../generated/prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import { hash } from "bcryptjs";
import "dotenv/config";

const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL! });
const prisma = new PrismaClient({ adapter });

async function main() {
  // Create admin user
  const passwordHash = await hash("admin123", 12);
  await prisma.user.upsert({
    where: { email: "admin@sergecodeur.com" },
    update: {},
    create: {
      email: "admin@sergecodeur.com",
      passwordHash,
    },
  });

  // Seed Projects
  const projects = [
    {
      title: "Subvio",
      description:
        "Application SaaS de gestion d'abonnements permettant de visualiser, analyser et optimiser tous vos services en un seul endroit. Interface moderne avec tableau de bord intuitif, suivi des dépenses récurrentes et alertes de renouvellement pour une maîtrise totale de vos abonnements.",
      imagePath: "/subvio.png",
      link: "https://subvio.sergeamoussougbo.com",
      color: "#0A0A0B",
      textColor: "#FFFFFF",
      order: 0,
    },
    {
      title: "Horizon Laby",
      description:
        "Plateforme suisse d'automatisation par intelligence artificielle pour les agents immobiliers. Gestion automatisée des emails, assistant téléphonique 24/7 et estimations immobilières intelligentes pour réduire les tâches répétitives et augmenter la productivité.",
      imagePath: "/horizon-laby.png",
      link: "https://horizonlaby.com",
      color: "#0F172A",
      textColor: "#FFFFFF",
      order: 1,
    },
    {
      title: "eNewGen",
      description:
        "Entreprise de transformation digitale proposant des services d'ingénierie, de conseil et de sourcing de talents. Automatisation des processus métiers via IA, blockchain et IoT avec un programme de formation innovant en partenariat avec 10.000 Codeurs.",
      imagePath: "/enewgen.png",
      link: "https://enewgen.com",
      color: "#1E3A8A",
      textColor: "#FFFFFF",
      order: 2,
    },
    {
      title: "Tokena App",
      description:
        "Plateforme complète de suivi d'investissements en cryptomonnaie avec tableau de bord en temps réel. Développée en Next.js lors du challenge FigmaToCode Edition 2, elle offre une expérience utilisateur moderne pour la gestion de portefeuille crypto.",
      imagePath: "/Tokena.webp",
      link: "https://tokena.vercel.app",
      color: "#E8ECF1",
      textColor: "#1E293B",
      order: 3,
    },
    {
      title: "Equinox",
      description:
        "Plateforme d'apprentissage innovante alimentée par l'intelligence artificielle. Développée en Next.js, elle révolutionne l'expérience éducative avec des outils d'apprentissage personnalisés et une interface moderne.",
      imagePath: "/Equinox.webp",
      link: "https://equinox-drab.vercel.app/",
      color: "#1A1625",
      textColor: "#FFFFFF",
      order: 4,
    },
    {
      title: "Ballamas",
      description:
        "Site web de vente en ligne spécialisé dans la mode contemporaine et les vêtements décontractés. Collection variée avec navigation intuitive et design minimaliste moderne, reflétant une démarche responsable dans la production.",
      imagePath: "/Site-e-commerce-de-mode-Ballamas.webp",
      link: "https://figma-to-code-ed2-week2-zeta.vercel.app/",
      color: "#F5F5F5",
      textColor: "#050816",
      order: 5,
    },
    {
      title: "Doctor",
      description:
        "Site web et tableau de bord médical fictif développé en Next.js lors du challenge FigmaToCode. Interface moderne et professionnelle pour la gestion de rendez-vous médicaux, avec un design épuré mettant en avant la confiance et la qualité des soins.",
      imagePath: "/Doctor.webp",
      link: "https://doctor-kohl.vercel.app/",
      color: "#EEF4F8",
      textColor: "#1E3A5F",
      order: 6,
    },
  ];

  for (const project of projects) {
    await prisma.project.create({ data: project });
  }

  // Seed Services
  const services = [
    {
      title: "Applications Web Sur Mesure",
      subtitle: "Sites & Apps qui convertissent",
      description:
        "Du site vitrine au SaaS complexe. React, Next.js, design moderne et performance optimale. Code propre, documenté et scalable.",
      deliverables: "Design • Dev • Déploiement",
      icon: "Code",
      color: "bg-blue-500",
      examples: ["E-commerce", "SaaS", "Landing Pages"],
      order: 0,
    },
    {
      title: "Automatisation Intelligente",
      subtitle: "Gagnez 10h/semaine",
      description:
        "Connectez vos outils avec n8n, Make ou Zapier. Workflows automatiques pour emails, CRM, reporting et bien plus.",
      deliverables: "Audit • Config • Tests • Documentation",
      icon: "Zap",
      color: "bg-yellow-400",
      examples: ["n8n Workflows", "API Sync", "Webhooks"],
      order: 1,
    },
    {
      title: "Dashboards Analytiques",
      subtitle: "Visualisez, décidez, agissez",
      description:
        "Tableaux de bord temps réel pour piloter votre business. Connectés à vos outils (Shopify, Stripe, CRM, Analytics).",
      deliverables: "Design • Intégrations • Rapports • Updates",
      icon: "BarChart3",
      color: "bg-purple-500",
      examples: ["KPIs", "Reporting", "Metrics"],
      order: 2,
    },
  ];

  for (const service of services) {
    await prisma.service.create({ data: service });
  }

  // Seed Testimonials
  const testimonials = [
    {
      quote:
        "Notre site e-commerce Next.js a augmenté nos ventes de 40% en 3 mois. Code propre et facile à maintenir.",
      name: "Sophie Mensah",
      role: "Fondatrice, E-commerce Plus",
      order: 0,
    },
    {
      quote:
        "L'automatisation n8n connecte maintenant notre CRM, emailing et comptabilité. On gagne 25h/semaine et les erreurs manuelles ont disparu.",
      name: "Jean-Baptiste Adou",
      role: "CEO, Tech Solutions Bénin",
      order: 1,
    },
    {
      quote:
        "Le dashboard avec Shopify et Stripe nous permet de prendre des décisions éclairées. Interface intuitive et données à jour.",
      name: "Marie Kouassi",
      role: "Directrice Marketing, Digital Boost",
      order: 2,
    },
    {
      quote:
        "Application SaaS livrée en 8 semaines avec toutes les fonctionnalités. Équipe ravie, très professionnel.",
      name: "David Koffi",
      role: "CTO, StartupLab",
      order: 3,
    },
  ];

  for (const testimonial of testimonials) {
    await prisma.testimonial.create({ data: testimonial });
  }

  // Seed Process Steps
  const processSteps = [
    {
      number: 1,
      icon: "Phone",
      title: "Découverte",
      duration: "30 min",
      detail: "Gratuit",
      description:
        "On clarifie votre vision ensemble. Vous repartez avec une roadmap claire et un premier devis estimatif.",
      order: 0,
    },
    {
      number: 2,
      icon: "FileCheck",
      title: "Proposition",
      duration: "48h max",
      detail: "Devis fixe",
      description:
        "Proposition détaillée avec prix ferme, timeline précise et stack technique. Aucune surprise sur le budget.",
      order: 1,
    },
    {
      number: 3,
      icon: "Palette",
      title: "Design",
      duration: "1-2 semaines",
      detail: "Figma + Révisions",
      description:
        "Des prototypes haute-fidélité pour visualiser le résultat final. Vous validez chaque écran et chaque interaction avant le développement.",
      order: 2,
    },
    {
      number: 4,
      icon: "Code",
      title: "Développement",
      duration: "4-12 semaines",
      detail: "Updates hebdo",
      description:
        "Code moderne et documenté. Vous suivez l'avancement en temps réel via des démos hebdomadaires.",
      order: 3,
    },
    {
      number: 5,
      icon: "Rocket",
      title: "Lancement",
      duration: "1 journée",
      detail: "Accompagnement",
      description:
        "Déploiement production, documentation complète et vidéos tutoriels. Vous êtes 100% autonome dès le jour 1.",
      order: 4,
    },
  ];

  for (const step of processSteps) {
    await prisma.processStep.create({ data: step });
  }

  // Seed Expertise Categories
  const expertiseCategories = [
    {
      category: "Frontend",
      description: "Interfaces modernes, performantes et accessibles",
      items: [
        "React",
        "Next.js",
        "TypeScript",
        "Tailwind",
        "Framer Motion",
        "Three.js",
      ],
      order: 0,
    },
    {
      category: "Backend",
      description:
        "APIs REST/GraphQL, bases de données relationnelles et NoSQL",
      items: [
        "Node.js",
        "Express",
        "PostgreSQL",
        "Supabase",
        "Python",
        "Prisma",
      ],
      order: 1,
    },
    {
      category: "Automatisation",
      description: "Automatisation de workflows et intégrations API",
      items: ["n8n", "Make", "Zapier", "Webhooks"],
      order: 2,
    },
    {
      category: "DevOps",
      description: "Déploiement, conteneurisation et infrastructure cloud",
      items: ["Vercel", "Docker", "GitHub Actions", "AWS"],
      order: 3,
    },
  ];

  for (const category of expertiseCategories) {
    await prisma.expertiseCategory.create({ data: category });
  }

  console.log("Seed completed successfully!");
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
