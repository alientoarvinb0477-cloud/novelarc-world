"use client";

import React, { useState } from "react";
import styles from "../../app/design/overlay.module.css";

interface StartOverlayProps {
  onStart: () => void;
  show: boolean;
}

export default function StartOverlay({ onStart, show }: StartOverlayProps) {
  const [isclosing, setIsClosing] = useState(false);

  if (!show && !isclosing) return null;

  const handleButtonClick = () => {
    setIsClosing(true);
    // 1.5s delay to match the slower, more cinematic fade out
    setTimeout(() => {
      onStart();
      setIsClosing(false);
    }, 1500);
  };

  return (
    <div className={`${styles.container} ${isclosing ? styles.fadeOut : ""}`}>
      <div className={styles.notification}>
        <h1 className={styles.title}>Novelarcdigitalera.com</h1>
        
        <div className={styles.statusLine}>
          <div className={styles.line} />
          <span className={styles.statusText}>Architecture Ready</span>
          <div className={styles.line} />
        </div>

        <button 
          className={styles.enterButton} 
          onClick={handleButtonClick}
          disabled={isclosing}
        >
          {isclosing ? "Initializing..." : "Explore Interior"}
        </button>

        <p className={styles.hint}>
          Best viewed in Landscape orientation
        </p>
      </div>
    </div>
  );
}
