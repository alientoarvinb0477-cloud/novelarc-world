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

// Keyboard mapping for the Player controller
const keyMap = [
  { name: "forward", keys: ["ArrowUp", "KeyW"] },
  { name: "backward", keys: ["ArrowDown", "KeyS"] },
  { name: "left", keys: ["ArrowLeft", "KeyA"] },
  { name: "right", keys: ["ArrowRight", "KeyD"] },
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
  // We set the boundary to match the sky distance (450,000 units)
  const mapSize = 10000; 
  const wallHeight = 1000;

  return (
    <KeyboardControls map={keyMap}>
      <div className="w-full h-screen bg-black relative">
        <Canvas shadows>
          <Suspense fallback={null}>
            {/* 'far' is set to 1,000,000 so the sky/floor doesn't vanish in the distance */}
            <PerspectiveCamera makeDefault position={[0, 5, 10]} fov={50} far={1000000} />
            
            {/* Sky matches the mapSize boundary */}
            <Sky distance={mapSize} sunPosition={[100, 20, 100]} />
            
            {/* background={false} fixes the 'blurry view' issue */}
            <Environment preset="city" background={false} />
            
            <ambientLight intensity={0.4} />
            <pointLight position={[10, 10, 10]} castShadow />

            <Physics gravity={[0, -9.81, 0]}>
              <WorldFloor />
              <Player />

              {/* --- MASSIVE INVISIBLE BARRIERS --- */}
              <RigidBody type="fixed">
                {/* North Wall */}
                <CuboidCollider args={[mapSize, wallHeight, 10]} position={[0, wallHeight / 2, -mapSize]} />
                {/* South Wall */}
                <CuboidCollider args={[mapSize, wallHeight, 10]} position={[0, wallHeight / 2, mapSize]} />
                {/* East Wall */}
                <CuboidCollider args={[10, wallHeight, mapSize]} position={[mapSize, wallHeight / 2, 0]} />
                {/* West Wall */}
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

// Preload to prevent 'Application Error' popups during initial load
useGLTF.preload("/floor.glb");
