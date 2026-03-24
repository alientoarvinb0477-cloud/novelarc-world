"use client";

import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import styles from '../design/mobile.module.css'; // Import the mobile-specific CSS

export default function MobileView() {
  return (
    <main className={styles.container}>
      {/* Background stays in JSX for easy gradient control or move to CSS */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_#7c2d124d,_black)] -z-10" />

      <header className={styles.header}>
        <h1 className={styles.title}>
          NOVEL<br />ARC
        </h1>
        <p className={styles.subtitle}>Mobile Interface</p>
      </header>

      <div className={styles.buttonArea}>
        <Link href="/world/main-world" className="w-full">
          <button className={styles.actionButton}>
            <span>Enter Journey</span>
            <ArrowRight size={18} />
          </button>
        </Link>
        <p className="text-[9px] text-stone-600 uppercase tracking-widest text-center">
          Rotate for Landscape experience
        </p>
      </div>

      <footer className={styles.footer}>
        ARC-V1 • 2026
      </footer>
    </main>
  );
}
