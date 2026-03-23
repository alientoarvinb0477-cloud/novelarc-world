"use client";

import React, { Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import { 
  PointerLockControls, 
  Sky, 
  Environment, 
  PerspectiveCamera,
  KeyboardControls,
  useGLTF 
} from "@react-three/drei";
import { Physics, RigidBody, CuboidCollider } from "@react-three/rapier";
import Player from "../../../components/world/Player";
import LoadingScreen from "../../../components/world/LoadingScreen";
import MobileControls from "../../../components/world/MobileControls";

// 1. Ensure these keys match exactly what Player.tsx expects
const keyMap = [
  { name: "forward", keys: ["ArrowUp", "KeyW", "w", "W"] },
  { name: "backward", keys: ["ArrowDown", "KeyS", "s", "S"] },
  { name: "left", keys: ["ArrowLeft", "KeyA", "a", "A"] },
  { name: "right", keys: ["ArrowRight", "KeyD", "d", "D"] },
  { name: "jump", keys: ["Space"] },
];

function WorldFloor() {
  const { scene } = useGLTF("/floor.glb");
  return (
    <RigidBody type="fixed" colliders="trimesh">
      <primitive object={scene} />
    </RigidBody>
  );
}

export default function MainWorldPage() {
  const mapSize = 450000; 
  const wallHeight = 1000;

  return (
    // KeyboardControls MUST wrap the entire return to catch events
    <KeyboardControls map={keyMap}>
      <div className="w-full h-screen bg-black relative">
        
        {/* UI Layers (Must have pointer-events-none where needed) */}
        <LoadingScreen />
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
              <Player />

              {/* Barriers */}
              <RigidBody type="fixed">
                <CuboidCollider args={[mapSize, wallHeight, 10]} position={[0, wallHeight / 2, -mapSize]} />
                <CuboidCollider args={[mapSize, wallHeight, 10]} position={[0, wallHeight / 2, mapSize]} />
                <CuboidCollider args={[10, wallHeight, mapSize]} position={[mapSize, wallHeight / 2, 0]} />
                <CuboidCollider args={[10, wallHeight, mapSize]} position={[-mapSize, wallHeight / 2, 0]} />
              </RigidBody>
            </Physics>

            <PointerLockControls />
          </Suspense>
        </Canvas>
      </div>
    </KeyboardControls>
  );
}

useGLTF.preload("/floor.glb");
