"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import styles from "../design/about.module.css"; // Ensure this path is 100% correct
import desktopStyles from "../design/desktop.module.css";

export default function AboutSystemPage() {
  const galleryImages = ["/img1.png", "/img2.png", "/img3.png", "/img4.png", "/img5.png"];

  return (
    <main className={styles.container}>
      {/* The Flash Gallery */}
      <div className={styles.galleryWrapper}>
        {galleryImages.map((src, index) => (
          <div key={index} className={styles.flashImage} style={{ animationDelay: `${index}s` }}>
            <Image src={src} alt="Architecture" fill priority className={styles.actualImage} />
          </div>
        ))}
      </div>

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
            </p>
          </div>
          <div className={styles.section}>
            <h3 className={styles.sectionTitle}>The Selection</h3>
            <p className={styles.description}>
              Browse our curated collection of Philippine residential designs.
            </p>
          </div>
        </div>

        <Link href="/world/main-world" className="mt-12">
          <button className={desktopStyles.button} style={{ color: '#1c1917', borderColor: '#1c1917' }}>
            Initialize 3D World
          </button>
        </Link>
      </div>
    </main>
  );
}
