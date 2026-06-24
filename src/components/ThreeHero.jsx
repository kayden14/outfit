import React, { useRef, useMemo, Suspense } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, Stage, PerspectiveCamera } from "@react-three/drei";
import * as THREE from "three";
import { useCart } from "../context/CartContext";

// Procedural T-Shirt mesh component
function TShirt({ theme }) {
  const meshRef = useRef();

  // Create T-Shirt Shape
  const shape = useMemo(() => {
    const s = new THREE.Shape();
    // Neck center top
    s.moveTo(0, 1.4);
    // Neck curve right
    s.quadraticCurveTo(0.2, 1.4, 0.35, 1.3);
    // Shoulder right
    s.lineTo(0.9, 1.15);
    // Sleeve right top
    s.lineTo(1.4, 0.6);
    // Sleeve right cuff
    s.lineTo(1.15, 0.2);
    // Under sleeve right
    s.lineTo(0.8, 0.4);
    // Waist right
    s.lineTo(0.75, -1.2);
    // Bottom right
    s.lineTo(0.7, -1.3);
    // Bottom left
    s.lineTo(-0.7, -1.3);
    // Waist left
    s.lineTo(-0.75, -1.2);
    // Under sleeve left
    s.lineTo(-0.8, 0.4);
    // Sleeve left cuff
    s.lineTo(-1.15, 0.2);
    // Sleeve left top
    s.lineTo(-1.4, 0.6);
    // Shoulder left
    s.lineTo(-0.9, 1.15);
    // Neck curve left
    s.lineTo(-0.35, 1.3);
    s.quadraticCurveTo(-0.2, 1.4, 0, 1.4);
    return s;
  }, []);

  const extrudeSettings = useMemo(() => ({
    depth: 0.18,
    bevelEnabled: true,
    bevelSegments: 5,
    steps: 1,
    bevelSize: 0.04,
    bevelThickness: 0.04
  }), []);

  // Determine T-Shirt Color based on theme
  const shirtColor = useMemo(() => {
    switch (theme) {
      case "white":
        return "#0a0a0a"; // Black shirt on white theme
      case "red":
        return "#ffffff"; // White shirt on red theme
      default:
        return "#0a0a0a";
    }
  }, [theme]);

  // Handle auto-rotation and subtle floating animation
  useFrame((state) => {
    if (!meshRef.current) return;
    const time = state.clock.getElapsedTime();
    
    // Slow elegant rotation
    meshRef.current.rotation.y = time * 0.3;
    
    // Float up and down
    meshRef.current.position.y = Math.sin(time * 1.5) * 0.12;
    
    // Slight sway
    meshRef.current.rotation.z = Math.sin(time * 0.8) * 0.03;
  });

  return (
    <group ref={meshRef}>
      <mesh castShadow receiveShadow>
        <extrudeGeometry args={[shape, extrudeSettings]} />
        <meshPhysicalMaterial
          color={shirtColor}
          roughness={0.7}
          metalness={0.15}
          clearcoat={0.1}
          clearcoatRoughness={0.1}
          reflectivity={0.5}
          side={THREE.DoubleSide}
        />
      </mesh>
      
      {/* Decorative details inside the shirt (logo emblem placement) */}
      <mesh position={[0, 0.3, 0.12]}>
        <ringGeometry args={[0.15, 0.18, 32]} />
        <meshBasicMaterial color={theme === "red" ? "#ff0001" : "#888888"} side={THREE.DoubleSide} transparent opacity={0.8} />
      </mesh>
    </group>
  );
}

// Sparkly floating background particles
function Particles({ count = 60, theme }) {
  const mesh = useRef();
  
  const particleColor = useMemo(() => {
    switch (theme) {
      case "white": return "#0a0a0a";
      case "red": return "#ffffff";
      default: return "#0a0a0a";
    }
  }, [theme]);

  // Generate random coordinates
  const dummy = useMemo(() => new THREE.Object3D(), []);
  const particles = useMemo(() => {
    const temp = [];
    for (let i = 0; i < count; i++) {
      const t = Math.random() * 100;
      const factor = 20 + Math.random() * 100;
      const speed = 0.01 + Math.random() / 200;
      const x = (Math.random() - 0.5) * 12;
      const y = (Math.random() - 0.5) * 12;
      const z = (Math.random() - 0.5) * 8;

      temp.push({ t, factor, speed, x, y, z });
    }
    return temp;
  }, [count]);

  useFrame((state) => {
    particles.forEach((particle, i) => {
      let { t, factor, speed, x, y, z } = particle;
      
      // Update time
      t = particle.t += speed;
      
      // Move Y up slightly and wrap around
      y += speed * 15;
      if (y > 6) y = -6;
      particle.y = y;

      dummy.position.set(
        x + Math.cos(t) * 0.2,
        y,
        z + Math.sin(t) * 0.2
      );
      
      // Scale down particle size based on distance
      const s = Math.cos(t) * 0.05 + 0.06;
      dummy.scale.set(s, s, s);
      dummy.rotation.set(s * 5, s * 5, s * 5);
      dummy.updateMatrix();
      mesh.current.setMatrixAt(i, dummy.matrix);
    });
    mesh.current.instanceMatrix.needsUpdate = true;
  });

  return (
    <instancedMesh ref={mesh} args={[null, null, count]}>
      <dodecahedronGeometry args={[0.2, 0]} />
      <meshBasicMaterial color={particleColor} transparent opacity={0.15} />
    </instancedMesh>
  );
}

export default function ThreeHero() {
  const { theme } = useCart();

  return (
    <div className="absolute inset-0 w-full h-full min-h-[70vh] md:min-h-screen z-0 overflow-hidden pointer-events-none select-none three-canvas-wrap">
      {/* Background radial gradient overlay that moves to focus the 3D model */}
      <div 
        className="absolute inset-0 opacity-40 transition-all duration-1000 mix-blend-overlay z-0" 
        style={{
          background: theme === 'white' 
            ? 'radial-gradient(circle at 50% 50%, rgba(10, 10, 10, 0.1) 0%, transparent 70%)'
            : 'radial-gradient(circle at 50% 50%, rgba(255, 255, 255, 0.3) 0%, transparent 60%)'
        }}
      />
      
      <div className="w-full h-full pointer-events-auto">
        <Canvas shadows gl={{ antialias: true, alpha: true }}>
          <PerspectiveCamera makeDefault position={[0, 0, 5]} fov={45} />
          
          <ambientLight intensity={0.4} />
          <pointLight position={[10, 10, 10]} intensity={1.5} castShadow />
          <directionalLight position={[-10, 8, -5]} intensity={0.8} />

          <Suspense fallback={null}>
            <TShirt theme={theme} />
            <Particles count={40} theme={theme} />
            <OrbitControls 
              enableZoom={false} 
              enablePan={false} 
              minPolarAngle={Math.PI / 2.5} 
              maxPolarAngle={Math.PI / 1.5}
            />
          </Suspense>
        </Canvas>
      </div>
    </div>
  );
}
