"use client";

import React from "react";
import { useGLTF } from "@react-three/drei";
import { RigidBody } from "@react-three/rapier";

interface HouseProps {
  modelPath: string;
  position?: [number, number, number];
  rotation?: [number, number, number];
  scale?: number;
}

export default function House({ 
  modelPath, 
  position = [0, 0, 0], 
  rotation = [0, 0, 0], 
  scale = 1 
}: HouseProps) {
  // Load the specific house model
  const { scene } = useGLTF(modelPath);

  return (
    <RigidBody type="fixed" colliders="trimesh" position={position} rotation={rotation}>
      <primitive object={scene.clone()} scale={scale} />
    </RigidBody>
  );
}
