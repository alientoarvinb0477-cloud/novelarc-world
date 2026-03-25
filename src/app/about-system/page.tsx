"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import styles from "../design/about.module.css";
// Importing desktop styles for the shared button appearance
import desktopStyles from "../design/desktop.module.css";

export default function AboutSystemPage() {
  // Update these to match your actual PNG filenames in /public
  const galleryImages = [
    "/img1.png",
    "/img2.png",
    "/img3.png",
    "/img4.png",
    "/img5.png"
  ];

  return (
    <main className={styles.container}>
      
      {/* 1. 5-IMAGE FLASH GALLERY */}
      <div className={styles.galleryWrapper}>
        {galleryImages.map((src, index) => (
          <div 
            key={index} 
            className={styles.flashImage}
            style={{ animationDelay: `${index}s` }} // Each image shows for 1s
          >
            <Image 
              src={src} 
              alt={`Gallery Architecture ${index + 1}`} 
              fill 
              priority={index === 0}
              className={styles.actualImage}
            />
          </div>
        ))}
      </div>

      {/* 2. TEXT CONTENT (Dark text for white background) */}
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

        {/* 3. FINAL CTA */}
        <div className="mt-16">
          <Link href="/world/main-world">
            <button 
              className={desktopStyles.button} 
              style={{ borderColor: '#1c1917', color: '#1c1917' }}
            >
              Initialize 3D World
            </button>
          </Link>
        </div>
      </div>
    </main>
  );
}
