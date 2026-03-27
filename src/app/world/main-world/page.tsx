"use client";

import React, { Suspense, useEffect, useState } from "react";
import { Canvas } from "@react-three/fiber";
import { PointerLockControls, Sky, Environment, PerspectiveCamera, useGLTF } from "@react-three/drei";
import { Physics, RigidBody, CuboidCollider } from "@react-three/rapier";
import { useStore } from "../../../hooks/useStore";
import Player from "../../../components/world/Player";
import LoadingScreen from "../../../components/world/LoadingScreen";
import MobileControls from "../../../components/world/MobileControls";
import Billboard from "../../displayObject/Billboard";
import Road from "../../displayObject/Road";
import LightPost from "../../displayObject/LightPost"; // ✅ Added Import
import StartOverlay from "../../../components/world/StartOverlay";

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
  
  // ✅ 1. Reduced MapSize: 450,000 was causing the "Black Sky" bug. 
  // 20,000 is still huge but much more stable for the GPU.
  const mapSize = 20000; 

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

      <StartOverlay 
        show={isMobile && !hasStarted} 
        onStart={handleStart} 
      />

      <MobileControls />

      <Canvas shadows>
        <Suspense fallback={null}>
          {/* ✅ 2. Fixed Camera: Adjusted 'far' to match the new MapSize */}
          <PerspectiveCamera makeDefault position={[0, 5, 10]} fov={50} far={mapSize * 2} />
          
          {/* ✅ 3. Fixed Sky: Set distance to mapSize for a clean horizon */}
          <Sky distance={mapSize} sunPosition={[100, 20, 100]} mieCoefficient={0.005} rayleigh={2} />
          
          <Environment preset="city" background={false} />
          <ambientLight intensity={0.5} />
          <pointLight position={[10, 10, 10]} castShadow intensity={1.5} />

          <Physics gravity={[0, -9.81, 0]}>
            <WorldFloor />

{/* Road lifted to y=1.2 as requested */}
            <Road position={[0, 1.2, -100]} length={1000} />

            {/* ✅ ADDED: Alternating Light Posts along the road side ✅ */}
            {[...Array(20)].map((_, i) => {
              const isRightSide = i % 2 !== 0;
              const xPos = isRightSide ? 8.5 : -8.5; // Positions them on left/right edges
              const rotY = isRightSide ? Math.PI : 0; // Rotates right side 180° to face road

              return (
                <LightPost 
                  key={i} 
                  position={[xPos, 1.2, -i * 60]} // y=1.2 matches road height
                  rotation={[0, rotY, 0]} 
                />
              );
            })}

            {/* ✅ Billboard */}
            <Billboard 
              position={[8, 0, -20]} 
              rotation={[0, -Math.PI / 6, 0]} 
              title="NOVELARC" 
              description="Visualizing the Future"
            />
            
            <Player />

            {/* World Borders based on new MapSize */}
            <RigidBody type="fixed">
              <CuboidCollider args={[mapSize, 100, 10]} position={[0, 50, -mapSize]} />
              <CuboidCollider args={[mapSize, 100, 10]} position={[0, 50, mapSize]} />
              <CuboidCollider args={[10, 100, mapSize]} position={[mapSize, 50, 0]} />
              <CuboidCollider args={[10, 100, mapSize]} position={[-mapSize, 50, 0]} />
            </RigidBody>
          </Physics>

          {!isMobile && <PointerLockControls />}
        </Suspense>
      </Canvas>
    </div>
  );
}
