"use client";

import React from "react";
import { RigidBody } from "@react-three/rapier";

export default function LightPost({ position = [0, 0, 0] as [number, number, number], rotation = [0, 0, 0] as [number, number, number] }) {
  // If the position is missing, don't render to prevent crashes
  if (!position) return null;

  return (
    <group position={position} rotation={rotation}>
      <RigidBody type="fixed" colliders="cuboid">
        {/* Pole */}
        <mesh castShadow position={[0, 4, 0]}>
          <boxGeometry args={[0.2, 8, 0.2]} /> {/* Box is more stable than Cylinder for performance */}
          <meshStandardMaterial color="#222" />
        </mesh>

        {/* Arm */}
        <mesh castShadow position={[0.7, 7.8, 0]}>
          <boxGeometry args={[1.5, 0.1, 0.1]} />
          <meshStandardMaterial color="#222" />
        </mesh>

        {/* Light Head */}
        <mesh position={[1.4, 7.8, 0]}>
          <boxGeometry args={[0.6, 0.2, 0.4]} />
          <meshStandardMaterial color="#111" />
        </mesh>

        {/* Simple Light Source */}
        <pointLight position={[1.4, 7.4, 0]} intensity={10} distance={15} color="#ffdfad" />
      </RigidBody>
    </group>
  );
}
