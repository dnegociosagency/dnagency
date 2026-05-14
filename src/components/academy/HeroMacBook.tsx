"use client";

import React, { useRef, Suspense } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Canvas, useFrame } from "@react-three/fiber";
import { useGLTF, Environment } from "@react-three/drei";
import * as THREE from "three";

gsap.registerPlugin(ScrollTrigger);

function Laptop3D({ proxy }: { proxy: React.MutableRefObject<any> }) {
  const group = useRef<THREE.Group>(null);
  const { scene } = useGLTF("/laptop.glb");

  useFrame(() => {
    if (group.current) {
      group.current.scale.setScalar(proxy.current.scale);
      group.current.position.y = proxy.current.y;
      group.current.position.z = proxy.current.z;
      group.current.rotation.x = proxy.current.rotateX;
      group.current.rotation.y = proxy.current.rotateY;
      
      if (proxy.current.opacity < 0.1) {
        group.current.visible = false;
      } else {
        group.current.visible = true;
      }
    }
  });

  return (
    <group ref={group}>
      {/* Adjusting the base scale and position so the imported GLTF fits the camera frustum */}
      <group rotation={[0.2, Math.PI, 0]} position={[0, -2, 0]}>
        <primitive object={scene} scale={0.12} />
      </group>
    </group>
  );
}

// Preload the model
useGLTF.preload("/laptop.glb");

export default function HeroMacBook() {
  const containerRef = useRef<HTMLDivElement>(null);
  const framesContainerRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);

  // Proxy object for GSAP to animate
  const laptopProxy = useRef({
    scale: 0.1,
    y: -5,
    z: -10,
    rotateX: 0.5,
    rotateY: Math.PI, // start facing away or closed
    opacity: 1,
  });

  // Generate random frame placeholders
  const frames = Array.from({ length: 40 }).map((_, i) => ({
    id: i,
    x: (Math.random() - 0.5) * 2000,
    y: (Math.random() - 0.5) * 1500,
    z: (Math.random() - 0.5) * 1000,
    rotateX: Math.random() * 360,
    rotateY: Math.random() * 360,
    rotateZ: Math.random() * 360,
    scale: Math.random() * 0.5 + 0.5,
  }));

  useGSAP(() => {
    if (!containerRef.current || !framesContainerRef.current) return;

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top top",
        end: "+=4000",
        scrub: 1,
        pin: true,
      },
    });

    gsap.set(".explosion-frame", { opacity: 0, x: 0, y: 0, z: 0, scale: 0 });
    gsap.set(textRef.current, { opacity: 0, y: 50 });

    // Step 1: Bring laptop closer and rotate into view
    tl.to(laptopProxy.current, {
      scale: 1,
      y: 0,
      z: 0,
      rotateX: 0.1,
      rotateY: 0, // spin around to reveal the screen side
      duration: 2.5,
      ease: "power2.inOut",
    }, 0);

    // Step 3: EXPLOSION of frames from behind the laptop
    tl.to(".explosion-frame", {
      opacity: (i: number) => Math.random() * 0.5 + 0.3,
      x: (i: number) => frames[i].x,
      y: (i: number) => frames[i].y,
      z: (i: number) => frames[i].z,
      rotateX: (i: number) => frames[i].rotateX,
      rotateY: (i: number) => frames[i].rotateY,
      rotateZ: (i: number) => frames[i].rotateZ,
      scale: (i: number) => frames[i].scale,
      duration: 3,
      ease: "expo.out",
      stagger: 0.01,
    }, 2);

    // Step 4: Fade in side text
    tl.to(textRef.current, {
      opacity: 1,
      y: 0,
      duration: 1.5,
      ease: "power2.out",
    }, 2.5);

    // Step 5: Massive zoom into the laptop to transition to next section
    tl.to(laptopProxy.current, {
      opacity: 0,
      scale: 20, // scales up massively to cover the screen
      duration: 2.5,
      ease: "power2.in",
    }, 4.5);

    // Continue frame movement towards camera
    tl.to(".explosion-frame", {
      z: "+=1000",
      opacity: 0,
      duration: 3,
      stagger: 0.02,
    }, 4.5);

  }, { scope: containerRef });

  return (
    <section ref={containerRef} className="relative w-full h-screen bg-[#000000] overflow-hidden flex flex-col items-center justify-center perspective-[2000px]">
      
      {/* Absolute Background Lighting */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(47,107,101,0.1)_0%,rgba(0,0,0,1)_60%)]" />

      {/* Intro Hero Text */}
      <div className="absolute top-20 text-center z-20 w-full px-4 pointer-events-none">
        <h1 className="text-5xl md:text-7xl lg:text-8xl font-black text-white tracking-tighter mb-4 drop-shadow-2xl">
          NÃO É APENAS UM CURSO.<br/>
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-[--color-brand-primary] to-[#3b8780]">
            É UM ECOSSISTEMA.
          </span>
        </h1>
        <p className="text-white/50 text-lg md:text-xl font-light tracking-wide drop-shadow-lg">
          Role para descobrir o futuro dos seus negócios.
        </p>
      </div>

      {/* Side Text that appears later */}
      <div ref={textRef} className="absolute left-10 md:left-20 top-1/2 -translate-y-1/2 z-20 max-w-sm pointer-events-none">
        <h2 className="text-3xl md:text-5xl font-bold text-white leading-tight drop-shadow-xl">
          Performance controlada<br/>
          <span className="text-[--color-brand-primary]">frame a frame.</span>
        </h2>
      </div>

      {/* Explosion Frames Container */}
      <div ref={framesContainerRef} className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full preserve-3d pointer-events-none z-10">
        {frames.map((frame) => (
          <div
            key={frame.id}
            className="explosion-frame absolute top-1/2 left-1/2 w-40 h-24 bg-white/5 backdrop-blur-md border border-white/10 rounded-lg shadow-2xl overflow-hidden flex items-center justify-center"
            style={{ transformStyle: "preserve-3d", transform: "translate(-50%, -50%)" }}
          >
            <div className="absolute inset-0 bg-gradient-to-br from-[--color-brand-primary]/20 to-transparent" />
            <span className="text-white/20 text-xs font-mono">FR_{frame.id.toString().padStart(4, '0')}</span>
          </div>
        ))}
      </div>

      {/* 3D Canvas MacBook */}
      <div className="absolute inset-0 z-10 w-full h-full pointer-events-none">
        <Canvas camera={{ position: [0, 0, 15], fov: 45 }}>
          <ambientLight intensity={0.5} />
          <directionalLight position={[10, 10, 10]} intensity={1} />
          <directionalLight position={[-10, 10, -10]} intensity={0.5} />
          <Environment preset="city" />
          <Suspense fallback={null}>
            <Laptop3D proxy={laptopProxy} />
          </Suspense>
        </Canvas>
      </div>

    </section>
  );
}
