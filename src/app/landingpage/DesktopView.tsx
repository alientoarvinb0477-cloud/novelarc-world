"use client";

import Link from "next/link";
import Image from "next/image";
import styles from "../design/desktop.module.css";
// Ensure this image exists in your /public folder
import HouseImage from "../../../public/image_1.png"; 

export default function DesktopView() {
  return (
    <main className={styles.container}>
      {/* Background Layer */}
      <div className={styles.backgroundWrapper}>
        <Image 
          src={HouseImage}
          alt="Novelarc Luxury Digital Interior"
          fill
          priority
          className={styles.backgroundImage}
        />
        <div className="absolute inset-0 bg-black/10 pointer-events-none" />
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
        
        <Link href="/world/main-world">
          <button className={styles.button}>
            Exploration Grid
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
