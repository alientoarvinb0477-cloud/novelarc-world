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
  const mapSize = 450000; 
  const wallHeight = 1000;

  return (
    <KeyboardControls map={keyMap}>
      <div className="w-full h-screen bg-black relative">
        
        {/* The Loading Screen handles its own visibility based on useProgress */}
        <LoadingScreen />

        <MobileControls /> {/* Add this here */}

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

              {/* --- INVISIBLE BARRIERS --- */}
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
