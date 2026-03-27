"use client";

import React, { useMemo, Suspense } from "react";
import { useGLTF, Html, useProgress } from "@react-three/drei";
import { RigidBody } from "@react-three/rapier";

/** * ✅ STEP 1: Replace this URL with your actual GitHub Release link 
 * It should look exactly like this format:
 * https://github.com/USER/REPO/releases/download/v1.0.0/modern_house.glb
 */
// We add the 'cors-anywhere' prefix to your GitHub link
const HOUSE_URL = "https://cors-proxy.fringe.zone/https://github.com/alientoarvinb0477-cloud/novelarc-world/releases/download/v1.0.0/modern_house.glb";

// This component shows the download percentage for the 138MB file
function Loader() {
  const { progress } = useProgress();
  return (
    <Html center>
      <div style={{ 
        color: 'white', 
        background: 'rgba(0,0,0,0.9)', 
        padding: '20px', 
        borderRadius: '12px',
        border: '2px solid #fb923c', 
        textAlign: 'center', 
        width: '260px',
        fontFamily: 'sans-serif'
      }}>
        <h3 style={{ margin: '0 0 10px 0', fontSize: '14px', letterSpacing: '1px' }}>
          LOADING MODERN HOUSE
        </h3>
        <div style={{ width: '100%', background: '#333', height: '10px', borderRadius: '5px', overflow: 'hidden' }}>
           <div style={{ 
             width: `${progress}%`, 
             background: '#fb923c', 
             height: '100%', 
             transition: 'width 0.3s ease-out' 
           }} />
        </div>
        <p style={{ marginTop: '12px', fontSize: '20px', fontWeight: 'bold' }}>
          {Math.round(progress)}%
        </p>
        <p style={{ fontSize: '10px', color: '#888', textTransform: 'uppercase' }}>
          Downloading Asset (138MB)
        </p>
      </div>
    </Html>
  );
}

function HouseModel({ position, rotation, scale }: any) {
  // Load the model from the GitHub Release
  const { scene } = useGLTF(HOUSE_URL);
  
  // Memoize the clone to prevent unnecessary re-renders
  const clonedScene = useMemo(() => scene.clone(), [scene]);

  return (
    <RigidBody type="fixed" colliders="trimesh">
      <primitive 
        object={clonedScene} 
        position={position} 
        rotation={rotation} 
        scale={scale} 
        castShadow 
        receiveShadow
      />
    </RigidBody>
  );
}

export default function House(props: any) {
  return (
    <Suspense fallback={<Loader />}>
      <HouseModel {...props} />
    </Suspense>
  );
}

// Pre-load the URL immediately to start the stream
useGLTF.preload(HOUSE_URL);
