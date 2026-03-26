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
  
  // Adjusted mapSize to prevent "Black Sky" math errors
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

      <StartOverlay show={isMobile && !hasStarted} onStart={handleStart} />
      <MobileControls />

      <Canvas shadows>
        <Suspense fallback={null}>
          <PerspectiveCamera makeDefault position={[0, 5, 10]} fov={50} far={mapSize * 2} />
          
          {/* Restored Day Sky */}
          <Sky distance={mapSize} sunPosition={[100, 20, 100]} mieCoefficient={0.005} rayleigh={3} />
          
          {/* Adjusted Fog: Starts 50 units away so the area around the player is clear */}
          <fog attach="fog" args={["#87ceeb", 50, 1500]} />
          
          <Environment preset="city" background={false} />
          <ambientLight intensity={0.5} />
          <directionalLight position={[10, 20, 10]} intensity={1.2} castShadow />

          <Physics gravity={[0, -9.81, 0]}>
            <WorldFloor />

            {/* The Main Road */}
            <Road position={[0, 1.0, -100]} length={3000} roadWidth={15} />

            {/* Alternating Light Posts */}
            {[...Array(25)].map((_, i) => {
              const isLeft = i % 2 === 0;
              const xPos = isLeft ? -8.5 : 8.5; // Left or Right side of road
              const rotY = isLeft ? 0 : Math.PI; // Flip 180 degrees for the right side

              return (
                <LightPost 
                  key={i} 
                  position={[xPos, 1.0, -i * 60]} // Spaced 60 units apart
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

            {/* World Boundaries */}
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
