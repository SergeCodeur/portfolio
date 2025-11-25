import Image from "next/image";

const HeroBanner = () => {
  return (
    <div className="relative min-h-screen w-full bg-background text-foreground overflow-hidden font-heading flex flex-col">
      <div className="grow flex flex-col items-center justify-center relative">
        <div className="absolute top-28 md:top-32 lg:top-40 left-0 right-0 flex flex-col items-center w-full z-20 select-none">
          <h1 className="text-[6vw] md:text-[5rem] lg:text-[6rem] leading-[0.9] font-extrabold uppercase tracking-tighter text-foreground drop-shadow-2xl">
            Développeur
          </h1>

          <div className="flex w-full justify-center gap-[6vw] md:gap-12 lg:gap-16 mt-1 md:mt-2">
            <span className="text-[6vw] md:text-[5rem] lg:text-[6rem] leading-[0.9] font-extrabold uppercase tracking-tighter text-foreground drop-shadow-2xl">
              Web
            </span>
            <span className="text-[6vw] md:text-[5rem] lg:text-[6rem] leading-[0.9] font-extrabold uppercase tracking-tighter text-accent drop-shadow-2xl">
              Créatif
            </span>
          </div>
        </div>

        <div className="absolute bottom-0 z-10 flex justify-center items-end w-full h-full pointer-events-none">
          <div className="relative w-[50%] md:w-[25%] lg:w-[20%] max-w-[320px]">
            <Image
              src="/serge.png"
              alt="Anani Serge"
              width={320}
              height={427}
              className="w-full h-auto object-contain drop-shadow-2xl opacity-70"
              priority
            />

            <div className="absolute bottom-0 left-0 w-full h-1/3 bg-gradient-to-t from-background via-background/80 to-transparent"></div>
          </div>
        </div>

        <div className="absolute bottom-8 z-20">
          <div className="flex items-center gap-8 md:gap-16 px-8 md:px-12 py-4 md:py-5 rounded-full border border-border bg-surface/50 backdrop-blur-md shadow-2xl glass-subtle">
            <div className="flex flex-col items-center">
              <span className="text-2xl md:text-3xl font-extrabold text-foreground font-heading">
                +3
              </span>
              <span className="text-[10px] md:text-xs uppercase tracking-widest text-foreground-70 font-semibold mt-1">
                Années d&apos;expérience
              </span>
            </div>

            <div className="w-px h-8 bg-border"></div>

            <div className="flex flex-col items-center">
              <span className="text-2xl md:text-3xl font-extrabold text-foreground font-heading">
                +15
              </span>
              <span className="text-[10px] md:text-xs uppercase tracking-widest text-foreground-70 font-semibold mt-1">
                Projets Web Réalisés
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroBanner;
