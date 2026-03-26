"use client";

import Image from "next/image";
import styles from "../design/mobile.module.css";
// Using the same background for brand consistency
import HouseImage from "../../../public/image_1.png"; 

export default function MobileView() {
  return (
    <main className={styles.container}>
      {/* 1. TOP PROGRESS BAR (Visual timer) */}
      <div className={styles.topProgress} />

      {/* Background Layer */}
      <div className={styles.backgroundWrapper}>
        <Image 
          src={HouseImage}
          alt="Novelarc Mobile Experience"
          fill
          priority
          className={styles.backgroundImage}
        />
        {/* Darkening overlay for text legibility */}
        <div className="absolute inset-0 bg-black/40 pointer-events-none" />
      </div>

      {/* Centered Elegant Content */}
      <section className={styles.content}>
        <h1 className={styles.title}>
          NOVEL<br />
          <span className={styles.titleItalic}>ARC</span>
        </h1>
        
        <h2 className={styles.subtitle}>
          Explore high-end digital architecture<br />from your device.
        </h2>
      </section>

      {/* Minimal Footer */}
      <footer className={styles.footerContainer}>
        <div className="text-[7px] font-bold uppercase tracking-[0.8em] text-white">
          PHILIPPINES • 2026
        </div>
      </footer>
    </main>
  );
}
