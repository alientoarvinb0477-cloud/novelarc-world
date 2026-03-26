"use client";

import React from "react";
import { RigidBody } from "@react-three/rapier";
import { MeshReflectorMaterial } from "@react-three/drei";

export default function Road({ position = [0, 1.0, 0] as [number, number, number], length = 1000, roadWidth = 15 }) {
  return (
    <group position={position}>
      <RigidBody type="fixed" colliders="cuboid">
        {/* Asphalt Surface */}
        <mesh receiveShadow rotation={[-Math.PI / 2, 0, 0]}>
          <planeGeometry args={[roadWidth, length]} />
          <MeshReflectorMaterial
            blur={[400, 100]}
            resolution={512}
            mixBlur={1}
            mixStrength={10}
            roughness={1}
            color="#1a1a1a"
            metalness={0.2}
            mirror={0.15}
          />
        </mesh>

        {/* Center Yellow Line - Elevated slightly more to stop "damage" look */}
        <mesh position={[0, 0.05, 0]}>
          <boxGeometry args={[0.2, 0.01, length]} />
          <meshStandardMaterial color="#ffcc00" emissive="#ffcc00" emissiveIntensity={0.2} />
        </mesh>

        {/* White Boundary Lines - Elevated to 0.04 to prevent flickering */}
        <mesh position={[-(roadWidth / 2 - 0.5), 0.04, 0]}>
          <boxGeometry args={[0.2, 0.01, length]} />
          <meshStandardMaterial color="white" opacity={0.8} transparent />
        </mesh>
        <mesh position={[(roadWidth / 2 - 0.5), 0.04, 0]}>
          <boxGeometry args={[0.2, 0.01, length]} />
          <meshStandardMaterial color="white" opacity={0.8} transparent />
        </mesh>
      </RigidBody>
    </group>
  );
}
