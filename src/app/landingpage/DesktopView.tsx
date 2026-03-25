"use client";

import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import styles from "../design/desktop.module.css";
// Ensure this image exists in your /public folder
import HouseImage from "../../../public/image_1.png"; 

export default function DesktopView() {
  const router = useRouter();

  return (
    <main className={styles.container}>
      {/* 1. TOP PROGRESS BAR (Visual timer) */}
      <div className={styles.topProgress} />

      {/* 2. PERSISTENT "GET STARTED" BUTTON (Top Right) */}
      <button 
        onClick={() => router.push("/world/main-world")}
        className="fixed top-10 right-10 z-[100] px-6 py-2 border border-white/20 text-white text-[9px] uppercase tracking-[0.4em] hover:bg-white hover:text-black transition-all duration-700 font-sans font-bold backdrop-blur-sm"
      >
        Get Started
      </button>

      {/* Background Layer */}
      <div className={styles.backgroundWrapper}>
        <Image 
          src={HouseImage}
          alt="Novelarc Luxury Digital Interior"
          fill
          priority
          className={styles.backgroundImage}
        />
        <div className="absolute inset-0 bg-black/20 pointer-events-none" />
      </div>

      {/* Elegant Content Overlay */}
      <section className={styles.content}>
        <h1 className={styles.title}>
          DIGITAL ARCHITECTURE<br />
          <span className={styles.titleItalic}>Awaits Your Vision</span>
        </h1>
        
        <h2 className={styles.subtitle}>
          Step into fully realized digital interiors.<br /> 
          Explore and select your perfect Philippine property.
        </h2>
        
        {/* We keep this button as a manual "Skip" to the About page or World */}
        <Link href="/about-system">
          <button className={styles.button}>
            Learn More
          </button>
        </Link>
      </section>

      {/* Floating Footer */}
      <footer className="absolute bottom-10 w-full flex justify-center z-20 opacity-30">
        <div className="font-sans text-[8px] font-bold uppercase tracking-[1.2em] text-white">
          ARC-V1 • 2026
        </div>
      </footer>
    </main>
  );
}
