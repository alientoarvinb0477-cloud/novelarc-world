"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import DesktopView from "./landingpage/DesktopView";
import MobileView from "./landingpage/MobileView";
import styles from "./design/desktop.module.css";

export default function LandingPage() {
  const [isMobile, setIsMobile] = useState<boolean | null>(null);
  const router = useRouter();

  useEffect(() => {
    const checkDevice = () => {
      const mobile = window.innerWidth <= 768 || ('ontouchstart' in window);
      setIsMobile(mobile);
    };

    checkDevice();
    window.addEventListener("resize", checkDevice);

    // --- 3 SECOND AUTOMATIC TIMER ---
    const timer = setTimeout(() => {
      router.push("/about-system");
    }, 4500); // 4.5s gives the user time to appreciate the fade-in before it moves

    return () => {
      window.removeEventListener("resize", checkDevice);
      clearTimeout(timer);
    };
  }, [router]);

  if (isMobile === null) return <div className="bg-black h-screen" />;

  return (
    <div className="relative">
      {/* GLOBAL GET STARTED BUTTON (Top Right) */}
      <button 
        onClick={() => router.push("/world/main-world")}
        className="fixed top-8 right-8 z-[100] px-6 py-2 border border-white/20 text-white text-[9px] uppercase tracking-[0.4em] hover:bg-white hover:text-black transition-all duration-500 font-sans font-bold"
      >
        Get Started
      </button>

      {isMobile ? <MobileView /> : <DesktopView />}
    </div>
  );
}
