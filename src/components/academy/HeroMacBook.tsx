"use client";

import React, { useRef, Suspense, useEffect, useState } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Canvas, useFrame } from "@react-three/fiber";
import { useGLTF, Environment } from "@react-three/drei";
import * as THREE from "three";

gsap.registerPlugin(ScrollTrigger);

// Auxiliar de junção de classes
function cx(...parts: Array<string | undefined | false | null>): string {
  return parts.filter(Boolean).join(' ');
}

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
      {/* Ajusta a escala e posição do modelo importado */}
      <group rotation={[0.2, Math.PI, 0]} position={[0, -2, 0]}>
        <primitive object={scene} scale={0.12} />
      </group>
    </group>
  );
}

import ErrorBoundary from "@/components/ui/ErrorBoundary";

export default function HeroMacBook() {
  const containerRef = useRef<HTMLDivElement>(null);
  const framesContainerRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);

  const [isMobile, setIsMobile] = useState(false);
  const [isDark, setIsDark] = useState(true);
  const [isMounted, setIsMounted] = useState(false);
  const [webGLSupported, setWebGLSupported] = useState<boolean | null>(null);

  useEffect(() => {
    setIsMounted(true);
    if (typeof window === "undefined") return;

    // Detectar suporte a WebGL
    try {
      const canvas = document.createElement("canvas");
      const supportsWebGL = !!(
        window.WebGLRenderingContext &&
        (canvas.getContext("webgl") || canvas.getContext("experimental-webgl"))
      );
      setWebGLSupported(supportsWebGL);
      console.log(`[HeroMacBook] Suporte a WebGL detectado: ${supportsWebGL}`);
    } catch (e) {
      setWebGLSupported(false);
      console.error("[HeroMacBook] Erro ao detectar suporte a WebGL:", e);
    }

    setIsDark(document.documentElement.classList.contains("dark"));

    const observer = new MutationObserver(() => {
      setIsDark(document.documentElement.classList.contains("dark"));
    });

    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"],
    });

    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);

    return () => {
      observer.disconnect();
      window.removeEventListener("resize", checkMobile);
    };
  }, []);

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
    if (!isMounted || isMobile || webGLSupported === false || !containerRef.current || !framesContainerRef.current) return;

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

  }, { scope: containerRef, dependencies: [isMobile] });

  // Render simplificado e extremamente rápido no Mobile/Safari sem WebGL/ou antes de montar
  if (!isMounted || isMobile || webGLSupported === false) {
    return (
      <section className="relative w-full min-h-[80vh] bg-brand-dark flex flex-col items-center justify-center py-16 px-6 overflow-hidden transition-colors duration-300">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(47,107,101,0.08)_0%,transparent_70%)]" />
        
        <div className="text-center z-10 max-w-xl w-full flex flex-col items-center">
          <span className="px-4 py-1.5 rounded-full border border-[--color-brand-primary]/30 bg-[--color-brand-primary]/10 text-[--color-brand-primary] text-xs font-semibold tracking-widest mb-6 uppercase">
            Academy
          </span>
          <h1 className="text-4xl font-black text-brand-white tracking-tighter mb-6 leading-tight">
            NOT JUST A COURSE.<br/>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-white via-[--color-brand-primary] to-[#3b8780]">
              IT&apos;S AN ECOSYSTEM.
            </span>
          </h1>
          <p className="text-brand-white/60 text-base font-light tracking-wide mb-10 max-w-md">
            Learn the exact methodologies used by top-tier creative agencies to scale businesses predictably.
          </p>
          
          {/* Mockup de Laptop 2D super responsivo e limpo */}
          <div className="relative w-full max-w-[280px] aspect-[16/10] bg-brand-darker border border-brand-white/10 rounded-lg shadow-2xl p-2 flex items-center justify-center transition-colors duration-300">
            <div className="absolute inset-0 bg-gradient-to-br from-[--color-brand-primary]/10 to-transparent rounded-lg pointer-events-none" />
            <div className="w-full h-full border border-brand-white/5 rounded bg-brand-dark flex flex-col items-center justify-center p-3 text-center transition-colors duration-300">
              <span className="text-[--color-brand-primary] font-mono text-xs font-bold mb-1">DN_ACADEMY_V1</span>
              <span className="text-brand-white/30 font-mono text-[9px]">Scroll to discover modules</span>
            </div>
            {/* Laptop Base */}
            <div className="absolute bottom-[-6px] left-1/2 -translate-x-1/2 w-[112%] h-[6px] bg-brand-white/20 rounded-b-md shadow-md" />
          </div>
        </div>
      </section>
    );
  }

  // Render do Desktop (com Three.js e Scroll-Explosion)
  return (
    <section ref={containerRef} className="relative w-full h-screen bg-brand-dark overflow-hidden flex flex-col items-center justify-center perspective-[2000px] transition-colors duration-300">
      
      {/* Absolute Background Lighting */}
      <div 
        className={cx(
          "absolute inset-0 transition-opacity duration-500",
          isDark 
            ? "bg-[radial-gradient(circle_at_center,rgba(47,107,101,0.12)_0%,rgba(4,8,7,1)_70%)]" 
            : "bg-[radial-gradient(circle_at_center,rgba(47,107,101,0.08)_0%,rgba(240,244,244,1)_70%)]"
        )} 
      />

      {/* Intro Hero Text */}
      <div className="absolute top-20 text-center z-20 w-full px-4 pointer-events-none">
        <h1 className="text-5xl md:text-7xl lg:text-8xl font-black text-brand-white tracking-tighter mb-4 drop-shadow-2xl">
          NOT JUST A COURSE.<br/>
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-white via-[--color-brand-primary] to-[#3b8780]">
            IT&apos;S AN ECOSYSTEM.
          </span>
        </h1>
        <p className="text-brand-white/50 text-lg md:text-xl font-light tracking-wide drop-shadow-lg">
          Scroll to discover the future of your business.
        </p>
      </div>

      {/* Side Text that appears later */}
      <div ref={textRef} className="absolute left-10 md:left-20 top-1/2 -translate-y-1/2 z-20 max-w-sm pointer-events-none">
        <h2 className="text-3xl md:text-5xl font-bold text-brand-white leading-tight drop-shadow-xl">
          Performance controlled<br/>
          <span className="text-[--color-brand-primary]">frame by frame.</span>
        </h2>
      </div>

      {/* Explosion Frames Container */}
      <div ref={framesContainerRef} className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full preserve-3d pointer-events-none z-10">
        {frames.map((frame) => (
          <div
            key={frame.id}
            className="explosion-frame absolute top-1/2 left-1/2 w-40 h-24 bg-brand-white/5 backdrop-blur-md border border-brand-white/10 rounded-lg shadow-2xl overflow-hidden flex items-center justify-center"
            style={{ transformStyle: "preserve-3d", transform: "translate(-50%, -50%)" }}
          >
            <div className="absolute inset-0 bg-gradient-to-br from-[--color-brand-primary]/20 to-transparent" />
            <span className="text-brand-white/20 text-xs font-mono">FR_{frame.id.toString().padStart(4, '0')}</span>
          </div>
        ))}
      </div>

      {/* 3D Canvas MacBook */}
      <div className="absolute inset-0 z-10 w-full h-full pointer-events-none">
        <ErrorBoundary name="HeroMacBookCanvas" fallback={
          <div className="absolute inset-0 flex items-center justify-center bg-brand-dark/40">
            <span className="text-[10px] font-mono tracking-widest text-[#2f6b65] uppercase animate-pulse">Canvas 3D Indisponível</span>
          </div>
        }>
          <Canvas camera={{ position: [0, 0, 15], fov: 45 }} dpr={[1, 1.5]}>
            <ambientLight intensity={0.5} />
            <directionalLight position={[10, 10, 10]} intensity={1} />
            <directionalLight position={[-10, 10, -10]} intensity={0.5} />
            <Environment preset="city" />
            <Suspense fallback={null}>
              <Laptop3D proxy={laptopProxy} />
            </Suspense>
          </Canvas>
        </ErrorBoundary>
      </div>

    </section>
  );
}

