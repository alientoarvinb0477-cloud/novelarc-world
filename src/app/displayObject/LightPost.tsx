"use client";

import React from "react";
import { RigidBody } from "@react-three/rapier";

export default function LightPost({ position = [0, 0, 0], rotation = [0, 0, 0] }) {
  return (
    <group position={position} rotation={rotation}>
      <RigidBody type="fixed" colliders="cuboid">
        {/* Pole */}
        <mesh castShadow position={[0, 4, 0]}>
          <cylinderGeometry args={[0.1, 0.1, 8, 8]} />
          <meshStandardMaterial color="#222" />
        </mesh>

        {/* Arm - Notice position is relative to the group */}
        <mesh castShadow position={[0.7, 7.8, 0]} rotation={[0, 0, Math.PI / 2]}>
          <cylinderGeometry args={[0.05, 0.05, 1.5, 8]} />
          <meshStandardMaterial color="#222" />
        </mesh>

        {/* Light Head */}
        <mesh position={[1.4, 7.8, 0]}>
          <boxGeometry args={[0.5, 0.2, 0.3]} />
          <meshStandardMaterial color="#111" />
        </mesh>

        <pointLight position={[1.4, 7.5, 0]} intensity={20} distance={20} color="#ffdfad" castShadow />
      </RigidBody>
    </group>
  );
}
