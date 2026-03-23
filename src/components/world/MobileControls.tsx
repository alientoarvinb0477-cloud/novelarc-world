"use client";

import React, { useEffect, useState, useRef } from "react";
import { useStore } from "../../hooks/useStore";

export default function MobileControls() {
  const [isMobile, setIsMobile] = useState(false);
  const setMove = useStore((state) => state.setMove);
  
  // Refs for Joystick Positioning
  const joystickContainerRef = useRef<HTMLDivElement>(null);
  const thumbRef = useRef<HTMLDivElement>(null);
  const [joystickPos, setJoystickPos] = useState({ x: 100, y: 0 }); // Default start pos
  const [showJoystick, setShowJoystick] = useState(false);

  // Look Sensitivity Refs
  const touchStart = useRef({ x: 0, y: 0 });

  useEffect(() => {
    if (typeof window !== "undefined") {
      setIsMobile('ontouchstart' in window || navigator.maxTouchPoints > 0);
      // Set initial vertical position to bottom
      setJoystickPos(prev => ({ ...prev, y: window.innerHeight - 150 }));
    }
  }, []);

  if (!isMobile) return null;

  // --- DYNAMIC JOYSTICK LOGIC ---
  const handleLeftTouchStart = (e: React.TouchEvent) => {
    const touch = e.touches[0];
    // Center the joystick exactly where the thumb landed
    setJoystickPos({ x: touch.clientX, y: touch.clientY });
    setShowJoystick(true);
  };

  const handleJoystickMove = (e: React.TouchEvent) => {
    if (!thumbRef.current) return;
    
    const touch = e.touches[0];
    let dx = touch.clientX - joystickPos.x;
    let dy = touch.clientY - joystickPos.y;
    
    const distance = Math.sqrt(dx * dx + dy * dy);
    const maxRadius = 50; // Distance the knob can travel
    
    if (distance > maxRadius) {
      dx *= maxRadius / distance;
      dy *= maxRadius / distance;
    }

    thumbRef.current.style.transform = `translate(${dx}px, ${dy}px)`;

    // Map to Movement Store
    const threshold = 10; 
    setMove("forward", dy < -threshold);
    setMove("backward", dy > threshold);
    setMove("left", dx < -threshold);
    setMove("right", dx > threshold);
  };

  const resetJoystick = () => {
    setShowJoystick(false);
    setMove("forward", false);
    setMove("backward", false);
    setMove("left", false);
    setMove("right", false);
  };

  // --- LOOK AROUND LOGIC (Right Side) ---
  const handleLookMove = (e: React.TouchEvent) => {
    const touch = e.touches[0];
    if (touch.clientX < window.innerWidth / 2) return;

    const deltaX = touch.clientX - touchStart.current.x;
    const deltaY = touch.clientY - touchStart.current.y;
    touchStart.current = { x: touch.clientX, y: touch.clientY };

    window.dispatchEvent(new MouseEvent("mousemove", {
      movementX: deltaX * 1.5,
      movementY: deltaY * 1.5,
      bubbles: true
    }));
  };

  return (
    <div className="fixed inset-0 z-[150] select-none pointer-events-none overflow-hidden touch-none">
      
      {/* LEFT ZONE: Joystick Trigger Area */}
      <div 
        className="absolute inset-y-0 left-0 w-1/2 pointer-events-auto"
        onTouchStart={handleLeftTouchStart}
        onTouchMove={handleJoystickMove}
        onTouchEnd={resetJoystick}
      />

      {/* RIGHT ZONE: Look Area */}
      <div 
        className="absolute inset-y-0 right-0 w-1/2 pointer-events-auto"
        onTouchStart={(e) => { touchStart.current = { x: e.touches[0].clientX, y: e.touches[0].clientY }; }}
        onTouchMove={handleLookMove}
      />

      {/* --- THE DYNAMIC JOYSTICK VISUAL --- */}
      <div 
        ref={joystickContainerRef}
        style={{ 
          left: joystickPos.x, 
          top: joystickPos.y, 
          opacity: showJoystick ? 1 : 0,
          transform: 'translate(-50%, -50%)' 
        }}
        className="absolute w-32 h-32 rounded-full bg-stone-900/40 border-2 border-white/10 backdrop-blur-md flex items-center justify-center transition-opacity duration-200 pointer-events-none"
      >
        {/* Decorative Ring */}
        <div className="absolute inset-4 rounded-full border border-orange-500/20" />
        
        {/* Thumb Knob */}
        <div 
          ref={thumbRef}
          className="w-14 h-14 rounded-full bg-gradient-to-br from-orange-400 to-orange-600 shadow-[0_0_20px_rgba(234,88,12,0.6)] border-2 border-orange-300/30 flex items-center justify-center transition-transform duration-75"
        >
          <div className="w-6 h-6 rounded-full bg-white/10" />
        </div>
      </div>

      {/* --- FIXED ACTION BUTTON (Bottom Right) --- */}
      <div className="absolute bottom-12 right-12 pointer-events-auto">
        <button 
          onPointerDown={() => setMove("jump", true)} 
          onPointerUp={() => setMove("jump", false)}
          className="w-20 h-20 rounded-full bg-orange-600/20 border-2 border-orange-500/50 flex items-center justify-center active:bg-orange-600 active:scale-90 transition-all shadow-[0_0_30px_rgba(234,88,12,0.2)]"
        >
          <span className="text-orange-500 font-bold text-[10px] uppercase active:text-white">Jump</span>
        </button>
      </div>

    </div>
  );
}
