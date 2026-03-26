"use client";

import Image from "next/image";
import styles from "../design/mobile.module.css";
import HouseImage from "../../../public/image_1.png"; 

export default function MobileView() {
  return (
    <main className={styles.container}>
      {/* Background Image (Maintaining clarity and light) */}
      <div className={styles.backgroundWrapper}>
        <Image 
          src={HouseImage}
          alt="Philippine Architecture Design" 
          fill
          priority
          className={styles.backgroundImage}
        />
        <div className={styles.overlay} />
      </div>

      {/* SEO Optimized Header Section */}
      <section className={styles.content}>
        <h1 className={styles.title}>
          ARCHITECTURE<span className={styles.titleItalic}>ARC</span>
        </h1>
        
        <h2 className={styles.subtitle}>
          novelarcDigitalEra.com
        </h2>
      </section>

      {/* Branding Footer */}
      <footer className="absolute bottom-10 z-10 opacity-40">
        <div className="text-[7px] font-bold uppercase tracking-[1em] text-black">
          PHILIPPINES • 2026
        </div>
      </footer>
    </main>
  );
}
