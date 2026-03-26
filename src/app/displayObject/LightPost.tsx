"use client";

import React from "react";
import { RigidBody } from "@react-three/rapier";

export default function LightPost({ position = [0, 0, 0] }) {
  return (
    <group position={position}>
      <RigidBody type="fixed" colliders="cuboid">
        {/* Main Tapered Column */}
        <mesh castShadow position={[0, 4, 0]}>
          <cylinderGeometry args={[0.05, 0.12, 8, 12]} />
          <meshStandardMaterial color="#222222" metalness={0.9} roughness={0.1} />
        </mesh>

        {/* Modern Stylist Curved Head */}
        <mesh castShadow position={[0.6, 8, 0]} rotation={[0, 0, -Math.PI / 8]}>
          <boxGeometry args={[1.5, 0.1, 0.4]} />
          <meshStandardMaterial color="#222222" />
        </mesh>

        {/* Decorative Light Panel (Glow effect only, no actual light cast) */}
        <mesh position={[1.2, 7.85, 0]}>
          <boxGeometry args={[0.8, 0.05, 0.35]} />
          <meshStandardMaterial 
            emissive="#ffffff" 
            emissiveIntensity={1.5} 
            color="white" 
          />
        </mesh>
      </RigidBody>
    </group>
  );
}
