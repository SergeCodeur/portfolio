import Image from "next/image";
import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-4">
      <div className="text-center max-w-md">
        <Image
          src="/astronaut-404.svg"
          alt="Astronaute perdu dans l'espace"
          width={320}
          height={320}
          className="mx-auto mb-6"
          priority
        />

        <p className="text-8xl font-heading font-bold text-accent">404</p>
        <p className="text-lg text-foreground-70 mt-4">
          Perdu dans l&apos;espace. Cette page n&apos;existe pas.
        </p>
        <Link
          href="/"
          className="inline-block mt-8 px-6 py-3 rounded-lg bg-accent text-background font-semibold hover:bg-accent/90 transition-colors"
        >
          Retour à l&apos;accueil
        </Link>
      </div>
    </div>
  );
}
