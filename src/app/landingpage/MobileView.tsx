"use client";

import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

export default function MobileView() {
  return (
    <main className="relative w-full h-screen flex flex-col items-center justify-between py-20 px-8 overflow-hidden bg-black touch-none">
      {/* Background stays the same for brand consistency */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_var(--tw-gradient-stops))] from-orange-900/30 via-black to-black -z-10" />

      <div className="text-center mt-10">
        <h1 className="text-6xl font-black tracking-tighter text-white">
          NOVEL<br />ARC
        </h1>
        <p className="text-stone-500 text-[8px] font-bold uppercase tracking-[0.6em] mt-4">Mobile Interface</p>
      </div>

      <div className="w-full space-y-8 relative z-10">
        <Link href="/world/main-world">
          <button className="w-full flex items-center justify-between bg-orange-600 text-white p-6 rounded-2xl font-black uppercase text-xs tracking-[0.2em] active:scale-95 transition-all shadow-[0_20px_50px_rgba(234,88,12,0.3)]">
            <span>Enter Journey</span>
            <ArrowRight size={18} />
          </button>
        </Link>
        <p className="text-[9px] text-stone-600 uppercase tracking-widest text-center">Rotate for Landscape experience</p>
      </div>

      <footer className="opacity-30">
        <div className="text-[8px] font-bold uppercase tracking-[0.5em] text-stone-500">ARC-V1 • 2026</div>
      </footer>
    </main>
  );
}
