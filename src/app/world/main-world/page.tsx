"use client";

import React, { Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import { 
  PointerLockControls, 
  Sky, 
  Environment, 
  PerspectiveCamera,
  KeyboardControls,
  useGLTF // Added this for your model
} from "@react-three/drei";
import { Physics, RigidBody } from "@react-three/rapier";
import { Loader2 } from "lucide-react";
import Player from "../../../components/world/Player";

const keyMap = [
  { name: "forward", keys: ["ArrowUp", "KeyW"] },
  { name: "backward", keys: ["ArrowDown", "KeyS"] },
  { name: "left", keys: ["ArrowLeft", "KeyA"] },
  { name: "right", keys: ["ArrowRight", "KeyD"] },
  { name: "jump", keys: ["Space"] },
];

// --- UPDATED FLOOR COMPONENT ---
function WorldFloor() {
  const { scene } = useGLTF("/floor.glb");

  return (
    // We remove the automatic collider and use 'hull' or 'cuboid' 
    // if 'trimesh' continues to fail. 'hull' is usually the safest for custom floors.
    <RigidBody type="fixed" colliders="hull">
      <primitive object={scene} />
    </RigidBody>
  );
}

function LoadingUI() {
  return (
    <div className="absolute inset-0 flex flex-col items-center justify-center bg-stone-950 z-50">
      <Loader2 className="text-orange-600 animate-spin mb-4" size={40} />
      <span className="text-[10px] text-stone-500 font-bold uppercase tracking-[0.3em]">
        Manifesting Environment...
      </span>
    </div>
  );
}

export default function MainWorldPage() {
  return (
    <KeyboardControls map={keyMap}>
      <div className="w-full h-screen bg-black relative">
        
        {/* UI HUD */}
        <div className="absolute top-10 left-10 z-10 pointer-events-none">
          <h2 className="text-white font-sans text-[10px] font-bold uppercase tracking-[0.4em] opacity-50">
            Area: Main World / Sector 01
          </h2>
        </div>

        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 z-10 pointer-events-none text-center">
          <p className="text-stone-500 font-sans text-[9px] font-bold uppercase tracking-widest bg-black/40 backdrop-blur-md px-6 py-3 rounded-full border border-white/10">
            Click Screen to Control View • WASD to Move
          </p>
        </div>

        <Canvas shadows>
          <Suspense fallback={null}>
            <PerspectiveCamera makeDefault position={[0, 5, 10]} fov={50} />
            
            <Sky sunPosition={[100, 20, 100]} />
            <Environment preset="city" />
            <ambientLight intensity={0.4} />
            <pointLight position={[10, 10, 10]} castShadow />

            <Physics gravity={[0, -9.81, 0]}>
              {/* Using your custom GLB floor here */}
              <WorldFloor />
              
              <Player /> 
              
            </Physics>

            <PointerLockControls />
          </Suspense>
        </Canvas>

        <LoadingUI />
      </div>
    </KeyboardControls>
  );
}

// Pre-load the floor model to prevent flashing
useGLTF.preload("/floor.glb");
