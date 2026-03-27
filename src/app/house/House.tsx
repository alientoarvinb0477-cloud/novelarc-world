"use client";

import React, { useMemo, Suspense } from "react";
import { useGLTF, Html, useProgress } from "@react-three/drei";
import { RigidBody } from "@react-three/rapier";

// ✅ Use the Dropbox link with ?raw=1 at the end
const HOUSE_URL = "https://www.dropbox.com/scl/fi/g5s4xs85hzk8xs0jccoo7/modern_house.glb?raw=1";

function Loader() {
  const { progress } = useProgress();
  return (
    <Html center>
      <div style={{ 
        color: 'white', background: 'black', padding: '15px', borderRadius: '8px',
        border: '1px solid #333', textAlign: 'center', width: '220px'
      }}>
        <p style={{ marginBottom: '10px' }}>Downloading House (138MB)</p>
        <div style={{ width: '100%', background: '#222', height: '8px', borderRadius: '4px' }}>
           <div style={{ width: `${progress}%`, background: '#fb923c', height: '100%', borderRadius: '4px' }} />
        </div>
        <p style={{ marginTop: '10px' }}>{Math.round(progress)}%</p>
      </div>
    </Html>
  );
}

function HouseModel(props: any) {
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
