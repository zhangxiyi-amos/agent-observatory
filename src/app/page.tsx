'use client';

import dynamic from 'next/dynamic';
import SessionInfo from '../components/ui/SessionInfo';
import ConfigPanel from '../components/ui/ConfigPanel';

const Scene = dynamic(() => import('../components/scene/Scene'), {
  ssr: false,
  loading: () => (
    <div style={{
      width: '100vw',
      height: '100vh',
      background: '#0a0a0f',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      color: '#666'
    }}>
      Loading Observatory...
    </div>
  ),
});

export default function HomePage() {
  return (
    <>
      <Scene />
      <SessionInfo />
      <ConfigPanel />
    </>
  );
}
