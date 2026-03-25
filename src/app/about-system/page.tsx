"use client";

import React from "react";
import Link from "next/link";
import styles from "../design/about.module.css";
import desktopStyles from "../design/desktop.module.css";

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
              environments.
            </p>
          </div>

          <div className={styles.section}>
            <h3 className={styles.sectionTitle}>The Selection</h3>
            <p className={styles.description}>
              Browse our curated collection of Philippine residential designs. 
              Pick your space, then enter the world.
            </p>
          </div>
        </div>

        {/* Updated Button to match the Grey/Purple theme */}
        <div className="mt-20">
          <Link href="/world/main-world">
            <button 
              className={desktopStyles.button} 
              style={{ borderColor: '#A5A5A5', color: '#A5A5A5' }}
            >
              Initialize 3D World
            </button>
          </Link>
        </div>
      </div>

      <footer className="mt-20 opacity-20">
        <div className="text-[7px] font-bold uppercase tracking-[1em] color-[#A5A5A5]">
          ARCHITECTURE • INTERIOR • SELECTION
        </div>
      </footer>
    </main>
  );
}
