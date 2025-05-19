
import React from "react";

const Logo: React.FC = () => {
  return (
    <div className="flex items-center gap-2">
      <div className="relative w-8 h-8 rounded-md bg-synk-accent flex items-center justify-center text-white font-medium">
        <span className="absolute animate-pulse-glow">S</span>
      </div>
      <span className="font-semibold text-lg tracking-tight">Synk</span>
    </div>
  );
};

export default Logo;
