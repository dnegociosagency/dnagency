"use client";

import React, { useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Points, PointMaterial } from "@react-three/drei";
import * as THREE from "three";

function ParticleSphere() {
  const ref = useRef<THREE.Points>(null);
  const count = 1000;
  
  // Create a sphere of particles
  const [positions] = React.useState(() => {
    const p = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos((Math.random() * 2) - 1);
      const r = 3 + (Math.random() * 0.8); // radius with some variance
      
      p[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      p[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      p[i * 3 + 2] = r * Math.cos(phi);
    }
    return p;
  });

  useFrame((state, delta) => {
    if (ref.current) {
      // Base rotation
      ref.current.rotation.y += delta * 0.05;
      ref.current.rotation.x += delta * 0.03;
      
      // Mouse interaction for parallax effect only on devices with hover
      if (window.matchMedia("(hover: hover)").matches) {
        const targetX = (state.pointer.x * Math.PI) / 12;
        const targetY = (state.pointer.y * Math.PI) / 12;
        
        ref.current.rotation.y += (targetX - ref.current.rotation.y) * 0.03;
        ref.current.rotation.x += (targetY - ref.current.rotation.x) * 0.03;
      }
    }
  });

  return (
    <Points ref={ref} positions={positions} stride={3} frustumCulled={false}>
      <PointMaterial
        transparent
        color="#2f6b65"
        size={0.02}
        sizeAttenuation={true}
        depthWrite={false}
        blending={THREE.AdditiveBlending}
        opacity={0.4}
      />
    </Points>
  );
}

export default function Scene3D() {
  return (
    <div className="absolute inset-0 w-full h-full pointer-events-none z-0">
      <Canvas camera={{ position: [0, 0, 7], fov: 60 }} dpr={[1, 1.5]}>
        <ambientLight intensity={0.5} />
        <ParticleSphere />
      </Canvas>
    </div>
  );
}
