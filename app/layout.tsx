import { Analytics } from "@vercel/analytics/next";
import { Toaster } from "@/components/ui/sonner";
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
  metadataBase: new URL("https://sergecodeur.com"),
  title: "Anani Serge - Développeur Web Full-Stack",
  description:
    "Développeur Web Full-Stack. Je transforme vos idées en applications performantes et booste votre productivité grâce à l'automatisation.",
  openGraph: {
    title: "Anani Serge - Développeur Web Full-Stack",
    description:
      "Développeur Web Full-Stack. Je transforme vos idées en applications performantes et booste votre productivité grâce à l'automatisation.",
    url: "https://sergecodeur.com",
    siteName: "Anani Serge Portfolio",
    images: [
      {
        url: "/api/og",
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
    description:
      "Développeur Web Full-Stack. Je transforme vos idées en applications performantes et booste votre productivité grâce à l'automatisation.",
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
        <Toaster richColors position="top-right" />
        <Analytics />
      </body>
    </html>
  );
}
