"use client";

import React, { useState } from "react";
import { Text } from "@react-three/drei";
import { RigidBody, CuboidCollider } from "@react-three/rapier";
import { useStore } from "../../hooks/useStore";

export default function House({ id, position = [0, 0, 0] }: any) {
  const setNearDoor = useStore((state) => state.setNearDoor);
  const [showHint, setShowHint] = useState(false);

  return (
    <group position={position}>
      {/* 1. MAIN STRUCTURE (The Walls) */}
      <RigidBody type="fixed" colliders="cuboid">
        <mesh castShadow receiveShadow position={[0, 2, 0]}>
          <boxGeometry args={[6, 4, 6]} />
          <meshStandardMaterial color="#5c4033" /> {/* Dark Wood Color */}
        </mesh>

        {/* 2. THE ROOF (Flat Modern Style) */}
        <mesh castShadow position={[0, 4.2, 0]}>
          <boxGeometry args={[6.5, 0.5, 6.5]} />
          <meshStandardMaterial color="#222" />
        </mesh>

        {/* 3. THE DOOR VISUAL (So you know where to walk) */}
        <mesh position={[0, 1, 3.01]}>
          <boxGeometry args={[1.2, 2, 0.1]} />
          <meshStandardMaterial color="#8b4513" />
        </mesh>
      </RigidBody>

      {/* 4. THE DOOR SENSOR (Invisible Interaction Zone) */}
      <RigidBody
        type="fixed"
        colliders={false}
        position={[0, 1, 4]} // Placed 1 unit in front of the door
        onIntersectionEnter={() => {
          setNearDoor(id);
          setShowHint(true);
        }}
        onIntersectionExit={() => {
          setNearDoor(null);
          setShowHint(false);
        }}
      >
        <CuboidCollider args={[1.5, 2, 1.5]} sensor />
        
        {showHint && (
          <Text 
            position={[0, 2.5, 0]} 
            fontSize={0.4} 
            color="#fb923c" // Orange-400
            anchorX="center"
          >
            TAP TO ENTER
          </Text>
        )}
      </RigidBody>
    </group>
  );
}
