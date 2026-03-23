"use client";

import React, { useState } from "react";
import { Text } from "@react-three/drei";
import { RigidBody, CuboidCollider } from "@react-three/rapier";
import { useStore } from "../../hooks/useStore";

export default function House({ id, position, doorOffset = [0, 0, 2] }: any) {
  const setNearDoor = useStore((state) => state.setNearDoor);
  const [showHint, setShowHint] = useState(false);

  return (
    <group position={position}>
      {/* PLACEHOLDER BOX (Until you get a .glb) */}
      <RigidBody type="fixed" colliders="cuboid">
        <mesh castShadow receiveShadow>
          <boxGeometry args={[4, 4, 4]} />
          <meshStandardMaterial color="brown" />
        </mesh>
      </RigidBody>

      {/* THE DOOR SENSOR */}
      <RigidBody
        type="fixed"
        colliders={false}
        position={doorOffset}
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
          <Text position={[0, 3, 0]} fontSize={0.4} color="orange">
            TAP TO ENTER
          </Text>
        )}
      </RigidBody>
    </group>
  );
}
