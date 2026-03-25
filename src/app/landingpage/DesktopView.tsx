"use client";
import Link from "next/link";
import Image from "next/image";
// Using the provided image asset
import HouseImage from "../../../public/image_1.png"; 

export default function DesktopView() {
  return (
    <main className="min-h-screen w-full bg-white flex flex-col">
      
      {/* ─── 1. TOP HERO AREA (High SEO Value) ─── */}
      <section className="w-full pt-24 pb-16 px-20 text-center flex flex-col items-center z-20">
        
        {/* Primary H1 - The main SEO signal (House/Philippines) */}
        <h1 className="text-7xl font-black text-stone-950 max-w-5xl leading-[0.95] tracking-tighter mb-8 animate-fadeIn">
          DIGITAL ARCHITECTURE <br />
          <span className="text-stone-500 font-extralight italic">Awaits Your Vision</span>
        </h1>
        
        {/* Secondary H2 - Focus on the "Inside/Digital" experience */}
        <h2 className="text-stone-700 text-xl font-medium max-w-2xl mb-12 uppercase tracking-wide">
          Step into fully realized digital interiors. <br /> Explore and select your perfect Philippine property.
        </h2>
        
        <Link href="/world/main-world">
          <button className="px-16 py-6 bg-stone-950 text-white font-black rounded-full uppercase text-sm tracking-[0.3em] hover:scale-105 active:scale-95 transition-all shadow-xl hover:shadow-[0_20px_60px_rgba(0,0,0,0.15)]">
            EXPLORATION GRID
          </button>
        </Link>
      </section>

      {/* ─── 2. LOWERED IMAGE (CONTEXTUAL BACKGROUND) ─── */}
      <section className="relative w-full h-[60dvh] mt-auto overflow-hidden">
        {/* Smooth transition from white content area to blurred image */}
        <div className="absolute top-0 w-full h-40 bg-gradient-to-b from-white to-transparent z-10" />
        
        <Image 
          src={HouseImage}
          alt="Novelarc digital house selection Philippines"
          fill
          priority
          placeholder="blur"
          className="object-cover object-center scale-105 blur-md brightness-90 saturate-[0.8]" // Lowers visual sight with blur/brightness
        />
        
        {/* Subtle texture over image */}
        <div className="absolute inset-0 bg-black/5 opacity-5 pointer-events-none -z-5 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')]" />
      </section>

      {/* ─── 3. SUBTLE FOOTER ─── */}
      <footer className="w-full py-8 px-20 flex justify-center z-20">
        <div className="font-sans text-[9px] font-bold uppercase tracking-[0.8em] text-stone-400">
          ARC-V1 • VALENZUELA • 2026
        </div>
      </footer>
    </main>
  );
}
