'use client';

import { useSessionStore } from '../../stores/sessionStore';
import SessionEntity from './SessionEntity';

export default function SessionsGroup() {
  const sessions = useSessionStore((state) => state.sessions);

  return (
    <group>
      {sessions.map((session, index) => (
        <SessionEntity
          key={session.key}
          session={session}
          orbitRadius={3 + (index % 3) * 1.5}
          orbitSpeed={0.2 + (index % 5) * 0.05}
          orbitOffset={(index * Math.PI * 2) / sessions.length}
        />
      ))}
    </group>
  );
}
