"use client";

import React from "react";
import { RigidBody } from "@react-three/rapier";

interface RoadProps {
  position?: [number, number, number];
  rotation?: [number, number, number];
  length?: number;
  roadWidth?: number;
  grassWidth?: number;
}

export default function Road({ 
  position = [0, 0, 0], 
  rotation = [0, 0, 0], 
  length = 200, 
  roadWidth = 10,
  grassWidth = 5
}: RoadProps) {
  return (
    <group position={position} rotation={rotation}>
      <RigidBody type="fixed" colliders="cuboid">
        {/* 1. THE GRAY ROAD */}
        <mesh receiveShadow position={[0, 0.05, 0]}>
          <boxGeometry args={[roadWidth, 0.1, length]} />
          <meshStandardMaterial color="#333333" roughness={0.8} />
        </mesh>

        {/* 2. LEFT GRASS SIDE */}
        <mesh receiveShadow position={[-(roadWidth / 2 + grassWidth / 2), 0.04, 0]}>
          <boxGeometry args={[grassWidth, 0.1, length]} />
          <meshStandardMaterial color="#2d5a27" roughness={1} />
        </mesh>

        {/* 3. RIGHT GRASS SIDE */}
        <mesh receiveShadow position={[(roadWidth / 2 + grassWidth / 2), 0.04, 0]}>
          <boxGeometry args={[grassWidth, 0.1, length]} />
          <meshStandardMaterial color="#2d5a27" roughness={1} />
        </mesh>
      </RigidBody>
    </group>
  );
}
