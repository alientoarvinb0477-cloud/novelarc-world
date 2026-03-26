"use client";

import React from "react";
import { RigidBody } from "@react-three/rapier";

export default function Road({ 
  position = [0, 0.2, 0], // Lifted higher off the floor
  length = 500, 
  roadWidth = 12,
  grassWidth = 8
}) {
  return (
    <group position={position}>
      <RigidBody type="fixed" colliders="cuboid">
        {/* MAIN ROAD - Dark Gray */}
        <mesh receiveShadow position={[0, 0.1, 0]}>
          <boxGeometry args={[roadWidth, 0.2, length]} />
          <meshStandardMaterial color="#222222" roughness={0.9} />
        </mesh>

        {/* LEFT GRASS - Forest Green */}
        <mesh receiveShadow position={[-(roadWidth / 2 + grassWidth / 2), 0.05, 0]}>
          <boxGeometry args={[grassWidth, 0.15, length]} />
          <meshStandardMaterial color="#1b3d17" />
        </mesh>

        {/* RIGHT GRASS - Forest Green */}
        <mesh receiveShadow position={[(roadWidth / 2 + grassWidth / 2), 0.05, 0]}>
          <boxGeometry args={[grassWidth, 0.15, length]} />
          <meshStandardMaterial color="#1b3d17" />
        </mesh>

        {/* OPTIONAL: Center White Line for Visibility */}
        <mesh position={[0, 0.21, 0]}>
          <boxGeometry args={[0.2, 0.01, length]} />
          <meshStandardMaterial color="white" />
        </mesh>
      </RigidBody>
    </group>
  );
}
