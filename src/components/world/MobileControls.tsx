"use client";

import React, { useEffect, useState, useRef } from "react";
import { useStore } from "../../hooks/useStore";

export default function MobileControls() {
  const [isMobile, setIsMobile] = useState(false);
  const [isPortrait, setIsPortrait] = useState(false);
  const [basePos, setBasePos] = useState({ x: 140, y: 0 });
  const [showJoystick, setShowJoystick] = useState(false);

  const setMove = useStore((state) => state.setMove);
  const thumbRef = useRef<HTMLDivElement>(null);
  
  // Interaction Refs
  const lastTap = useRef(0);
  const touchStart = useRef({ x: 0, y: 0 });

  useEffect(() => {
    if (typeof window !== "undefined") {
      const check = () => {
        setIsMobile('ontouchstart' in window || navigator.maxTouchPoints > 0);
        setIsPortrait(window.innerHeight > window.innerWidth);
        setBasePos({ x: 140, y: window.innerHeight - 140 });
      };
      check();
      window.addEventListener("resize", check);
      return () => window.removeEventListener("resize", check);
    }
  }, []);

  if (!isMobile) return null;

  // Portrait Lock
  if (isPortrait) {
    return (
      <div className="fixed inset-0 z-[9999] bg-stone-950 flex flex-col items-center justify-center p-10 text-center">
        <div className="w-16 h-10 border-2 border-orange-500 rounded-lg animate-bounce mb-4" />
        <h2 className="text-white font-bold uppercase text-[10px] tracking-widest">Rotate for Landscape</h2>
      </div>
    );
  }

  // --- INTERACTION LOGIC ---
  const handleTouchStart = (e: React.TouchEvent) => {
    const touch = e.touches[0];
    const now = Date.now();

    // 1. LEFT SIDE: Joystick Start
    if (touch.clientX < window.innerWidth / 2) {
      setJoystickPos(touch.clientX, touch.clientY);
      setShowJoystick(true);
    } 
    // 2. RIGHT SIDE: Tap Logic (Jump & Enter)
    else {
      touchStart.current = { x: touch.clientX, y: touch.clientY };
      
      // Double Tap check (Jump)
      if (now - lastTap.current < 300) {
        setMove("jump", true);
        setTimeout(() => setMove("jump", false), 100); // Quick reset for jump
      } 
      // Single Tap (Enter/Interact)
      else {
        console.log("Interact/Enter Triggered"); 
        // You can add an 'interact' state to your store if needed
      }
      lastTap.current = now;
    }
  };

  const setJoystickPos = (x: number, y: number) => {
    setBasePos({ x, y });
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    const touch = e.touches[0];

    // JOYSTICK MOVEMENT (If touch is on left side or dragging joystick)
    if (showJoystick) {
      let dx = touch.clientX - basePos.x;
      let dy = touch.clientY - basePos.y;
      const distance = Math.sqrt(dx * dx + dy * dy);
      const maxRadius = 50;

      if (distance > maxRadius) {
        dx *= maxRadius / distance;
        dy *= maxRadius / distance;
      }

      if (thumbRef.current) {
        thumbRef.current.style.transform = `translate(${dx}px, ${dy}px)`;
      }

      const threshold = 15;
      setMove("forward", dy < -threshold);
      setMove("backward", dy > threshold);
      setMove("left", dx < -threshold);
      setMove("right", dx > threshold);
    } 
    
    // LOOK MOVEMENT (If touch is on right side)
    if (touch.clientX > window.innerWidth / 2) {
      const deltaX = touch.clientX - touchStart.current.x;
      const deltaY = touch.clientY - touchStart.current.y;
      touchStart.current = { x: touch.clientX, y: touch.clientY };

      window.dispatchEvent(new MouseEvent("mousemove", {
        movementX: deltaX * 2,
        movementY: deltaY * 2,
        bubbles: true
      }));
    }
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (e.touches.length === 0) {
      setShowJoystick(false);
      setMove("forward", false);
      setMove("backward", false);
      setMove("left", false);
      setMove("right", false);
    }
  };

  return (
    <div 
      className="fixed inset-0 w-screen h-screen z-[999] pointer-events-auto select-none touch-none overflow-hidden"
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      {/* JOYSTICK VISUAL */}
      <div 
        style={{ 
          left: `${basePos.x}px`, 
          top: `${basePos.y}px`, 
          opacity: showJoystick ? 1 : 0,
          transform: 'translate(-50%, -50%)',
          width: '140px',
          height: '140px'
        }}
        className="absolute rounded-full bg-stone-900/60 border-2 border-orange-500/40 backdrop-blur-md flex items-center justify-center transition-opacity pointer-events-none"
      >
        <div 
          ref={thumbRef} 
          style={{ width: '60px', height: '60px' }}
          className="rounded-full bg-gradient-to-br from-orange-500 to-orange-700 border-2 border-orange-400 shadow-2xl"
        />
      </div>

      {/* ACTION HINT (Small visual cue for Tap zones) */}
      <div className="absolute bottom-4 right-4 text-[8px] text-white/20 uppercase tracking-[0.3em] pointer-events-none">
        Tap: Enter • 2x Tap: Jump
      </div>
    </div>
  );
}
