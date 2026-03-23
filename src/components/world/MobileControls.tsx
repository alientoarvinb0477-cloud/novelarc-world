"use client";
import { useStore } from "../hooks/useStore";

export default function MobileControls() {
  const setMove = useStore((state) => state.setMove);

  return (
    <div className="fixed inset-0 z-[150] pointer-events-none">
      <div className="absolute bottom-10 left-10 flex flex-col items-center gap-2 pointer-events-auto">
        <button 
          onPointerDown={() => setMove("forward", true)} 
          onPointerUp={() => setMove("forward", false)}
          className="w-16 h-16 bg-stone-900 border border-stone-700 rounded-full flex items-center justify-center active:bg-orange-600 text-white"
        >▲</button>
        {/* Repeat for Left, Right, Down and Jump using setMove("direction", true/false) */}
      </div>
    </div>
  );
}
