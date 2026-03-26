"use client";

import React from "react";
import { RigidBody } from "@react-three/rapier";

export default function Road({ position = [0, 1.0, 0], length = 3000, roadWidth = 15 }) {
  return (
    <group position={position as [number, number, number]}>
      <RigidBody type="fixed" colliders="cuboid">
        {/* ASPHALT - Base Layer */}
        <mesh receiveShadow rotation={[-Math.PI / 2, 0, 0]}>
          <planeGeometry args={[roadWidth, length]} />
          <meshStandardMaterial color="#1a1a1a" roughness={0.9} metalness={0.1} />
        </mesh>

        {/* YELLOW LINE - Elevated and Offset to prevent "damage" look */}
        <mesh position={[0, 0.02, 0]} rotation={[-Math.PI / 2, 0, 0]}>
          <planeGeometry args={[0.2, length]} />
          <meshStandardMaterial 
            color="#ffcc00" 
            emissive="#ffcc00"
            emissiveIntensity={0.1}
            polygonOffset 
            polygonOffsetFactor={-1} 
            polygonOffsetUnits={-1} 
          />
        </mesh>

        {/* WHITE BOUNDARY LINES - Slightly lower offset than the center line */}
        <mesh position={[-(roadWidth / 2 - 0.5), 0.015, 0]} rotation={[-Math.PI / 2, 0, 0]}>
          <planeGeometry args={[0.2, length]} />
          <meshStandardMaterial 
            color="white" 
            transparent 
            opacity={0.9} 
            polygonOffset 
            polygonOffsetFactor={-1} 
            polygonOffsetUnits={-1}
          />
        </mesh>
        
        <mesh position={[(roadWidth / 2 - 0.5), 0.015, 0]} rotation={[-Math.PI / 2, 0, 0]}>
          <planeGeometry args={[0.2, length]} />
          <meshStandardMaterial 
            color="white" 
            transparent 
            opacity={0.9} 
            polygonOffset 
            polygonOffsetFactor={-1} 
            polygonOffsetUnits={-1}
          />
        </mesh>
      </RigidBody>
    </group>
  );
}
