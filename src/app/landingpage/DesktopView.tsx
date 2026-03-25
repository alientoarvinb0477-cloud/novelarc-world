"use client";

import Image from "next/image";
import styles from "../design/desktop.module.css";
import HouseImage from "../../../public/image_1.png"; 

export default function DesktopView() {
  return (
    <main className={styles.container}>
      {/* 1. TOP PROGRESS BAR */}
      <div className={styles.topProgress} />

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

      {/* Content Overlay (Now fades out at 4s) */}
      <section className={styles.content}>
        <h1 className={styles.title}>
          DIGITAL ARCHITECTURE<br />
          <span className={styles.titleItalic}>Awaits Your Vision</span>
        </h1>
        
        <h2 className={styles.subtitle}>
          Step into fully realized digital interiors.<br /> 
          Explore and select your perfect Philippine property.
        </h2>
      </section>

      {/* Floating Footer (Now fades out at 4s) */}
      <footer className={styles.footerContainer}>
        <div className="font-sans text-[8px] font-bold uppercase tracking-[1.2em] text-white">
          ARC-V1 • 2026
        </div>
      </footer>
    </main>
  );
}
