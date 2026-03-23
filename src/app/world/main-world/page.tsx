"use client";

import React, { Suspense, useEffect, useState } from "react";
import { Canvas } from "@react-three/fiber";
import { PointerLockControls, Sky, Environment, PerspectiveCamera, useGLTF } from "@react-three/drei";
import { Physics, RigidBody, CuboidCollider } from "@react-three/rapier";
import { useStore } from "../../../hooks/useStore";
import Player from "../../../components/world/Player";
import LoadingScreen from "../../../components/world/LoadingScreen";
import MobileControls from "../../../components/world/MobileControls";
import House from "../../house/House";

function WorldFloor() {
  const { scene } = useGLTF("/floor.glb");
  return (
    <RigidBody type="fixed" colliders="trimesh">
      <primitive object={scene} />
    </RigidBody>
  );
}

function KeyboardListener() {
  const setMove = useStore((state) => state.setMove);
  useEffect(() => {
    const handleKey = (e: KeyboardEvent, value: boolean) => {
      if (e.code === "KeyW" || e.code === "ArrowUp") setMove("forward", value);
      if (e.code === "KeyS" || e.code === "ArrowDown") setMove("backward", value);
      if (e.code === "KeyA" || e.code === "ArrowLeft") setMove("left", value);
      if (e.code === "KeyD" || e.code === "ArrowRight") setMove("right", value);
      if (e.code === "Space") setMove("jump", value);
    };
    window.addEventListener("keydown", (e) => handleKey(e, true));
    window.addEventListener("keyup", (e) => handleKey(e, false));
    return () => {
      window.removeEventListener("keydown", (e) => handleKey(e, true));
      window.removeEventListener("keyup", (e) => handleKey(e, false));
    };
  }, [setMove]);
  return null;
}

export default function MainWorldPage() {
  const [isMobile, setIsMobile] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const [hasStarted, setHasStarted] = useState(false);
  const mapSize = 450000;

  useEffect(() => {
    setIsMounted(true);
    setIsMobile('ontouchstart' in window || navigator.maxTouchPoints > 0);
  }, []);

  const handleStart = () => {
    const element = document.documentElement;
    if (element.requestFullscreen) element.requestFullscreen();
    setHasStarted(true);
  };

  if (!isMounted) return <div className="w-full h-screen bg-black" />;

  return (
    <div className="w-full h-screen bg-black relative overflow-hidden touch-none">
      <KeyboardListener />
      <LoadingScreen />
      
      {/* 1. START OVERLAY (Ensures Fullscreen & Controller Visibility) */}
      {!hasStarted && isMobile && (
        <div className="fixed inset-0 z-[500] bg-black flex flex-col items-center justify-center p-6 text-center">
          <h1 className="text-orange-500 font-black text-3xl mb-2 tracking-tighter italic">NOVELARC</h1>
          <p className="text-stone-500 text-xs mb-8 uppercase tracking-widest">Optimizing Mobile Interface...</p>
          <button 
            onClick={handleStart}
            className="px-12 py-4 bg-orange-600 text-white font-bold rounded-full shadow-[0_0_40px_rgba(234,88,12,0.3)] active:scale-95 transition-all"
          >
            ENTER WORLD
          </button>
        </div>
      )}

      {/* 2. CONTROLLERS */}
      <MobileControls />

      <Canvas shadows>
        <Suspense fallback={null}>
          <PerspectiveCamera makeDefault position={[0, 5, 10]} fov={50} far={1000000} />
          <Sky distance={mapSize} sunPosition={[100, 20, 100]} />
          <Environment preset="city" background={false} />
          <ambientLight intensity={0.4} />
          <pointLight position={[10, 10, 10]} castShadow />

          <Physics gravity={[0, -9.81, 0]}>
            <WorldFloor />

{/* Place your first house */}
<House 
    id="starter-home" 
    position={[15, 0, -15]} 
  />


            
            <Player />
            <RigidBody type="fixed">
              <CuboidCollider args={[mapSize, 1000, 10]} position={[0, 500, -mapSize]} />
              <CuboidCollider args={[mapSize, 1000, 10]} position={[0, 500, mapSize]} />
              <CuboidCollider args={[10, 1000, mapSize]} position={[mapSize, 500, 0]} />
              <CuboidCollider args={[10, 1000, mapSize]} position={[-mapSize, 500, 0]} />
            </RigidBody>
          </Physics>

          {!isMobile && <PointerLockControls />}
        </Suspense>
      </Canvas>
    </div>
  );
}
