"use client";

import Link from "next/link";
import Image from "next/image";
import styles from "../design/mobile.module.css";
// Using the same background for brand consistency
import HouseImage from "../../../public/image_1.png"; 

export default function MobileView() {
  return (
    <main className={styles.container}>
      {/* Background Layer */}
      <div className={styles.backgroundWrapper}>
        <Image 
          src={HouseImage}
          alt="Novelarc Mobile Experience"
          fill
          priority
          className={styles.backgroundImage}
        />
      </div>

      {/* Centered Elegant Content */}
      <section className={styles.content}>
        <h1 className={styles.title}>
          NOVEL<br />
          <span className={styles.titleItalic}>ARC</span>
        </h1>
        
        <h2 className={styles.subtitle}>
          Explore high-end digital architecture from your device.
        </h2>
        
        <Link href="/world/main-world" className="w-full flex justify-center">
          <button className={styles.button}>
            Enter World
          </button>
        </Link>
      </section>

      {/* Minimal Footer */}
      <footer className="absolute bottom-8 opacity-20">
        <div className="text-[7px] font-bold uppercase tracking-[0.8em] text-white">
          PHILIPPINES • 2026
        </div>
      </footer>
    </main>
  );
}
