"use client";

import React, { useMemo, Suspense } from "react";
import { useGLTF, Html, useProgress } from "@react-three/drei";
import { RigidBody } from "@react-three/rapier";

// ✅ THE UPDATED DROPBOX RAW LINK ✅
const HOUSE_URL = "https://www.dropbox.com/scl/fi/g5s4xs85hzk8xs0jccoo7/modern_house.glb?rlkey=pr4oy137e873g053s8ykm28af&st=r105r3kt&raw=1";

function Loader() {
  const { progress } = useProgress();
  return (
    <Html center>
      <div style={{ 
        color: 'white', background: 'rgba(0,0,0,0.9)', padding: '20px', borderRadius: '12px',
        border: '2px solid #fb923c', textAlign: 'center', width: '250px',
        fontFamily: 'sans-serif', boxShadow: '0 10px 30px rgba(0,0,0,0.5)'
      }}>
        <h3 style={{ margin: '0 0 10px 0', fontSize: '14px' }}>DOWNLOAD ASSET (138MB)</h3>
        <div style={{ width: '100%', background: '#333', height: '10px', borderRadius: '5px', overflow: 'hidden' }}>
           <div style={{ width: `${progress}%`, background: '#fb923c', height: '100%', transition: 'width 0.3s ease' }} />
        </div>
        <p style={{ marginTop: '10px', fontSize: '18px', fontWeight: 'bold' }}>{Math.round(progress)}%</p>
        <p style={{ fontSize: '10px', color: '#888' }}>Please wait, large file loading...</p>
      </div>
    </Html>
  );
}

function HouseModel({ position, rotation, scale }: any) {
  // We use useGLTF with the raw Dropbox link
  const { scene } = useGLTF(HOUSE_URL);
  
  // Memoize the clone so it doesn't re-render and cause lag
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

// Start downloading as soon as the world begins
useGLTF.preload(HOUSE_URL);
