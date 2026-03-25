"use client";

import React from "react";
import Link from "next/link";
import styles from "../design/desktop.module.css"; // Reuse your elegant styles

export default function AboutSystemPage() {
  return (
    <main className="min-h-screen bg-[#0c0a09] flex flex-col items-center justify-center px-10">
      
      <section className="max-w-4xl w-full flex flex-col items-center animate-fadeIn">
        
        {/* Elegant Header */}
        <span className="text-stone-500 font-sans text-[10px] uppercase tracking-[0.6em] mb-6">
          The Novelarc Protocol
        </span>

        <h1 
          style={{ fontFamily: 'var(--font-serif)' }} 
          className="text-white text-6xl italic font-light text-center mb-12 leading-tight"
        >
          Visualizing the future of <br/> Philippine Living.
        </h1>

        {/* The "What the system talks about" Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 border-t border-stone-800 pt-16">
          
          <div className="space-y-6">
            <h3 className="text-white font-sans text-xs uppercase tracking-widest font-bold">The Vision</h3>
            <p className="text-stone-400 font-sans font-light leading-relaxed text-sm">
              Novelarc is a digital gateway designed for the modern homeowner. We translate architectural blueprints into immersive 1:1 digital environments, allowing you to walk through your future home before the first stone is laid.
            </p>
          </div>

          <div className="space-y-6">
            <h3 className="text-white font-sans text-xs uppercase tracking-widest font-bold">The Selection</h3>
            <p className="text-stone-400 font-sans font-light leading-relaxed text-sm">
              Browse our curated collection of Philippine residential designs. Every interior is physically accurate, from the way the tropical sun hits the tiles to the spatial flow of the living areas. Pick your space, then enter the world.
            </p>
          </div>

        </div>

        {/* Final Call to Action to enter the 3D world */}
        <Link href="/world/main-world" className="mt-20">
          <button className={styles.button}>
            Initialize 3D World
          </button>
        </Link>

      </section>

      <footer className="absolute bottom-8 opacity-20">
        <div className="text-[7px] font-bold uppercase tracking-[1em] text-white">
          ARCHITECTURE • INTERIOR • SELECTION
        </div>
      </footer>
    </main>
  );
}
