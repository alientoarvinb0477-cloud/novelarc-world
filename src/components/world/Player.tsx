"use client";

import * as THREE from "three";
import { useRef } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import { useKeyboardControls } from "@react-three/drei";
import { RigidBody, RapierRigidBody } from "@react-three/rapier";

const MOVE_SPEED = 5;
const JUMP_FORCE = 4;

export default function Player() {
  const rb = useRef<RapierRigidBody>(null);
  const { camera } = useThree();
  const [, getKeys] = useKeyboardControls();

  // Temporary vectors to avoid creating new objects every frame (Performance)
  const frontVector = new THREE.Vector3();
  const sideVector = new THREE.Vector3();
  const direction = new THREE.Vector3();

  useFrame((state) => {
    if (!rb.current) return;

    // 1. Get current position of the physics body
    const position = rb.current.translation();
    
    // 2. Sync the Three.js camera to the physics body position
    // We lift the camera slightly (1.75 units) to simulate eye-level
    camera.position.set(position.x, position.y + 1.75, position.z);

    // 3. Handle Keyboard Movement
    const { forward, backward, left, right, jump } = getKeys();

    // Calculate movement direction relative to where the camera is looking
    frontVector.set(0, 0, Number(backward) - Number(forward));
    sideVector.set(Number(left) - Number(right), 0, 0);

    direction
      .subVectors(frontVector, sideVector)
      .normalize()
      .multiplyScalar(MOVE_SPEED)
      .applyQuaternion(camera.quaternion);

    // 4. Apply velocity to the physics body
    // We keep the current Y velocity so gravity and jumping still work
    const currentVelocity = rb.current.linvel();
    rb.current.setLinvel(
      { x: direction.x, y: currentVelocity.y, z: direction.z },
      true
    );

    // 5. Handle Jumping
    // Logic: Only jump if we are close to the ground (y velocity is near 0)
    if (jump && Math.abs(currentVelocity.y) < 0.05) {
      rb.current.setLinvel({ x: currentVelocity.x, y: JUMP_FORCE, z: currentVelocity.z }, true);
    }
  });

  return (
    /* The RigidBody is the "Physical Presence" of the player. 
       We lock rotations so the player doesn't tip over like a bowling pin.
    */
    <RigidBody
      ref={rb}
      colliders="capsule"
      position={[0, 5, 0]}
      enabledRotations={[false, false, false]}
      name="player"
    >
      {/* Invisible mesh used as a physical collider */}
      <mesh castShadow>
        <capsuleGeometry args={[0.5, 1]} />
        <meshStandardMaterial opacity={0} transparent />
      </mesh>
    </RigidBody>
  );
}