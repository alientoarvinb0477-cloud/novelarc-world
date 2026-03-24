"use client";
import Link from "next/link";

export default function MobileView() {
  return (
    <main className="h-screen w-full bg-stone-900 flex flex-col items-center justify-between py-20 px-10 text-center">
      <div className="mt-10">
        <h1 className="text-5xl font-black italic text-orange-500">NOVELARC</h1>
        <p className="text-stone-500 text-xs mt-2 tracking-widest uppercase">Mobile Interface</p>
      </div>

      <div className="w-full space-y-4">
        <Link href="/world/main-world" className="block">
          <button className="w-full py-6 bg-orange-600 text-white font-black rounded-xl shadow-lg active:scale-95 transition-transform uppercase tracking-widest">
            START JOURNEY
          </button>
        </Link>
        <p className="text-[10px] text-stone-600 uppercase">Use Landscape for best experience</p>
      </div>
    </main>
  );
}
