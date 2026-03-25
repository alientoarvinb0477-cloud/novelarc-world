"use client";

import Link from "next/link";
import Image from "next/image";
import styles from "../design/desktop.module.css";
// Update this to your actual image name in /public
import HouseImage from "../../../public/image_1.png"; 

export default function DesktopView() {
  return (
    <main className={styles.container}>
      
      {/* 1. Background */}
      <div className={styles.backgroundWrapper}>
        <Image 
          src={HouseImage}
          alt="Novelarc Digital Architecture"
          fill
          priority
          className={styles.backgroundImage}
        />
      </div>

      {/* 2. Centered Content */}
      <section className={styles.content}>
        <h1 className={styles.title}>
          DIGITAL ARCHITECTURE<br />
          <span className={styles.titleItalic}>Awaits Your Vision</span>
        </h1>
        
        <h2 className={styles.subtitle}>
          Step into fully realized digital interiors.<br /> 
          Explore and select your perfect Philippine property.
        </h2>
        
        <Link href="/world/main-world">
          <button className={styles.button}>
            Exploration Grid
          </button>
        </Link>
      </section>

      {/* 3. Subtle Footer Overlay */}
      <footer className="absolute bottom-8 w-full flex justify-center z-20 opacity-40">
        <div className="font-sans text-[8px] font-bold uppercase tracking-[1em] text-white">
          ARC-V1 • VALENZUELA • 2026
        </div>
      </footer>
    </main>
  );
}
