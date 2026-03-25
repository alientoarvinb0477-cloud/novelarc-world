"use client";

import React, { useEffect, useState } from "react";
import DesktopView from "./landingpage/DesktopView";
import MobileView from "./landingpage/MobileView";

export default function LandingPage() {
  const [isMobile, setIsMobile] = useState<boolean | null>(null);

  useEffect(() => {
    const checkDevice = () => {
      const mobile = window.innerWidth <= 768 || ('ontouchstart' in window);
      // Even faster transition for lower latency
      setTimeout(() => setIsMobile(mobile), 400);
    };

    checkDevice();
    window.addEventListener("resize", checkDevice);
    return () => window.removeEventListener("resize", checkDevice);
  }, []);

  if (isMobile === null) {
    return (
      <div className="h-screen w-full bg-black flex flex-col items-center justify-center">
        <div className="w-10 h-10 border-2 border-stone-800 border-t-white rounded-full animate-spin" />
        <p className="mt-6 text-stone-600 text-[9px] uppercase tracking-[0.6em] animate-pulse">NOVELARC</p>
      </div>
    );
  }

  return isMobile ? <MobileView /> : <DesktopView />;
}
