"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation"; // To handle the page change
import DesktopView from "./landingpage/DesktopView";
import MobileView from "./landingpage/MobileView";

export default function LandingPage() {
  const [isMobile, setIsMobile] = useState<boolean | null>(null);
  const router = useRouter();

  useEffect(() => {
    const checkDevice = () => {
      const mobile = window.innerWidth <= 768 || ('ontouchstart' in window);
      setTimeout(() => setIsMobile(mobile), 400);
    };

    checkDevice();
    window.addEventListener("resize", checkDevice);

    // --- SCROLL TO NEXT PAGE LOGIC ---
    // ... inside useEffect for handleScroll ...
const handleScroll = (e: WheelEvent) => {
  if (e.deltaY > 50) { 
    // This now sends them to your explanation/system page
    router.push("/about-system"); 
  }
};

    // Only add scroll listener on Desktop
    if (isMobile === false) {
      window.addEventListener("wheel", handleScroll);
    }

    return () => {
      window.removeEventListener("resize", checkDevice);
      window.removeEventListener("wheel", handleScroll);
    };
  }, [isMobile, router]);

  if (isMobile === null) {
    return (
      <div className="h-screen w-full bg-black flex flex-col items-center justify-center">
        <div className="w-10 h-10 border-2 border-stone-800 border-t-white rounded-full animate-spin" />
      </div>
    );
  }

  return isMobile ? <MobileView /> : <DesktopView />;
}
