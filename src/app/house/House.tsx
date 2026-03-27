"use client";

import React, { useMemo, Suspense } from "react";
import { useGLTF, Html, useProgress } from "@react-three/drei";
import { RigidBody } from "@react-three/rapier";

// ✅ Point this to the source defined in your vercel.json
const HOUSE_URL = "/assets/house.glb";

function Loader() {
  const { progress } = useProgress();
  return (
    <Html center>
      <div style={{ 
        color: 'white', background: 'rgba(0,0,0,0.95)', padding: '20px', borderRadius: '12px',
        border: '2px solid #fb923c', textAlign: 'center', width: '280px',
        boxShadow: '0 0 20px rgba(0,0,0,0.5)'
      }}>
        <h3 style={{ margin: '0 0 10px 0', fontSize: '14px' }}>ESTABLISHING SECURE CONNECTION</h3>
        <div style={{ width: '100%', background: '#333', height: '10px', borderRadius: '5px', overflow: 'hidden' }}>
           <div style={{ width: `${progress}%`, background: '#fb923c', height: '100%', transition: 'width 0.3s' }} />
        </div>
        <p style={{ marginTop: '10px', fontSize: '20px', fontWeight: 'bold' }}>{Math.round(progress)}%</p>
        <p style={{ fontSize: '10px', color: '#aaa' }}>Loading 138MB Asset via Vercel Rewrite</p>
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
