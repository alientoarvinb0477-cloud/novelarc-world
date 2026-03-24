"use client";
import Link from "next/link";

export default function DesktopView() {
  return (
    <main className="h-screen w-full bg-stone-950 flex flex-col items-center justify-center text-white p-20">
      <h1 className="text-8xl font-black italic tracking-tighter text-orange-500 mb-4 animate-pulse">
        NOVELARC
      </h1>
      <p className="text-stone-400 text-lg uppercase tracking-[0.5em] mb-12">
        High Fidelity Web Architecture
      </p>
      
      <Link href="/world/main-world">
        <button className="px-10 py-4 border-2 border-orange-500 text-orange-500 font-bold rounded-sm hover:bg-orange-500 hover:text-white transition-all">
          ENTER WORLD
        </button>
      </Link>
    </main>
  );
}
