'use client';

import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { useSessionStore } from '../../stores/sessionStore';
import { CHANNEL_COLORS } from '../../types';

export default function ConnectionLines() {
  const sessions = useSessionStore((state) => state.sessions);
  const linesRef = useRef<THREE.Group>(null);

  // Create line geometries for each session
  const lines = useMemo(() => {
    return sessions.map((session, index) => {
      const color = CHANNEL_COLORS[session.channel];
      const isActive = session.status === 'active';
      
      return {
        key: session.key,
        color,
        opacity: isActive ? 0.6 : 0.2,
        index,
      };
    });
  }, [sessions]);

  useFrame((state) => {
    if (!linesRef.current) return;
    
    const time = state.clock.elapsedTime;
    
    linesRef.current.children.forEach((child, index) => {
      if (child instanceof THREE.Line) {
        const session = sessions[index];
        if (!session) return;
        
        const orbitRadius = 3 + (index % 3) * 1.5;
        const orbitSpeed = 0.2 + (index % 5) * 0.05;
        const orbitOffset = (index * Math.PI * 2) / sessions.length;
        const t = time * orbitSpeed + orbitOffset;
        
        const x = Math.cos(t) * orbitRadius;
        const z = Math.sin(t) * orbitRadius;
        const y = Math.sin(t * 2) * 0.5 + 1.5;
        
        const positions = child.geometry.attributes.position;
        positions.setXYZ(0, 0, 1, 0); // Core position
        positions.setXYZ(1, x, y, z); // Session position
        positions.needsUpdate = true;
      }
    });
  });

  return (
    <group ref={linesRef}>
      {lines.map((line) => (
        <line key={line.key}>
          <bufferGeometry>
            <bufferAttribute
              attach="attributes-position"
              count={2}
              array={new Float32Array([0, 1, 0, 0, 1, 0])}
              itemSize={3}
            />
          </bufferGeometry>
          <lineBasicMaterial
            color={line.color}
            transparent
            opacity={line.opacity}
            linewidth={1}
          />
        </line>
      ))}
    </group>
  );
}
