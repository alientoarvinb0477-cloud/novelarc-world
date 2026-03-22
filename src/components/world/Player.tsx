"use client";

import * as THREE from "three";
import { useRef, useMemo } from "react"; // Added useMemo for performance
import { useFrame, useThree } from "@react-three/fiber";
import { useKeyboardControls } from "@react-three/drei";
import { RigidBody, RapierRigidBody, CapsuleCollider } from "@react-three/rapier";

const MOVE_SPEED = 25;
const JUMP_FORCE = 12;

export default function Player() {
  const rb = useRef<RapierRigidBody>(null);
  const { camera } = useThree();
  const [, getKeys] = useKeyboardControls();

  // Use useMemo to prevent re-creating these vectors on every single render
  const [frontVector, sideVector, direction] = useMemo(() => [
    new THREE.Vector3(),
    new THREE.Vector3(),
    new THREE.Vector3()
  ], []);

  useFrame((state) => {
    if (!rb.current) return;

    // 1. Get current position of the physics body
    const position = rb.current.translation();
    
    // 2. Sync the camera (Eye-level)
    camera.position.set(position.x, position.y + 2.5, position.z);

    // 3. Handle Movement
    const { forward, backward, left, right, jump } = getKeys();

    frontVector.set(0, 0, Number(backward) - Number(forward));
    sideVector.set(Number(left) - Number(right), 0, 0);

    direction
      .subVectors(frontVector, sideVector)
      .normalize()
      .multiplyScalar(MOVE_SPEED)
      .applyQuaternion(camera.quaternion);

    // Lock movement to the XZ plane so the player doesn't "fly" when looking up
    direction.y = 0;

    const currentVelocity = rb.current.linvel();
    
    // 4. Apply Velocity
    rb.current.setLinvel(
      { x: direction.x, y: currentVelocity.y, z: direction.z },
      true
    );

    // 5. Jump Logic
    // Using a slightly higher threshold (0.1) for better ground detection on custom GLBs
    if (jump && Math.abs(currentVelocity.y) < 0.1) {
      rb.current.setLinvel({ x: currentVelocity.x, y: JUMP_FORCE, z: currentVelocity.z }, true);
    }
  });

  return (
    <RigidBody
      ref={rb}
      colliders={false} // We define the collider explicitly below to avoid the 'shape' error
      position={[0, 5, 0]}
      enabledRotations={[false, false, false]}
      name="player"
      friction={0} // Prevents sticking to walls
    >
      {/* Explicit Capsule Collider - This is more stable than the 'colliders' prop */}
      <CapsuleCollider args={[1.5, 1.0]} /> 
      
      {/* Visual helper (invisible in production) */}
      <mesh castShadow>
        <capsuleGeometry args={[0.5, 1.5]} />
        <meshStandardMaterial opacity={0} transparent />
      </mesh>
    </RigidBody>
  );
}
