"use client";

import React, { useEffect, useState, useRef } from "react";
import { useStore } from "../../hooks/useStore";

export default function MobileControls() {
  const [isMobile, setIsMobile] = useState(false);
  const setMove = useStore((state) => state.setMove);
  
  // Joystick Refs
  const joystickRef = useRef<HTMLDivElement>(null);
  const thumbRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);

  // Look Sensitivity Refs
  const touchStart = useRef({ x: 0, y: 0 });

  useEffect(() => {
    if (typeof window !== "undefined") {
      setIsMobile('ontouchstart' in window || navigator.maxTouchPoints > 0);
    }
  }, []);

  if (!isMobile) return null;

  // --- LOOK AROUND LOGIC (Right Side of Screen) ---
  const handleLookMove = (e: React.TouchEvent) => {
    if (isDragging) return; // Don't rotate camera if moving joystick
    const touch = e.touches[0];
    const deltaX = touch.clientX - touchStart.current.x;
    const deltaY = touch.clientY - touchStart.current.y;
    touchStart.current = { x: touch.clientX, y: touch.clientY };

    window.dispatchEvent(new MouseEvent("mousemove", {
      movementX: deltaX * 1.2,
      movementY: deltaY * 1.2,
      bubbles: true
    }));
  };

  // --- MOBILE LEGENDS JOYSTICK LOGIC ---
  const handleJoystickMove = (e: React.TouchEvent) => {
    if (!joystickRef.current || !thumbRef.current) return;
    
    const rect = joystickRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    
    const touch = e.touches[0];
    let dx = touch.clientX - centerX;
    let dy = touch.clientY - centerY;
    
    const distance = Math.sqrt(dx * dx + dy * dy);
    const maxRadius = rect.width / 2;
    
    // Limit thumb movement to the outer circle
    if (distance > maxRadius) {
      dx *= maxRadius / distance;
      dy *= maxRadius / distance;
    }

    // Move the visual thumb
    thumbRef.current.style.transform = `translate(${dx}px, ${dy}px)`;

    // Map Joystick to Store Directions
    const threshold = 15; // Minimum drag to trigger movement
    setMove("forward", dy < -threshold);
    setMove("backward", dy > threshold);
    setMove("left", dx < -threshold);
    setMove("right", dx > threshold);
  };

  const resetJoystick = () => {
    setIsDragging(false);
    if (thumbRef.current) thumbRef.current.style.transform = `translate(0px, 0px)`;
    setMove("forward", false);
    setMove("backward", false);
    setMove("left", false);
    setMove("right", false);
  };

  return (
    <div className="fixed inset-0 z-[150] select-none pointer-events-none">
      
      {/* Look Area (Right Half of Screen) */}
      <div 
        className="absolute inset-y-0 right-0 w-1/2 pointer-events-auto"
        onTouchStart={(e) => { touchStart.current = { x: e.touches[0].clientX, y: e.touches[0].clientY }; }}
        onTouchMove={handleLookMove}
      />

      {/* --- THE ANALOG JOYSTICK (Left Side) --- */}
      <div className="absolute bottom-16 left-16 pointer-events-auto">
        <div 
          ref={joystickRef}
          className="w-32 h-32 rounded-full bg-stone-900/40 border-2 border-stone-700/50 flex items-center justify-center backdrop-blur-sm"
          onTouchStart={() => setIsDragging(true)}
          onTouchMove={handleJoystickMove}
          onTouchEnd={resetJoystick}
        >
          {/* Central Knob */}
          <div 
            ref={thumbRef}
            className="w-14 h-14 rounded-full bg-orange-600 shadow-[0_0_20px_rgba(234,88,12,0.6)] border-2 border-orange-400/50 pointer-events-none transition-transform duration-75"
          />
        </div>
      </div>

      {/* --- THE ACTION BUTTON (Right Side) --- */}
      <div className="absolute bottom-16 right-16 pointer-events-auto">
        <button 
          onPointerDown={() => setMove("jump", true)} 
          onPointerUp={() => setMove("jump", false)}
          className="w-24 h-24 rounded-full bg-stone-900/60 border-2 border-orange-600/50 flex items-center justify-center active:scale-95 active:bg-orange-600 transition-all shadow-[0_0_30px_rgba(0,0,0,0.5)]"
        >
          <span className="text-orange-500 font-black tracking-widest text-[10px] uppercase active:text-white">Jump</span>
        </button>
      </div>

    </div>
  );
}
