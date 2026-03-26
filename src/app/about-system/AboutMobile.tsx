"use client";

import React from "react";
import Link from "next/link";
import styles from "../design/about.module.css";

export default function AboutMobile() {
  return (
    <main className={styles.mobileContainer}>
      {/* Title at Top 20% */}
      <h1 className={styles.mobileTitle}>
        Visualizing the future of <br/> Philippine Living.
      </h1>

      <Link href="/world/main-world" className="w-full">
        <button className={styles.mobileEnterButton}>
          Enter the World of 3D
        </button>
      </Link>

      <div className={styles.mobileInfoStack}>
        <div className={styles.mobileSection}>
          <h3 className={styles.mobileSectionTitle}>The Vision</h3>
          <p className={styles.mobileDescription}>
            Novelarc is a digital gateway designed for the modern homeowner.
          </p>
        </div>

        <div className={styles.mobileSection}>
          <h3 className={styles.mobileSectionTitle}>The Selection</h3>
          <p className={styles.mobileDescription}>
            Browse our curated collection of Philippine residential designs.
          </p>
        </div>
      </div>

      <footer className={styles.mobileFooter}>
        ARC-V1 • 2026
      </footer>
    </main>
  );
}
