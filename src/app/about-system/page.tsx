"use client";

import React from "react";
import Link from "next/link";
import styles from "../design/about.module.css";

export default function AboutSystemPage() {
  return (
    <main className={styles.container}>
      <div className={styles.contentWrapper}>
        
        {/* 1. POSITIONED AT TOP 20% */}
        <h1 className={styles.mainTitle}>
          Visualizing the future of <br/> Philippine Living.
        </h1>

        {/* 2. THE BUTTON */}
        <div className={styles.buttonContainer}>
          <Link href="/world/main-world">
            <button className={styles.enterButton}>
              Enter the World of 3D
            </button>
          </Link>
        </div>

        {/* 3. THE INFO GRID */}
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

      </div>
      
      <footer className={styles.footer}>
        <div className="text-[7px] font-bold uppercase tracking-[1em] text-black">
          ARC-V1 • 2026
        </div>
      </footer>
    </main>
  );
}
