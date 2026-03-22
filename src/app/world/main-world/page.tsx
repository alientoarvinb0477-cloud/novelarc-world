"use client";

import React, { Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import { 
  PointerLockControls, 
  Sky, 
  Environment, 
  PerspectiveCamera,
  useTexture,
  useGLTF
} from "@react-three/drei";
import { Physics, RigidBody } from "@react-three/rapier";
import { Loader2 } from "lucide-react";
import Player from "@/components/world/Player";

// --- CUSTOM FLOOR COMPONENT ---
function WorldFloor() {
  // OPTION A: If your floor is a TEXTURE (Image)
  // const texture = useTexture("/your-floor-file.jpg"); 
  
  // OPTION B: If your floor is a 3D MODEL (.glb)
  // const { scene } = useGLTF("/your-floor-file.glb");

  return (
    <RigidBody type="fixed">
      {/* Default floor if you haven't linked your file yet */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
        <planeGeometry args={[100, 100]} />
        <meshStandardMaterial color="#1c1917" /> 
        {/* If using texture: <meshStandardMaterial map={texture} /> */}
      </mesh>
      
      {/* If using a 3D model: <primitive object={scene} /> */}
    </RigidBody>
  );
}

export default function MainWorldPage() {
  return (
    <div className="w-full h-screen bg-black relative">
      
      {/* --- UI OVERLAY (HUD) --- */}
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

      {/* --- 3D CANVAS --- */}
      <Canvas shadows>
        <Suspense fallback={null}>
          <PerspectiveCamera makeDefault position={[0, 2, 5]} fov={50} />
          
          {/* Lighting & Environment */}
          <Sky sunPosition={[100, 20, 100]} />
          <Environment preset="city" />
          <ambientLight intensity={0.4} />
          <pointLight position={[10, 10, 10]} castShadow />

<Physics gravity={[0, -9.81, 0]}>
  <WorldFloor />
  
  {/* The Player handles its own camera syncing and movement */}
  <Player /> 
</Physics>
            
            {/* Placeholder Object */}
            <RigidBody colliders="cuboid">
              <mesh position={[0, 1, -5]} castShadow>
                <boxGeometry args={[2, 2, 2]} />
                <meshStandardMaterial color="orange" />
              </mesh>
            </RigidBody>
          </Physics>

          {/* This captures the mouse for 1st person looking */}
          <PointerLockControls />
        </Suspense>
      </Canvas>

{/* Find the "Loading Screen" at the bottom and replace with this: */}
<Suspense fallback={
  <div className="absolute inset-0 flex flex-col items-center justify-center bg-stone-950 z-50">
    <Loader2 className="text-orange-600 animate-spin mb-4" size={40} />
    <span className="text-[10px] text-stone-500 font-bold uppercase tracking-[0.3em]">
      Manifesting Environment...
    </span>
  </div>
}>
  <div /> {/* Needs a child to be valid JSX */}
</Suspense>
    </div>
  );
}
