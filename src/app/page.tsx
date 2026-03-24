"use client";

import React, { useEffect, useState } from "react";
import DesktopView from "./landingpage/DesktopView";
import MobileView from "./landingpage/MobileView";

export default function LandingPage() {
  const [isMobile, setIsMobile] = useState<boolean | null>(null);

  useEffect(() => {
    const checkDevice = () => {
      // Logic for mobile: Screen width or touch capability
      const mobile = window.innerWidth <= 768 || ('ontouchstart' in window);
      // Small delay for the spinner to feel smooth
      setTimeout(() => setIsMobile(mobile), 1000);
    };

    checkDevice();
    window.addEventListener("resize", checkDevice);
    return () => window.removeEventListener("resize", checkDevice);
  }, []);

  if (isMobile === null) {
    return (
      <div className="h-screen w-full bg-black flex flex-col items-center justify-center">
        <div className="w-12 h-12 border-2 border-orange-500/20 border-t-orange-600 rounded-full animate-spin" />
        <p className="mt-6 text-stone-700 text-[9px] uppercase tracking-[0.6em] animate-pulse">Initializing Arc OS</p>
      </div>
    );
  }

  return isMobile ? <MobileView /> : <DesktopView />;
}
