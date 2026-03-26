"use client";

import React, { useState } from "react";
import { Text } from "@react-three/drei";
import { RigidBody, CuboidCollider } from "@react-three/rapier";

interface BillboardProps {
  position?: [number, number, number];
  rotation?: [number, number, number];
  title?: string;
  description?: string;
}

export default function Billboard({ 
  position = [0, 0, 0], 
  rotation = [0, 0, 0],
  title = "NOVELARC",
  description = "Digital Architecture Era"
}: BillboardProps) {
  
  return (
    <group position={position} rotation={rotation}>
      {/* 1. PHYSICAL STRUCTURE (The Frame & Legs) */}
      <RigidBody type="fixed" colliders="cuboid">
        {/* Main Board Surface */}
        <mesh castShadow receiveShadow position={[0, 5, 0]}>
          <boxGeometry args={[8, 4, 0.4]} />
          <meshStandardMaterial color="#1a1a1a" /> {/* Sleek Black Frame */}
        </mesh>

        {/* Left Pole */}
        <mesh castShadow position={[-3, 1.5, 0]}>
          <boxGeometry args={[0.3, 3, 0.3]} />
          <meshStandardMaterial color="#333" />
        </mesh>

        {/* Right Pole */}
        <mesh castShadow position={[3, 1.5, 0]}>
          <boxGeometry args={[0.3, 3, 0.3]} />
          <meshStandardMaterial color="#333" />
        </mesh>
      </RigidBody>

      {/* 2. TEXT CONTENT (Using Drei Text) */}
      <group position={[0, 5, 0.21]}>
        {/* Main Title Text */}
        <Text
          position={[0, 0.6, 0]}
          fontSize={0.8}
          color="white"
          font="/fonts/Montserrat-Bold.ttf" // Optional: path to your font
          anchorX="center"
          anchorY="middle"
        >
          {title}
        </Text>

        {/* Subtitle/URL Text */}
        <Text
          position={[0, -0.6, 0]}
          fontSize={0.3}
          color="#fb923c" // Novelarc Orange
          font="/fonts/Montserrat-Regular.ttf"
          anchorX="center"
          anchorY="middle"
        >
          {description}
        </Text>
      </group>

      {/* 3. LIGHTING (Subtle glow for the board) */}
      <pointLight position={[0, 5, 1]} intensity={5} color="#ffffff" distance={10} />
    </group>
  );
}
