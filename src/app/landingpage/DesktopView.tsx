"use client";
import Link from "next/link";
import Image from "next/image";
// Using the provided image asset
import HouseImage from "../../../public/image_2.png"; 

export default function DesktopView() {
  return (
    <main className="relative w-full h-screen bg-black overflow-hidden flex flex-col items-center justify-center">
      
      {/* ─── 1. ABSOLUTE BACKGROUND IMAGE ─── */}
      <div className="absolute inset-0 z-0">
        <Image 
          src={HouseImage}
          alt="Novelarc elegant property selection Philippines"
          fill
          priority
          placeholder="blur"
          className="object-cover object-center brightness-[0.7]" // Brightness lower to make text readable
        />
        {/* Very Subtle texture for elegant finish */}
        <div className="absolute inset-0 opacity-[0.03] pointer-events-none -z-5 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')]" />
      </div>

      {/* ─── 2. CENTERED CONTENT OVERLAY (High SEO Value) ─── */}
      <section className="relative z-10 w-full max-w-4xl text-center flex flex-col items-center justify-center animate-fadeIn">
        
        {/* Main Title (SEO H1) with Elegant Serif Font */}
        <h1 
          style={{ fontFamily: 'var(--font-serif)' }}
          className="text-white text-8xl font-thin tracking-tighter leading-none mb-10 select-none"
        >
          DIGITAL ARCHITECTURE<br />
          <span className="text-stone-300 font-extralight italic">Awaits Your Vision</span>
        </h1>
        
        {/* Sub Title (SEO H2) with Montserrat Light font */}
        <h2 
          style={{ fontFamily: 'var(--font-sans-light)', fontWeight: 300 }}
          className="text-stone-100 text-lg uppercase tracking-[0.3em] max-w-xl mb-14"
        >
          Step into fully realized digital interiors.<br /> Explore and select your perfect Philippine property.
        </h2>
        
        {/* EXPLORATION GRID Button (Light Elegant Style) */}
        <Link href="/world/main-world">
          <button 
            style={{ fontFamily: 'var(--font-sans-light)', fontWeight: 600 }}
            className="group px-14 py-5 border-[1px] border-stone-200 text-stone-100 font-bold rounded-sm uppercase text-xs tracking-[0.4em] hover:bg-white hover:text-black transition-all hover:scale-105"
          >
            EXPLORATION GRID
          </button>
        </Link>
      </section>

      {/* ─── 3. SUBTLE FOOTER ─── */}
      <footer className="absolute bottom-6 w-full flex justify-center z-20">
        <div className="font-sans text-[9px] font-bold uppercase tracking-[0.6em] text-stone-600 opacity-60">
          ARC-V1 • VALENZUELA • 2026
        </div>
      </footer>
    </main>
  );
}
