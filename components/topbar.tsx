import { Menu } from "lucide-react";
import Image from "next/image";

const Topbar = () => {
  return (
    <nav className="flex justify-between items-center px-6 py-6 md:px-12 z-50">
      <div className="flex items-center gap-4">
        <div className="relative w-12 h-12 rounded-full overflow-hidden border-2 border-white/20">
          <Image
            src="/serge.png"
            alt="Profile"
            width={48}
            height={48}
            className="w-full h-full object-cover object-top bg-gray-800"
            priority
          />
        </div>
        <span className="text-sm md:text-base font-medium tracking-wide text-gray-200 font-sans">
          Anani Serge AMOUSSOUGBO
        </span>
      </div>

      <button 
        className="flex items-center gap-2 bg-[#1c2230] hover:bg-[#2a3245] transition-colors px-5 py-2.5 rounded-full border border-white/10 glass hover-lift"
        aria-label="Menu"
      >
        <span className="text-sm font-medium text-gray-300 font-sans">Menu</span>
        <Menu className="w-4 h-4 text-gray-300" />
      </button>
    </nav>
  );
};

export default Topbar;

