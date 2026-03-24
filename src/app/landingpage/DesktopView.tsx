"use client";

import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import styles from '../design/landing.module.css'; // Import your custom CSS

export default function DesktopView() {
  return (
    <main className={styles.container}>
      <div className="relative z-10">
        
        {/* Using the classes from your landing.module.css */}
        <h1 className={styles.title}>
          NOVELARC<br />
          <span className={styles.subtitle}>WORLD</span>
        </h1>

        <div className="flex justify-center">
          <Link href="/world/main-world">
            <button className={styles.startButton}>
              Let&apos;s Get Started
              <ArrowRight className="inline ml-4" size={20} />
            </button>
          </Link>
        </div>

      </div>
      
      {/* Background gradients can still stay here or move to CSS */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_#7c2d1233,_black)] -z-10" />
    </main>
  );
}
