"use client";

import Link from 'next/link';
import { ArrowRight, Globe, Zap } from 'lucide-react';
import Crosshair from "../components/world/Crosshair";

export default function LandingPage() {
  return (
    <main className="h-screen flex flex-col items-center justify-center bg-[#0a0a0a] text-stone-100 px-6 overflow-hidden relative">
      
      {/* ─── UI ELEMENTS ─── */}
      {/* This places the crosshair in the center of the landing page */}
      <Crosshair />
      
      {/* ─── AMBIENT BACKGROUND ─── */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-orange-900/20 via-black to-black -z-10" />
      
      {/* Subtle Animated Grid Background */}
      <div className="absolute inset-0 opacity-10 pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] -z-5" />

      <div className="max-w-4xl text-center space-y-10 relative z-10">
        
        {/* Top Badge */}
        <div className="flex justify-center mb-4">
          <div className="group flex items-center gap-2 px-4 py-2 rounded-full bg-stone-900/50 border border-stone-800 backdrop-blur-sm transition-all hover:border-orange-500/50 cursor-default">
            <Zap size={14} className="text-orange-500 animate-pulse" />
            <span className="font-sans text-[10px] font-bold uppercase tracking-[0.3em] text-stone-400 group-hover:text-stone-200 transition-colors">
              Engine v1.0 • Ready for Launch
            </span>
          </div>
        </div>

        {/* Main Title */}
        <div className="space-y-2">
          <h1 className="text-6xl sm:text-7xl md:text-[9rem] font-black tracking-tighter leading-none select-none">
            NOVELARC<br />
            <span className="italic font-thin text-stone-600">WORLD</span>
          </h1>
          
          <div className="flex justify-center items-center gap-4 py-4">
            <div className="h-[1px] w-12 bg-stone-800" />
            <p className="text-stone-500 font-sans text-[10px] font-bold uppercase tracking-[0.5em]">
              Immersive 1st Person OS
            </p>
            <div className="h-[1px] w-12 bg-stone-800" />
          </div>
        </div>

        {/* Description */}
        <p className="text-stone-400 font-sans text-sm md:text-lg max-w-xl mx-auto leading-relaxed uppercase tracking-widest px-4">
          A digital sanctuary designed for creators. <br className="hidden md:block" /> 
          Explore the main expanse or retreat to your personal shelter.
        </p>

        {/* Call to Action */}
        <div className="flex flex-col sm:flex-row gap-6 justify-center pt-8 items-center">
          <Link href="/world/main-world">
            <button className="group relative flex items-center gap-4 bg-orange-600 text-white px-12 py-6 rounded-full font-sans font-black uppercase text-xs tracking-[0.2em] hover:bg-white hover:text-black transition-all shadow-[0_0_40px_rgba(234,88,12,0.3)] active:scale-95 overflow-hidden">
       
              <span className="relative z-10">Let&apos;s Get Started</span>
              <ArrowRight size={18} className="relative z-10 group-hover:translate-x-2 transition-transform" />
              
              {/* Button Shine Effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
            </button>
          </Link>

          <div className="flex items-center gap-3 text-stone-600 font-sans text-[9px] font-bold uppercase tracking-widest hover:text-stone-400 cursor-help transition-colors">
            <Globe size={14} />
            Lat: 14.6812° N, Long: 120.9763° E
          </div>
        </div>
      </div>

      {/* --- FOOTER DECORATION --- */}
      <footer className="absolute bottom-10 w-full flex justify-between px-12 items-center pointer-events-none opacity-30">
        <div className="font-sans text-[8px] font-bold uppercase tracking-widest text-stone-500">
          Status: Operational
        </div>
        <div className="font-sans text-[8px] font-bold uppercase tracking-[0.5em] text-stone-500">
          Valenzuela City • 2026
        </div>
        <div className="font-sans text-[8px] font-bold uppercase tracking-widest text-stone-500">
          ID: ARC-V1
        </div>
      </footer>
    </main>
  );
}
