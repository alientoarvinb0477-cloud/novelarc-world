"use client";

import React, { useState } from "react";
import styles from "../../app/design/overlay.module.css";

interface StartOverlayProps {
  onStart: () => void;
  show: boolean;
}

export default function StartOverlay({ onStart, show }: StartOverlayProps) {
  const [isclosing, setIsClosing] = useState(false);

  // If the parent says don't show, and we aren't in the middle of closing, return null
  if (!show && !isclosing) return null;

  const handleButtonClick = () => {
    setIsClosing(true);
    // Wait for the CSS transition (0.8s) before fully telling the parent we started
    setTimeout(() => {
      onStart();
      setIsClosing(false); // Reset for next time if needed
    }, 800);
  };

  return (
    <div className={`${styles.container} ${isclosing ? styles.fadeOut : ""}`}>
      <div className={styles.notification}>
        <h1 className={styles.title}>NOVELARC</h1>
        
        <div className={styles.statusLine}>
          <div className={styles.line} />
          <span className={styles.statusText}>System Boot</span>
          <div className={styles.line} />
        </div>

        <button 
          className={styles.enterButton} 
          onClick={handleButtonClick}
          disabled={isclosing}
        >
          {isclosing ? "INITIALIZING..." : "Initialize World"}
        </button>

        <p className={styles.hint}>
          Landscape Orientation Recommended
        </p>
      </div>
    </div>
  );
}
