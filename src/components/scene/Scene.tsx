'use client';

import { Canvas } from '@react-three/fiber';
import { OrbitControls, Stars } from '@react-three/drei';
import CoreHub from './CoreHub';

export default function Scene() {
  return (
    <Canvas
      camera={{ position: [0, 5, 10], fov: 50 }}
      style={{ width: '100vw', height: '100vh' }}
      onCreated={({ camera }) => {
        camera.lookAt(0, 0, 0);
      }}
    >
      <color attach="background" args={['#0a0a0f']} />
      
      {/* Lighting */}
      <ambientLight intensity={0.4} />
      <directionalLight position={[10, 10, 5]} intensity={0.5} />
      
      {/* Stars background */}
      <Stars radius={100} depth={50} count={2000} factor={4} fade speed={1} />
      
      {/* Central AI Core */}
      <CoreHub />
      
      {/* Grid */}
      <gridHelper args={[20, 20, '#222222', '#222222']} />
      
      {/* Controls */}
      <OrbitControls 
        makeDefault 
        minDistance={5}
        maxDistance={30}
        enablePan={false}
      />
    </Canvas>
  );
}
