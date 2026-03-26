"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import styles from "../design/about.module.css";
import AboutMobile from "./AboutMobile";

export default function AboutSystemPage() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  if (isMobile) return <AboutMobile />;

  return (
    <main className={styles.container}>
      <div className={styles.contentWrapper}>
        <h1 className={styles.mainTitle}>
          Visualizing the future of <br/> Philippine Living.
        </h1>

        <div className="mb-16">
          <Link href="/world/main-world">
            <button className={styles.enterButton}>
              Enter the World of 3D
            </button>
          </Link>
        </div>

        <div className={styles.grid}>
          <div className={styles.section}>
            <h3 className={styles.sectionTitle}>The Vision</h3>
            <p className={styles.description}>
              Novelarc is a digital gateway designed for the modern homeowner.
              We translate architectural blueprints into immersive 1:1 digital environments.
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
      
      <footer className="absolute bottom-10 opacity-20">
        <div className="text-[7px] font-bold uppercase tracking-[1em] text-black">
          ARC-V1 • 2026
        </div>
      </footer>
    </main>
  );
}
