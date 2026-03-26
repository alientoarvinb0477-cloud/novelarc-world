"use client";

import React from "react";
import Link from "next/link";
import styles from "../design/aboutMobile.module.css"; 

export default function AboutMobile() {
  return (
    <main className={styles.mobileContainer}>
      {/* 1. Header Area */}
      <h1 className={styles.mobileTitle}>
        Visualizing the future of <br/> Philippine Living.
      </h1>

      {/* 2. Button Area */}
      <div className={styles.buttonWrapper}>
        <Link href="/world/main-world" className="w-full">
          <button className={styles.mobileEnterButton}>
            Enter the World of 3D
          </button>
        </Link>
      </div>

      {/* 3. Single Centered Vision Section */}
      <div className={styles.mobileInfoStack}>
        <div className={styles.mobileSection}>
          <h3 className={styles.mobileSectionTitle}>The Vision</h3>
          <p className={styles.mobileDescription}>
            Novelarc is a digital gateway designed for the modern homeowner. 
            We translate architectural blueprints into immersive 1:1 digital environments.
          </p>
        </div>
      </div>

      {/* 4. Footer */}
      <footer className={styles.mobileFooter}>
        ARC-V1 • 2026
      </footer>
    </main>
  );
}
