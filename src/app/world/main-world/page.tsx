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
import LightPost from "../../displayObject/LightPost";
import StartOverlay from "../../../components/world/StartOverlay";
import * as THREE from "three";

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
  const mapSize = 10000; 

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

      <StartOverlay show={isMobile && !hasStarted} onStart={handleStart} />
      <MobileControls />

      {/* PCFShadowMap fixes the shadow deprecation warning */}
      <Canvas shadows={{ type: THREE.PCFShadowMap }}>
        <Suspense fallback={null}>
          <PerspectiveCamera makeDefault position={[0, 5, 10]} fov={50} far={mapSize * 2} />
          
          {/* ✅ Sky distance set to mapSize to prevent black background ✅ */}
          <Sky distance={mapSize} sunPosition={[100, 20, 100]} mieCoefficient={0.005} rayleigh={3} />
          
          {/* ✅ Fog Removed for maximum smoothness ✅ */}
          
          <Environment preset="city" background={false} />
          <ambientLight intensity={0.6} />
          <directionalLight position={[10, 20, 10]} intensity={1.5} castShadow />

          <Physics gravity={[0, -9.81, 0]}>
            <WorldFloor />

            <Road position={[0, 1.0, -100]} length={3000} roadWidth={15} />

            {/* ✅ FIXED: Alternating Light Posts (Left and Right) ✅ */}
            {[...Array(20)].map((_, i) => {
              const isRightSide = i % 2 !== 0;
              const xPos = isRightSide ? 8.5 : -8.5;
              const rotY = isRightSide ? Math.PI : 0; // Rotates right side 180 degrees to face road

              return (
                <LightPost 
                  key={i} 
                  position={[xPos, 1.0, -i * 50]} 
                  rotation={[0, rotY, 0]} 
                />
              );
            })}

            <Billboard 
              position={[12, 0, -40]} 
              rotation={[0, -Math.PI / 6, 0]} 
              title="NOVELARC" 
              description="Visualizing the Future"
            />
            
            <Player />

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
