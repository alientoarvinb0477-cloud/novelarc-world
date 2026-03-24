"use client";

import { useProgress } from "@react-three/drei";
import { useEffect, useState } from "react";
import styles from "../../design/loading.module.css"; // Adjust path if needed

export default function LoadingScreen() {
  const { progress, active } = useProgress();
  const [shown, setShown] = useState(true);

  useEffect(() => {
    if (!active && progress === 100) {
      const timer = setTimeout(() => setShown(false), 800);
      return () => clearTimeout(timer);
    }
  }, [progress, active]);

  if (!shown) return null;

  return (
    <div className={`${styles.overlay} ${!active ? styles.hidden : styles.visible}`}>
      
      <div className={styles.backgroundTexture} />

      <div className={styles.contentWrapper}>
        
        {/* --- CENTRAL LOADING CIRCLE --- */}
        <div className={styles.ringContainer}>
          <svg className={styles.svg}>
            <circle
              cx="64"
              cy="64"
              r="60"
              stroke="currentColor"
              strokeWidth="2"
              fill="transparent"
              className={styles.bgCircle}
            />
            <circle
              cx="64"
              cy="64"
              r="60"
              stroke="currentColor"
              strokeWidth="2"
              fill="transparent"
              strokeDasharray={377}
              strokeDashoffset={377 - (377 * progress) / 100}
              strokeLinecap="round"
              className={styles.progressCircle}
            />
          </svg>

          <div className={styles.percentage}>
            {Math.round(progress)}%
          </div>
        </div>

        {/* --- STATUS TEXT --- */}
        <div className={styles.statusContainer}>
          <p className={styles.mainStatus}>
            {active ? "Initialising Grid" : "System Ready"}
          </p>
          <div className={styles.subStatusWrapper}>
            <div className={styles.line} />
            <p className={styles.nodeInfo}>
              Node: ARC-V1 • Valenzuela
            </p>
            <div className={styles.line} />
          </div>
        </div>

      </div>
    </div>
  );
}
