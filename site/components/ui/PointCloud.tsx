"use client";

import { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { useReducedMotion } from "framer-motion";

function Cloud({ count = 3000 }: { count?: number }) {
  const points = useRef<THREE.Points>(null!);
  const prefersReducedMotion = useReducedMotion();

  // Generate random positions in a nebulous ellipsoid
  const { positions, colors } = useMemo(() => {
    const pos = new Float32Array(count * 3);
    const col = new Float32Array(count * 3);

    const teal = new THREE.Color("#0D9488");
    const gray = new THREE.Color("#4B5563");
    const tealLight = new THREE.Color("#2DD4BF");

    for (let i = 0; i < count; i++) {
      // Spherical distribution with falloff (denser at center)
      const r = Math.pow(Math.random(), 0.5) * 2.2;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);

      pos[i * 3] = r * Math.sin(phi) * Math.cos(theta) * 1.4;
      pos[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta) * 0.9;
      pos[i * 3 + 2] = r * Math.cos(phi) * 1.1;

      // Color: blend from gray (outer) to teal (inner)
      const dist = r / 2.2;
      const baseColor = dist < 0.35
        ? tealLight.clone().lerp(teal, dist / 0.35)
        : teal.clone().lerp(gray, (dist - 0.35) / 0.65);

      col[i * 3] = baseColor.r;
      col[i * 3 + 1] = baseColor.g;
      col[i * 3 + 2] = baseColor.b;
    }

    return { positions: pos, colors: col };
  }, [count]);

  useFrame(({ clock }) => {
    if (!points.current || prefersReducedMotion) return;
    const t = clock.getElapsedTime();
    // Slow rotation + gentle sinusoidal drift
    points.current.rotation.y = t * 0.055;
    points.current.rotation.x = Math.sin(t * 0.12) * 0.18;
    points.current.rotation.z = Math.cos(t * 0.08) * 0.10;
  });

  return (
    <points ref={points}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[positions, 3]}
        />
        <bufferAttribute
          attach="attributes-color"
          args={[colors, 3]}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.018}
        vertexColors
        transparent
        opacity={0.75}
        sizeAttenuation
        depthWrite={false}
      />
    </points>
  );
}

interface PointCloudProps {
  className?: string;
}

export default function PointCloud({ className }: PointCloudProps) {
  return (
    <div className={className} aria-hidden="true">
      <Canvas
        camera={{ position: [0, 0, 4.5], fov: 55 }}
        gl={{ antialias: false, alpha: true }}
        style={{ background: "transparent" }}
      >
        <Cloud />
      </Canvas>
    </div>
  );
}
