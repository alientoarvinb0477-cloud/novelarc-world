"use client";

import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import Crosshair from "../components/world/Crosshair";

export default function LandingPage() {
  return (
    <main className="relative w-full h-screen flex flex-col items-center justify-center overflow-hidden">
      <Crosshair />
      
      {/* ─── AMBIENT BACKGROUND ─── */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-orange-900/20 via-black to-black -z-10" />
      
      {/* Subtle Animated Grid Background */}
      <div className="absolute inset-0 opacity-10 pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] -z-5" />

      <div className="max-w-4xl text-center space-y-12 relative z-10">
        
        {/* Main Title */}
        <div className="space-y-4">
          <h1 className="text-7xl sm:text-8xl md:text-[10rem] font-black tracking-tighter leading-none select-none">
            NOVELARC<br />
            <span className="italic font-thin text-stone-600">WORLD</span>
          </h1>
          
          <div className="flex justify-center items-center gap-6 py-2">
            <div className="h-[1px] w-16 bg-stone-800" />
            <p className="text-stone-500 font-sans text-[10px] font-bold uppercase tracking-[0.6em]">
              Immersive OS
            </p>
            <div className="h-[1px] w-16 bg-stone-800" />
          </div>
        </div>

        {/* Call to Action */}
        <div className="flex justify-center pt-8">
          <Link href="/world/main-world">
            <button className="group relative flex items-center gap-6 bg-orange-600 text-white px-14 py-7 rounded-full font-sans font-black uppercase text-xs tracking-[0.3em] hover:bg-white hover:text-black transition-all shadow-[0_0_50px_rgba(234,88,12,0.2)] active:scale-95 overflow-hidden">
              <span className="relative z-10 text-[11px]">Let&apos;s Get Started</span>
              <ArrowRight size={20} className="relative z-10 group-hover:translate-x-2 transition-transform" />
              
              {/* Button Shine Effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
            </button>
          </Link>
        </div>
      </div>

      {/* --- MINIMAL FOOTER --- */}
      <footer className="absolute bottom-10 w-full flex justify-center pointer-events-none opacity-20">
        <div className="font-sans text-[9px] font-bold uppercase tracking-[0.8em] text-stone-500">
          ARC-V1 • 2026
        </div>
      </footer>
    </main>
  );
}
