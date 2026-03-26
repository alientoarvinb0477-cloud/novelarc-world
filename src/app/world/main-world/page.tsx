"use client";

import React from "react";
import { RigidBody } from "@react-three/rapier";

export default function LightPost({ position = [0, 0, 0] }) {
  return (
    <group position={position}>
      <RigidBody type="fixed" colliders="cuboid">
        {/* The Pole */}
        <mesh castShadow position={[0, 4, 0]}>
          <cylinderGeometry args={[0.1, 0.15, 8, 8]} />
          <meshStandardMaterial color="#333333" metalness={0.8} roughness={0.2} />
        </mesh>

        {/* The Arm */}
        <mesh castShadow position={[0.7, 7.8, 0]} rotation={[0, 0, Math.PI / 2]}>
          <cylinderGeometry args={[0.08, 0.08, 1.5, 8]} />
          <meshStandardMaterial color="#333333" />
        </mesh>

        {/* The Lamp Head */}
        <mesh position={[1.4, 7.6, 0]}>
          <boxGeometry args={[0.6, 0.2, 0.4]} />
          <meshStandardMaterial color="#222222" />
        </mesh>

        {/* Functional Light Source */}
        <pointLight 
          position={[1.4, 7.4, 0]} 
          intensity={20} 
          distance={25} 
          color="#fff4d6" 
          castShadow 
        />
        
        {/* Visual Bulb */}
        <mesh position={[1.4, 7.4, 0]}>
          <sphereGeometry args={[0.15, 16, 16]} />
          <meshStandardMaterial emissive="#fff4d6" emissiveIntensity={2} color="white" />
        </mesh>
      </RigidBody>
    </group>
  );
}
