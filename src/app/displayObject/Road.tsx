"use client";

import React from "react";
import { RigidBody } from "@react-three/rapier";

export default function Road({ position = [0, 1.0, 0], length = 2000, roadWidth = 15 }) {
  return (
    <group position={position as [number, number, number]}>
      <RigidBody type="fixed" colliders="cuboid">
        {/* ASPHALT */}
        <mesh receiveShadow rotation={[-Math.PI / 2, 0, 0]}>
          <planeGeometry args={[roadWidth, length]} />
          <meshStandardMaterial color="#2a2a2a" roughness={0.8} />
        </mesh>

        {/* YELLOW LINE - polygonOffset prevents the "damage" flicker */}
        <mesh position={[0, 0.01, 0]} rotation={[-Math.PI / 2, 0, 0]}>
          <planeGeometry args={[0.2, length]} />
          <meshStandardMaterial color="#ffcc00" polygonOffset polygonOffsetFactor={-4} />
        </mesh>

        {/* WHITE BOUNDARY LINES */}
        <mesh position={[-(roadWidth / 2 - 0.5), 0.01, 0]} rotation={[-Math.PI / 2, 0, 0]}>
          <planeGeometry args={[0.2, length]} />
          <meshStandardMaterial color="white" transparent opacity={0.8} polygonOffset polygonOffsetFactor={-4} />
        </mesh>
        <mesh position={[(roadWidth / 2 - 0.5), 0.01, 0]} rotation={[-Math.PI / 2, 0, 0]}>
          <planeGeometry args={[0.2, length]} />
          <meshStandardMaterial color="white" transparent opacity={0.8} polygonOffset polygonOffsetFactor={-4} />
        </mesh>
      </RigidBody>
    </group>
  );
}
