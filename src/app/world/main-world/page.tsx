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

const keyMap = [
  { name: "forward", keys: ["ArrowUp", "KeyW"] },
  { name: "backward", keys: ["ArrowDown", "KeyS"] },
  { name: "left", keys: ["ArrowLeft", "KeyA"] },
  { name: "right", keys: ["ArrowRight", "KeyD"] },
  { name: "jump", keys: ["Space"] },
];

function WorldFloor() {
  const { scene } = useGLTF("/floor.glb"); //
  return (
    <RigidBody type="fixed" colliders="trimesh">
      <primitive object={scene} />
    </RigidBody>
  );
}

export default function MainWorldPage() {
  // Define the size of your floor. If your GLB is 100x100 units, use 50 here.
  const mapSize = 50; 

  return (
    <KeyboardControls map={keyMap}>
      <div className="w-full h-screen bg-black relative">
        <Canvas shadows>
          <Suspense fallback={null}>
            {/* Increase 'far' so the floor and sky don't clip away */}
            <PerspectiveCamera makeDefault position={[0, 5, 10]} fov={50} far={10000} />
            
            {/* Push the sky out to the horizon */}
            <Sky distance={450000} sunPosition={[100, 20, 100]} />
            <Environment preset="city" background={false} />
            
            <ambientLight intensity={0.4} />
            <pointLight position={[10, 10, 10]} castShadow />

            <Physics gravity={[0, -9.81, 0]}>
              <WorldFloor />
              <Player />

              {/* --- INVISIBLE BARRIERS --- */}
              <RigidBody type="fixed">
                {/* North Wall */}
                <CuboidCollider args={[mapSize, 10, 1]} position={[0, 5, -mapSize]} />
                {/* South Wall */}
                <CuboidCollider args={[mapSize, 10, 1]} position={[0, 5, mapSize]} />
                {/* East Wall */}
                <CuboidCollider args={[1, 10, mapSize]} position={[mapSize, 5, 0]} />
                {/* West Wall */}
                <CuboidCollider args={[1, 10, mapSize]} position={[-mapSize, 5, 0]} />
              </RigidBody>
            </Physics>

            <PointerLockControls />
          </Suspense>
        </Canvas>
      </div>
    </KeyboardControls>
  );
}

useGLTF.preload("/floor.glb"); //
