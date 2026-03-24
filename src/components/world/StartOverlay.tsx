"use client";

import React from "react";
import styles from "../../app/design/overlay.module.css";

interface StartOverlayProps {
  onStart: () => void;
  show: boolean;
}

export default function StartOverlay({ onStart, show }: StartOverlayProps) {
  if (!show) return null;

  return (
    <div className={styles.container}>
      <div className={styles.notification}>
        <h1 className={styles.title}>NOVELARC</h1>
        
        <div className={styles.statusLine}>
          <div className={styles.line} />
          <span className={styles.statusText}>System Boot</span>
          <div className={styles.line} />
        </div>

        <button className={styles.enterButton} onClick={onStart}>
          Initialize World
        </button>

        <p className={styles.hint}>
          Landscape Orientation Recommended
        </p>
      </div>
    </div>
  );
}
