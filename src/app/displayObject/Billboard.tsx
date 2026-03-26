"use client";

import React from "react";
import { Text } from "@react-three/drei";
import { RigidBody } from "@react-three/rapier";

export default function Billboard({ 
  position = [5, 0, -10], 
  rotation = [0, -Math.PI / 4, 0],
  title = "NOVELARC",
  description = "Visualizing the Future"
}: any) {
  return (
    <group position={position} rotation={rotation}>
      <RigidBody type="fixed" colliders="cuboid">
        {/* Main Board */}
        <mesh castShadow position={[0, 5, 0]}>
          <boxGeometry args={[8, 4, 0.4]} />
          <meshStandardMaterial color="#1a1a1a" />
        </mesh>
        {/* Supports */}
        <mesh castShadow position={[-3, 2.5, 0]}>
          <boxGeometry args={[0.2, 5, 0.2]} />
          <meshStandardMaterial color="#333" />
        </mesh>
        <mesh castShadow position={[3, 2.5, 0]}>
          <boxGeometry args={[0.2, 5, 0.2]} />
          <meshStandardMaterial color="#333" />
        </mesh>
      </RigidBody>

      <group position={[0, 5, 0.22]}>
        <Text 
          position={[0, 0.5, 0]} 
          fontSize={0.7} 
          color="white" 
          anchorX="center" 
          anchorY="middle"
        >
          {title}
        </Text>
        <Text 
          position={[0, -0.5, 0]} 
          fontSize={0.3} 
          color="#fb923c" 
          anchorX="center" 
          anchorY="middle"
        >
          {description}
        </Text>
      </group>
    </group>
  );
}
