'use client';

import { useRef, useState } from 'react';
import { useFrame, ThreeEvent } from '@react-three/fiber';
import { Html, Sphere } from '@react-three/drei';
import * as THREE from 'three';
import type { Session } from '../../types';
import { CHANNEL_COLORS } from '../../types';
import { useSessionStore } from '../../stores/sessionStore';

interface SessionEntityProps {
  session: Session;
  orbitRadius: number;
  orbitSpeed: number;
  orbitOffset: number;
}

export default function SessionEntity({
  session,
  orbitRadius,
  orbitSpeed,
  orbitOffset,
}: SessionEntityProps) {
  const meshRef = useRef<THREE.Mesh>(null);
  const [hovered, setHovered] = useState(false);
  const { selectedSessionKey, selectSession } = useSessionStore();
  
  const isSelected = selectedSessionKey === session.key;
  const color = CHANNEL_COLORS[session.channel];
  const isActive = session.status === 'active';
  const isThinking = session.status === 'thinking';

  useFrame((state) => {
    if (meshRef.current) {
      const time = state.clock.elapsedTime * orbitSpeed + orbitOffset;
      meshRef.current.position.x = Math.cos(time) * orbitRadius;
      meshRef.current.position.z = Math.sin(time) * orbitRadius;
      meshRef.current.position.y = Math.sin(time * 2) * 0.5 + 1.5;
      
      // Pulse when active
      if (isActive || isThinking) {
        const pulse = 1 + Math.sin(state.clock.elapsedTime * 4) * 0.1;
        meshRef.current.scale.setScalar(pulse);
      }
    }
  });

  const handleClick = (e: ThreeEvent<MouseEvent>) => {
    e.stopPropagation();
    selectSession(isSelected ? null : session.key);
  };

  return (
    <group ref={meshRef}>
      {/* Main sphere */}
      <Sphere
        args={[0.3, 32, 32]}
        onClick={handleClick}
        onPointerOver={() => setHovered(true)}
        onPointerOut={() => setHovered(false)}
      >
        <meshStandardMaterial
          color={color}
          emissive={color}
          emissiveIntensity={isActive ? 0.8 : isThinking ? 0.5 : 0.2}
          roughness={0.3}
          metalness={0.7}
        />
      </Sphere>

      {/* Glow effect */}
      <Sphere args={[0.4, 16, 16]}>
        <meshBasicMaterial
          color={color}
          transparent
          opacity={isSelected ? 0.4 : hovered ? 0.3 : 0.1}
          side={THREE.BackSide}
        />
      </Sphere>

      {/* Status ring for thinking */}
      {isThinking && (
        <mesh rotation={[Math.PI / 2, 0, 0]}>
          <torusGeometry args={[0.5, 0.02, 8, 32]} />
          <meshBasicMaterial color={color} transparent opacity={0.6} />
        </mesh>
      )}

      {/* Label on hover */}
      {(hovered || isSelected) && (
        <Html
          position={[0, 0.6, 0]}
          center
          style={{
            color: 'white',
            background: 'rgba(0,0,0,0.8)',
            padding: '4px 8px',
            borderRadius: '4px',
            fontSize: '12px',
            whiteSpace: 'nowrap',
            pointerEvents: 'none',
          }}
        >
          {session.label || session.key}
        </Html>
      )}

      {/* Point light */}
      <pointLight color={color} intensity={isActive ? 1 : 0.3} distance={3} />
    </group>
  );
}
