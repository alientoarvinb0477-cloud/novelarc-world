"use client";

import * as THREE from "three";
import { useRef, useMemo } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import { RigidBody, RapierRigidBody, CapsuleCollider } from "@react-three/rapier";
import { useStore } from "../../hooks/useStore";

const MOVE_SPEED = 30;
const JUMP_FORCE = 10;

export default function Player() {
  const rb = useRef<RapierRigidBody>(null);
  const { camera } = useThree();
  
  // Get movement states directly from the store
  const { forward, backward, left, right, jump } = useStore();

  const [frontVector, sideVector, direction] = useMemo(() => [
    new THREE.Vector3(),
    new THREE.Vector3(),
    new THREE.Vector3()
  ], []);

  useFrame(() => {
    if (!rb.current) return;

    const position = rb.current.translation();
    camera.position.set(position.x, position.y + 4.5, position.z);

    // Calculate movement based on Store state
    frontVector.set(0, 0, Number(backward) - Number(forward));
    sideVector.set(Number(left) - Number(right), 0, 0);

    direction
      .subVectors(frontVector, sideVector)
      .normalize()
      .multiplyScalar(MOVE_SPEED)
      .applyQuaternion(camera.quaternion);

    direction.y = 0;

    const currentVelocity = rb.current.linvel();
    
    rb.current.setLinvel(
      { x: direction.x, y: currentVelocity.y, z: direction.z },
      true
    );

    if (jump && Math.abs(currentVelocity.y) < 0.1) {
      rb.current.setLinvel({ x: currentVelocity.x, y: JUMP_FORCE, z: currentVelocity.z }, true);
    }
  });

  return (
    <RigidBody 
      ref={rb} 
      colliders={false} 
      position={[0, 10, 0]} 
      enabledRotations={[false, false, false]}
      canSleep={false}
    >
      <CapsuleCollider args={[1.2, 0.6]} />
    </RigidBody>
  );
}
