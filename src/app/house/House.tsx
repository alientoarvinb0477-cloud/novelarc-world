"use client";

import React, { useMemo } from "react";
import { useGLTF } from "@react-three/drei";
import { RigidBody } from "@react-three/rapier";

// ✅ Your exact Google Drive Direct Download Link ✅
const HOUSE_URL = "https://drive.google.com/uc?export=download&id=1kbnmKXstDT2CGKgCgvz4vRQ45AFIcpbd";

export default function House({ position = [0, 0, 0], rotation = [0, 0, 0], scale = 1.5 }: any) {
  
  // Load the model from your Google Drive
  const { scene } = useGLTF(HOUSE_URL);

  // Clone the scene so we can place multiple houses
  const clonedScene = useMemo(() => scene.clone(), [scene]);

  return (
    <group position={position} rotation={rotation}>
      <RigidBody type="fixed" colliders="trimesh">
        <primitive 
          object={clonedScene} 
          scale={scale} 
          castShadow 
          receiveShadow 
        />
      </RigidBody>
    </group>
  );
}

// Pre-load the Drive link for faster loading
useGLTF.preload(HOUSE_URL);
