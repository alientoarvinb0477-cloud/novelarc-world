"use client";

import React from "react";
import { RigidBody } from "@react-three/rapier";

interface LightPostProps {
  position?: [number, number, number];
  rotation?: [number, number, number];
}

export default function LightPost({ 
  position = [0, 0, 0], 
  rotation = [0, 0, 0] 
}: LightPostProps) {
  return (
    <group position={position} rotation={rotation}>
      <RigidBody type="fixed" colliders="cuboid">
        {/* The Pole */}
        <mesh castShadow position={[0, 4, 0]}>
          <cylinderGeometry args={[0.1, 0.15, 8, 8]} />
          <meshStandardMaterial color="#333333" metalness={0.8} roughness={0.2} />
        </mesh>

        {/* The Arm (Extends 1.5 units) */}
        <mesh castShadow position={[0.7, 7.8, 0]} rotation={[0, 0, Math.PI / 2]}>
          <cylinderGeometry args={[0.08, 0.08, 1.5, 8]} />
          <meshStandardMaterial color="#333333" />
        </mesh>

        {/* The Lamp Head */}
        <mesh position={[1.4, 7.6, 0]}>
          <boxGeometry args={[0.6, 0.2, 0.4]} />
          <meshStandardMaterial color="#222222" />
        </mesh>

        {/* Light Source */}
        <pointLight 
          position={[1.4, 7.4, 0]} 
          intensity={25} 
          distance={30} 
          color="#fff4d6" 
          castShadow 
        />
        
        {/* Glowing Bulb */}
        <mesh position={[1.4, 7.4, 0]}>
          <sphereGeometry args={[0.15, 16, 16]} />
          <meshStandardMaterial emissive="#fff4d6" emissiveIntensity={3} color="white" />
        </mesh>
      </RigidBody>
    </group>
  );
}
