"use client";

import React, { useEffect, useRef } from "react";
import Link from "next/link";
import styles from "../design/about.module.css";

export default function AboutMobile() {
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add(styles.visible);
          }
        });
      },
      { threshold: 0.1 }
    );

    const sections = document.querySelectorAll(`.${styles.mobileSection}`);
    sections.forEach((section) => observer.observe(section));

    return () => observer.disconnect();
  }, []);

  return (
    <main className={styles.mobileContainer}>
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
            We translate architectural blueprints into immersive 1:1 digital environments.
          </p>
        </div>

        <div className={styles.mobileSection}>
          <h3 className={styles.mobileSectionTitle}>The Selection</h3>
          <p className={styles.mobileDescription}>
            Browse our curated collection of Philippine residential designs. 
            Pick your space, then enter the world.
          </p>
        </div>
      </div>

      <footer className={styles.mobileFooter}>
        ARC-V1 • 2026
      </footer>
    </main>
  );
}
