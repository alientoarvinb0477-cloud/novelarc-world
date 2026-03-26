"use client";

import Image from "next/image";
import styles from "../design/mobile.module.css";
import HouseImage from "../../../public/image_1.png"; 

export default function MobileView() {
  return (
    <main className={styles.container}>
      {/* Background Layer */}
      <div className={styles.backgroundWrapper}>
        <Image 
          src={HouseImage}
          alt="Novelarc Architecture"
          fill
          priority
          className={styles.backgroundImage}
        />
        {/* Light overlay for black text support */}
        <div className={styles.overlay} />
      </div>

      {/* Massive Centered Content */}
      <section className={styles.content}>
        <h1 className={styles.title}>
          NOVEL<span className={styles.titleItalic}>ARC</span>
        </h1>
        
        <h2 className={styles.subtitle}>
          Premium Digital Architecture<br />Selection
        </h2>
      </section>

      {/* Minimal Footer */}
      <footer className="absolute bottom-10 z-10 opacity-40">
        <div className="text-[7px] font-bold uppercase tracking-[1em] text-black">
          PHILIPPINES • 2026
        </div>
      </footer>
    </main>
  );
}
