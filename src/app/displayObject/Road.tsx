"use client";

import React from "react";
import { RigidBody } from "@react-three/rapier";
import { MeshReflectorMaterial, useTexture } from "@react-three/drei";
import * as THREE from "three";

export default function Road({ position = [0, 1.0, 0], length = 1000, roadWidth = 15 }) {
  return (
    <group position={position}>
      <RigidBody type="fixed" colliders="cuboid">
        
        {/* THE ASPHALT ROAD */}
        <mesh receiveShadow rotation={[-Math.PI / 2, 0, 0]}>
          <planeGeometry args={[roadWidth, length]} />
          <MeshReflectorMaterial
            blur={[300, 100]}
            resolution={1024}
            mixBlur={1}
            mixStrength={40}
            roughness={1}
            depthScale={1.2}
            minDepthThreshold={0.4}
            maxDepthThreshold={1.4}
            color="#151515"
            metalness={0.5}
            mirror={1} // Reflection intensity
          />
        </mesh>

        {/* THE ROAD LINES (Yellow/White) */}
        <mesh position={[0, 0.01, 0]}>
          <boxGeometry args={[0.2, 0.02, length]} />
          <meshStandardMaterial color="#f0d000" emissive="#f0d000" emissiveIntensity={0.5} />
        </mesh>

        {/* REALISTIC GRASS SIDES */}
        {/* We use a slightly darker green with higher roughness to look like organic soil/grass */}
        <mesh receiveShadow position={[-(roadWidth / 2 + 10), -0.1, 0]}>
          <boxGeometry args={[20, 0.5, length]} />
          <meshStandardMaterial 
            color="#1d3513" 
            roughness={1} 
            metalness={0} 
          />
        </mesh>

        <mesh receiveShadow position={[(roadWidth / 2 + 10), -0.1, 0]}>
          <boxGeometry args={[20, 0.5, length]} />
          <meshStandardMaterial 
            color="#1d3513" 
            roughness={1} 
            metalness={0} 
          />
        </mesh>

      </RigidBody>
    </group>
  );
}
