import { Inter, Syne } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const syne = Syne({
  variable: "--font-syne",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  display: "swap",
});

export const metadata = {
  title: "Anani Serge - Développeur Web Full-Stack",
  description: "Expert en automatisations & dashboards. React, Next.js, n8n.",
  openGraph: {
    title: "Anani Serge - Développeur Web Full-Stack",
    description: "Expert en automatisations & dashboards. React, Next.js, n8n.",
    url: "https://serge-amoussougbo.dev",
    siteName: "Anani Serge Portfolio",
    images: [
      {
        url: "/api/og", // 👈 Ta route
        width: 1200,
        height: 630,
        alt: "Anani Serge - Portfolio",
      },
    ],
    locale: "fr_FR",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Anani Serge - Développeur Web Full-Stack",
    description: "Expert en automatisations & dashboards. React, Next.js, n8n.",
    images: ["/api/og"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr" suppressHydrationWarning={true} className="dark">
      <body className={`${inter.variable} ${syne.variable} antialiased`}>
        {children}
      </body>
    </html>
  );
}
