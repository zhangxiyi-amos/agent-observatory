'use client';

import dynamic from 'next/dynamic';

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
      Loading...
    </div>
  ),
});

export default function HomePage() {
  return <Scene />;
}
