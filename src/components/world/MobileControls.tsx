"use client";

import React, { useEffect, useState, useRef } from "react";
import { useStore } from "../../hooks/useStore";
import { useRouter } from "next/navigation"; // Added for page transitions

export default function MobileControls() {
  const [isMobile, setIsMobile] = useState(false);
  const [isPortrait, setIsPortrait] = useState(false);
  const [basePos, setBasePos] = useState({ x: 140, y: 0 });
  const [showJoystick, setShowJoystick] = useState(false);

  const router = useRouter(); // Initialize router
  const setMove = useStore((state) => state.setMove);
  
  // Interaction Refs
  const lastTap = useRef(0);
  const touchStart = useRef({ x: 0, y: 0 });
  const thumbRef = useRef<HTMLDivElement>(null);

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
      setBasePos({ x: touch.clientX, y: touch.clientY });
      setShowJoystick(true);
    } 
    // 2. RIGHT SIDE: Tap Logic (Jump & Enter)
    else {
      touchStart.current = { x: touch.clientX, y: touch.clientY };
      
      const timeSinceLastTap = now - lastTap.current;

      // DOUBLE TAP (Jump)
      if (timeSinceLastTap < 300) {
        setMove("jump", true);
        setTimeout(() => setMove("jump", false), 100);
      } 
      // SINGLE TAP (Enter/Interact)
      else {
        // Wait 300ms to make sure a second tap isn't coming
        setTimeout(() => {
          // If 300ms passed and no new tap happened, it's a single tap
          if (Date.now() - lastTap.current >= 300) {
            // Check store to see if player is near a door
            const doorId = useStore.getState().nearDoor;
            
            if (doorId) {
              console.log("Entering house:", doorId);
              router.push(`/house/${doorId}`); // Navigate to the interior page
            }
          }
        }, 300);
      }
      lastTap.current = now;
    }
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    const touch = e.touches[0];

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

      {/* ACTION HINT */}
      <div className="absolute bottom-4 right-4 text-[8px] text-white/20 uppercase tracking-[0.3em] pointer-events-none">
        Tap: Enter • 2x Tap: Jump
      </div>
    </div>
  );
}
