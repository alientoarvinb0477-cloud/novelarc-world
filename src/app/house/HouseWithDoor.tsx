"use client";

import React, { useState } from "react";
import { useGLTF, Text } from "@react-three/drei";
import { RigidBody, CuboidCollider } from "@react-three/rapier";
import { useStore } from "../../hooks/useStore";

interface HouseProps {
  id: string;
  modelPath: string;
  position: [number, number, number];
  doorOffset: [number, number, number]; // Position of the door relative to house center
}

export default function HouseWithDoor({ id, modelPath, position, doorOffset }: HouseProps) {
  const { scene } = useGLTF(modelPath);
  const setNearDoor = useStore((state) => state.setNearDoor);
  const [isPlayerNear, setIsPlayerNear] = useState(false);

  return (
    <group position={position}>
      {/* 1. THE ACTUAL HOUSE */}
      <RigidBody type="fixed" colliders="trimesh">
        <primitive object={scene.clone()} />
      </RigidBody>

      {/* 2. THE DOOR SENSOR (Invisible Box) */}
      <RigidBody
        type="fixed"
        colliders={false}
        position={doorOffset}
        onIntersectionEnter={() => {
          setNearDoor(id);
          setIsPlayerNear(true);
        }}
        onIntersectionExit={() => {
          setNearDoor(null);
          setIsPlayerNear(false);
        }}
      >
        <CuboidCollider args={[1, 1.5, 1]} sensor />
        
        {/* Floating Text Hint */}
        {isPlayerNear && (
          <Text
            position={[0, 2.5, 0]}
            fontSize={0.3}
            color="orange"
            anchorX="center"
            anchorY="middle"
          >
            TAP TO ENTER
          </Text>
        )}
      </RigidBody>
    </group>
  );
}
