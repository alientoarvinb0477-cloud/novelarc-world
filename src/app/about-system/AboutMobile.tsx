"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
// Change this line to import the new mobile-specific CSS
import styles from "../design/aboutMobile.module.css"; 

export default function AboutMobile() {
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = (window.scrollY / totalHeight) * 100;
      setScrollProgress(progress);
    };

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            // Logic to add the visible class from our NEW css file
            entry.target.classList.add(styles.visible);
          }
        });
      },
      { threshold: 0.15 }
    );

    const sections = document.querySelectorAll(`.${styles.mobileSection}`);
    sections.forEach((section) => observer.observe(section));

    window.addEventListener("scroll", handleScroll);
    
    return () => {
      observer.disconnect();
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <main className={styles.mobileContainer}>
      <div 
        className={styles.progressBar} 
        style={{ width: `${scrollProgress}%` }} 
      />

      <h1 className={styles.mobileTitle}>
        Visualizing the future of <br/> Philippine Living.
      </h1>

      <div className={styles.buttonWrapper}>
        <Link href="/world/main-world" className="w-full">
          <button className={styles.mobileEnterButton}>
            Enter the World of 3D
          </button>
        </Link>
      </div>

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
