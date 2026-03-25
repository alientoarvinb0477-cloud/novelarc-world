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
      {/* TOP RIGHT GET STARTED BUTTON */}
      <button 
        onClick={() => router.push("/world/main-world")}
        className="fixed top-10 right-10 z-[100] px-6 py-2 border border-[#5ebec4]/40 text-[#5ebec4] text-[9px] uppercase tracking-[0.4em] hover:bg-[#5ebec4] hover:text-[#fdf5df] transition-all duration-500 font-sans font-bold"
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

        {/* CENTER INITIALIZE BUTTON */}
        <div className="mt-20">
          <Link href="/world/main-world">
            <button 
              className={desktopStyles.button} 
              style={{ color: '#5ebec4', borderColor: '#5ebec4' }}
            >
              Initialize 3D World
            </button>
          </Link>
        </div>
      </div>

      <footer className="mt-20 opacity-50">
        <div className="text-[7px] font-bold uppercase tracking-[1em] text-[#5ebec4]">
          ARCHITECTURE • INTERIOR • SELECTION
        </div>
      </footer>
    </main>
  );
}
