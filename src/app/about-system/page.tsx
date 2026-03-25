"use client";

import React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import styles from "../design/about.module.css";
import desktopStyles from "../design/desktop.module.css";

export default function AboutSystemPage() {
  const router = useRouter();

  return (
    <main className={styles.container}>
      {/* BEAUTIFIED TOP RIGHT BUTTON */}
      <button 
        onClick={() => router.push("/world/main-world")}
        className={styles.topRightBtn}
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
              environments, allowing you to walk through your future home.
            </p>
          </div>

          <div className={styles.section}>
            <h3 className={styles.sectionTitle}>The Selection</h3>
            <p className={styles.description}>
              Browse our curated collection of Philippine residential designs. 
              Every interior is physically accurate. Pick your space, then enter the world.
            </p>
          </div>
        </div>

        {/* CENTER INITIALIZE BUTTON */}
        <div className="mt-10 mb-20 flex justify-center">
          <Link href="/world/main-world">
            <button 
              className={desktopStyles.button} 
              style={{ color: '#000', borderColor: 'rgba(0,0,0,0.2)' }}
            >
              Initialize 3D World
            </button>
          </Link>
        </div>
      </div>

      <footer className="w-full text-center opacity-30 pb-10">
        <div className="text-[7px] font-bold uppercase tracking-[1em] text-black">
          ARCHITECTURE • INTERIOR • SELECTION
        </div>
      </footer>
    </main>
  );
}
