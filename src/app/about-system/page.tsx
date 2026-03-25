"use client";

import React from "react";
import Link from "next/link";
import styles from "../design/about.module.css";

export default function AboutSystemPage() {
  return (
    <main 
      className={styles.container} 
      style={{
        backgroundColor: "#f2f2f2",
        color: "#000",
        minHeight: "100vh",
        width: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: "40px 20px",
        boxSizing: "border-box"
      }}
    >
      <div 
        className={styles.contentWrapper}
        style={{ maxWidth: "900px", width: "100%", textAlign: "center" }}
      >
        <span className={styles.label} style={{ letterSpacing: "0.5em", fontSize: "10px", opacity: 0.6 }}>
          THE NOVELARC PROTOCOL
        </span>

        <h1 
          className={styles.mainTitle}
          style={{ 
            fontFamily: "serif", 
            fontSize: "clamp(2rem, 5vw, 4rem)", 
            margin: "30px 0",
            fontStyle: "italic" 
          }}
        >
          Visualizing the future of <br/> Philippine Living.
        </h1>

        <div 
          className={styles.grid}
          style={{ 
            display: "flex", 
            gap: "40px", 
            textAlign: "left", 
            borderTop: "1px solid rgba(0,0,0,0.1)",
            paddingTop: "40px",
            marginTop: "20px"
          }}
        >
          <div className={styles.section}>
            <h3 style={{ fontSize: "12px", textTransform: "uppercase", letterSpacing: "0.2em" }}>The Vision</h3>
            <p style={{ fontSize: "14px", lineHeight: "1.6", opacity: 0.8 }}>
              Novelarc is a digital gateway designed for the modern homeowner. We translate architectural blueprints into immersive digital environments.
            </p>
          </div>

          <div className={styles.section}>
            <h3 style={{ fontSize: "12px", textTransform: "uppercase", letterSpacing: "0.2em" }}>The Selection</h3>
            <p style={{ fontSize: "14px", lineHeight: "1.6", opacity: 0.8 }}>
              Browse our curated collection of Philippine residential designs. Pick your space, then enter the world.
            </p>
          </div>
        </div>

        {/* ENTER THE WORD BUTTON (Pure Black style) */}
        <div style={{ marginTop: "60px" }}>
          <Link href="/world/main-world">
            <button 
              style={{
                backgroundColor: "#000",
                color: "#fff",
                padding: "15px 40px",
                border: "none",
                borderRadius: "2px",
                fontSize: "10px",
                fontWeight: "bold",
                textTransform: "uppercase",
                letterSpacing: "0.4em",
                cursor: "pointer"
              }}
            >
              Enter the Word of 3D
            </button>
          </Link>
        </div>
      </div>
    </main>
  );
}
