"use client";

import React from "react";
import Link from "next/link"; // <--- THIS WAS MISSING
import { useRouter } from "next/navigation";
import styles from "../design/about.module.css";
import desktopStyles from "../design/desktop.module.css";

export default function AboutSystemPage() {
  const router = useRouter();

  return (
    <main className={styles.container}>
      {/* PERSISTENT TOP RIGHT BUTTON */}
      <button 
        onClick={() => router.push("/world/main-world")}
        className={desktopStyles.getStartedTop} 
      >
        Get Started
      </button>

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

        <div className={styles.ctaContainer}>
          {/* Ensure Link is used correctly here */}
          <Link href="/world/main-world">
            <button className={desktopStyles.button}>
              Initialize 3D World
            </button>
          </Link>
        </div>
      </div>
    </main>
  );
}
