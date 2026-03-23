"use client";

import React, { useState } from "react";
import { useGLTF, Text } from "@react-three/drei";
import { RigidBody, CuboidCollider } from "@react-three/rapier";
import { useStore } from "../../hooks/useStore";

export default function House({ id, modelPath, position, doorOffset = [0, 0, 2] }: any) {
  const { scene } = useGLTF(modelPath);
  const setNearDoor = useStore((state) => state.setNearDoor);
  const [showHint, setShowHint] = useState(false);

  return (
    <group position={position}>
      {/* THE HOUSE MODEL */}
      <RigidBody type="fixed" colliders="trimesh">
        <primitive object={scene.clone()} />
      </RigidBody>

      {/* THE DOOR SENSOR */}
      <RigidBody
        type="fixed"
        colliders={false}
        position={doorOffset}
        onIntersectionEnter={() => {
          setNearDoor(id); // Tell the store we are at THIS house
          setShowHint(true);
        }}
        onIntersectionExit={() => {
          setNearDoor(null); // Clear the store when we walk away
          setShowHint(false);
        }}
      >
        <CuboidCollider args={[1.5, 2, 1.5]} sensor />
        
        {showHint && (
          <Text position={[0, 3, 0]} fontSize={0.4} color="orange" font="/fonts/bold.ttf">
            TAP TO ENTER
          </Text>
        )}
      </RigidBody>
    </group>
  );
}
