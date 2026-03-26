"use client";

import React, { useRef, useMemo, useEffect } from "react";
import * as THREE from "three";
import { RigidBody } from "@react-three/rapier";
import { MeshReflectorMaterial, useTexture, Text } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";

// --- THE GRASS SHADER COMPONENT ---
// This component scatters 10,000 blades of grass on a strip
const InstancedGrass = ({ position = [0, 0, 0], length = 1000, width = 10, count = 10000 }) => {
  const meshRef = useRef<THREE.InstancedMesh>(null!);
  
  // Custom Shader: Define vertex/fragment logic
  const material = useMemo(() => new THREE.ShaderMaterial({
    uniforms: {
      time: { value: 0 },
      colorA: { value: new THREE.Color("#1a4413") }, // DARK Green base
      colorB: { value: new THREE.Color("#4a8a2d") }, // BRIGHTER tip
      windScale: { value: 0.2 },
    },
    vertexShader: `
      uniform float time;
      varying vec2 vUv;
      varying float vY;

      // Noise function for wind
      float hash(float n) { return fract(sin(n) * 753.5453123); }

      void main() {
        vUv = uv;
        vY = position.y;
        
        // Wind Animation Calculation
        vec4 instancePostion = instanceMatrix * vec4(position, 1.0);
        float wave = sin(time + (instancePostion.x * 2.0) + (instancePostion.z * 1.5)) * windScale * vY;
        
        vec3 finalPos = position;
        finalPos.x += wave; // Sway x-axis
        
        gl_Position = projectionMatrix * modelViewMatrix * instanceMatrix * vec4(finalPos, 1.0);
      }
    `,
    fragmentShader: `
      uniform vec3 colorA;
      uniform vec3 colorB;
      varying float vY;

      void main() {
        // Gradient color: Darker at bottom, lighter at tip
        vec3 finalColor = mix(colorA, colorB, vY * 2.5);
        gl_FragColor = vec4(finalColor, 1.0);
      }
    `,
    side: THREE.DoubleSide,
  }), []);

  // Set up the instances once on mount
  useEffect(() => {
    const tempMatrix = new THREE.Matrix4();
    for (let i = 0; i < count; i++) {
      // Scatter instances on the ground plane
      const randomX = (Math.random() - 0.5) * width;
      const randomZ = (Math.random() - 0.5) * length;
      const heightScale = 0.4 + Math.random() * 0.3; // Random grass height
      
      tempMatrix.makeScale(0.05, heightScale, 0.05); // Thickness
      tempMatrix.setPosition(randomX, 0, randomZ);
      tempMatrix.premultiply(new THREE.Matrix4().makeRotationY(Math.random() * Math.PI)); // Random rotation
      
      meshRef.current.setMatrixAt(i, tempMatrix);
    }
    meshRef.current.instanceMatrix.needsUpdate = true;
  }, [count, width, length]);

  // UseFrame hook to animate the 'time' uniform (make it wind)
  useFrame((state) => {
    material.uniforms.time.value = state.clock.getElapsedTime();
  });

  return (
    <group position={position}>
      {/* 1. Base Ground Plane (for physics) */}
      <RigidBody type="fixed" colliders="cuboid">
        <mesh receiveShadow position={[0, -0.05, 0]}>
          <planeGeometry args={[width, length]} />
          <meshStandardMaterial color="#2d5a27" />
        </mesh>
      </RigidBody>
      
      {/* 2. The Animated 3D Grass instances */}
      <instancedMesh ref={meshRef} args={[null!, null!, count]} material={material} position={[0, -0.05, 0]}>
        <cylinderGeometry args={[0.01, 0.05, 0.8, 4]} /> {/* Standard blade shape */}
      </instancedMesh>
    </group>
  );
};

// --- MAIN ROAD COMPONENT ---
export default function Road({ position = [0, 1.0, 0], length = 1000, roadWidth = 15 }) {
  const grassStripWidth = 10;

  return (
    <group position={position}>
      <RigidBody type="fixed" colliders="cuboid">
        
        {/* THE ASPHALT ROAD */}
        <mesh receiveShadow rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.01, 0]}>
          <planeGeometry args={[roadWidth, length]} />
          <MeshReflectorMaterial
            blur={[300, 100]}
            resolution={1024}
            mixBlur={1}
            roughness={1}
            depthScale={1.2}
            color="#222222" // Dark asphalt
            metalness={0.5}
            mirror={0.2} // Subtle reflection
          />
        </mesh>

        {/* THE ROAD LINES (Yellow/White) */}
        <mesh position={[0, 0.02, 0]}>
          <boxGeometry args={[0.2, 0.01, length]} />
          <meshStandardMaterial color="#f0d000" emissive="#f0d000" emissiveIntensity={0.5} />
        </mesh>

        {/* 1. LEFT GRASS STRIP */}
        <InstancedGrass 
          position={[-(roadWidth / 2 + grassStripWidth / 2), 0, 0]} 
          length={length} 
          width={grassStripWidth} 
          count={8000} // Total grass blades
        />

        {/* 2. RIGHT GRASS STRIP */}
        <InstancedGrass 
          position={[(roadWidth / 2 + grassStripWidth / 2), 0, 0]} 
          length={length} 
          width={grassStripWidth} 
          count={8000} // Total grass blades
        />

      </RigidBody>
    </group>
  );
}
