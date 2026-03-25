"use client";

import { useProgress } from "@react-three/drei";
import { useEffect, useState } from "react";
import styles from "../../app/design/loading.module.css"; 

export default function LoadingScreen() {
  const { progress, active } = useProgress();
  const [shown, setShown] = useState(true);

  useEffect(() => {
    if (!active && progress === 100) {
      const timer = setTimeout(() => setShown(false), 1200); // Slower exit for elegance
      return () => clearTimeout(timer);
    }
  }, [progress, active]);

  if (!shown) return null;

  return (
    <div className={`${styles.overlay} ${(!active && progress === 100) ? styles.hidden : ""}`}>
      
      <div className={styles.contentWrapper}>
        
        {/* --- ELEGANT RING --- */}
        <div className={styles.ringContainer}>
          <svg className={styles.svg}>
            <circle
              cx="50"
              cy="50"
              r="48"
              stroke="currentColor"
              strokeWidth="1"
              fill="transparent"
              className={styles.bgCircle}
            />
            <circle
              cx="50"
              cy="50"
              r="48"
              stroke="currentColor"
              strokeWidth="1"
              fill="transparent"
              strokeDasharray={301.6} /* 2 * PI * 48 */
              strokeDashoffset={301.6 - (301.6 * progress) / 100}
              strokeLinecap="butt"
              className={styles.progressCircle}
            />
          </svg>

          <div className={styles.percentage}>
            {Math.round(progress)}%
          </div>
        </div>

        {/* --- ELEGANT STATUS --- */}
        <div className={styles.statusContainer}>
          <p className={styles.mainStatus}>
            {active ? "Visualizing your space" : "Architecture Ready"}
          </p>
          <div className={styles.subStatusWrapper}>
            <div className={styles.line} />
            <p className={styles.nodeInfo}>
              ARC-V1 • NOVELARC
            </p>
            <div className={styles.line} />
          </div>
        </div>

      </div>
    </div>
  );
}
