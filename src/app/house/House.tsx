"use client";

import React, { useMemo, Suspense } from "react";
import { useGLTF, Html, useProgress } from "@react-three/drei";
import { RigidBody } from "@react-three/rapier";

// ✅ USE YOUR GITHUB RELEASE LINK HERE
// It will look like: https://github.com/USER/REPO/releases/download/v1.0.0/modern_house.glb
const HOUSE_URL = "PASTE_YOUR_COPIED_RELEASE_LINK_HERE";

function Loader() {
  const { progress } = useProgress();
  return (
    <Html center>
      <div style={{ 
        color: 'white', background: 'rgba(0,0,0,0.9)', padding: '20px', borderRadius: '12px',
        border: '2px solid #fb923c', textAlign: 'center', width: '250px'
      }}>
        <p>Downloading Asset (138MB)</p>
        <div style={{ width: '100%', background: '#333', height: '10px', borderRadius: '5px' }}>
           <div style={{ width: `${progress}%`, background: '#fb923c', height: '100%' }} />
        </div>
        <p style={{ marginTop: '10px' }}>{Math.round(progress)}%</p>
      </div>
    </Html>
  );
}

function HouseModel(props: any) {
  // We use the GitHub Release URL
  const { scene } = useGLTF(HOUSE_URL);
  const clonedScene = useMemo(() => scene.clone(), [scene]);

  return (
    <RigidBody type="fixed" colliders="trimesh">
      <primitive object={clonedScene} {...props} castShadow receiveShadow />
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

useGLTF.preload(HOUSE_URL);
