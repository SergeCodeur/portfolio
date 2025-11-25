import Topbar from "./topbar";
import HeroBanner from "./hero-banner";

const HeroSection = () => {
  return (
    <div className="relative w-full">
      <HeroBanner />
      <div className="absolute top-0 left-0 right-0 z-50">
        <Topbar />
      </div>
    </div>
  );
};

export default HeroSection;

