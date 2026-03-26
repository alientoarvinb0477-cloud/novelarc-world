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
          <meshStandardMaterial color="#1a1a1a" roughness={0.8} />
        </mesh>

        {/* Center Yellow Line */}
        <mesh position={[0, 0.02, 0]} rotation={[-Math.PI / 2, 0, 0]}>
          <planeGeometry args={[0.2, length]} />
          <meshStandardMaterial 
            color="#ffcc00" 
            polygonOffset 
            polygonOffsetFactor={-4} // Forces this to render ON TOP
          />
        </mesh>

        {/* White Boundary Lines */}
        <mesh position={[-(roadWidth / 2 - 0.5), 0.01, 0]} rotation={[-Math.PI / 2, 0, 0]}>
          <planeGeometry args={[0.2, length]} />
          <meshStandardMaterial 
            color="white" 
            polygonOffset 
            polygonOffsetFactor={-4} 
          />
        </mesh>
        
        <mesh position={[(roadWidth / 2 - 0.5), 0.01, 0]} rotation={[-Math.PI / 2, 0, 0]}>
          <planeGeometry args={[0.2, length]} />
          <meshStandardMaterial 
            color="white" 
            polygonOffset 
            polygonOffsetFactor={-4} 
          />
        </mesh>
      </RigidBody>
    </group>
  );
}
