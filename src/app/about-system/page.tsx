"use client";

import React from "react";
import Link from "next/link";
import styles from "../design/about.module.css";
import desktopStyles from "../design/desktop.module.css"; // Reuse the button style

export default function AboutSystemPage() {
  return (
    <main className={styles.container}>
      <div className={styles.contentWrapper}>
        
        <span className={styles.label}>The Novelarc Protocol</span>

        <h1 className={styles.mainTitle}>
          Visualizing the future of <br/> Philippine Living.
        </h1>

        <div className={styles.grid}>
          
          <div className={styles.section}>
            <h3 className={styles.sectionTitle}>The Vision</h3>
            <p className={styles.description}>
              Novelarc is a digital gateway designed for the modern homeowner. 
              We translate architectural blueprints into immersive 1:1 digital 
              environments, allowing you to walk through your future home 
              before the first stone is laid.
            </p>
          </div>

          <div className={styles.section}>
            <h3 className={styles.sectionTitle}>The Selection</h3>
            <p className={styles.description}>
              Browse our curated collection of Philippine residential designs. 
              Every interior is physically accurate, from the way the tropical 
              sun hits the tiles to the spatial flow of the living areas. 
              Pick your space, then enter the world.
            </p>
          </div>

        </div>

        <div className={styles.ctaContainer}>
          <Link href="/world/main-world">
            <button className={desktopStyles.button}>
              Initialize 3D World
            </button>
          </Link>
        </div>

      </div>

      <footer className="mt-20 opacity-20">
        <div className="text-[7px] font-bold uppercase tracking-[1em] text-white">
          ARCHITECTURE • INTERIOR • SELECTION
        </div>
      </footer>
    </main>
  );
}
