'use client';

import { useSessionStore } from '../../stores/sessionStore';
import { CHANNEL_COLORS } from '../../types';

export default function SessionInfo() {
  const { sessions, selectedSessionKey, selectSession } = useSessionStore();
  const selectedSession = sessions.find((s) => s.key === selectedSessionKey);

  if (!selectedSession) return null;

  const color = CHANNEL_COLORS[selectedSession.channel];
  const timeSince = Math.floor((Date.now() - selectedSession.lastActivityAt) / 1000);
  const timeAgo = timeSince < 60 
    ? `${timeSince}s ago`
    : timeSince < 3600 
      ? `${Math.floor(timeSince / 60)}m ago`
      : `${Math.floor(timeSince / 3600)}h ago`;

  return (
    <div
      style={{
        position: 'fixed',
        bottom: 20,
        left: 20,
        background: 'rgba(10, 10, 15, 0.9)',
        backdropFilter: 'blur(10px)',
        border: `1px solid ${color}40`,
        borderRadius: 12,
        padding: 20,
        minWidth: 280,
        color: 'white',
        fontFamily: 'system-ui, sans-serif',
      }}
    >
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start' }}>
        <div>
          <h3 style={{ margin: 0, fontSize: 16, fontWeight: 600 }}>
            {selectedSession.label || selectedSession.key}
          </h3>
          <div
            style={{
              display: 'inline-block',
              marginTop: 4,
              padding: '2px 8px',
              background: `${color}30`,
              color: color,
              borderRadius: 4,
              fontSize: 12,
              textTransform: 'capitalize',
            }}
          >
            {selectedSession.channel}
          </div>
        </div>
        <button
          onClick={() => selectSession(null)}
          style={{
            background: 'transparent',
            border: 'none',
            color: '#666',
            cursor: 'pointer',
            fontSize: 18,
            padding: 4,
          }}
        >
          ×
        </button>
      </div>

      <div style={{ marginTop: 16, fontSize: 13 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
          <span style={{ color: '#888' }}>Status</span>
          <span style={{ 
            color: selectedSession.status === 'active' ? '#22c55e' 
              : selectedSession.status === 'thinking' ? '#f59e0b' 
              : '#666' 
          }}>
            {selectedSession.status}
          </span>
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
          <span style={{ color: '#888' }}>Kind</span>
          <span>{selectedSession.kind}</span>
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
          <span style={{ color: '#888' }}>Last Activity</span>
          <span>{timeAgo}</span>
        </div>
      </div>

      {selectedSession.lastMessage && (
        <div style={{ marginTop: 12, paddingTop: 12, borderTop: '1px solid #333' }}>
          <div style={{ color: '#888', fontSize: 11, marginBottom: 4 }}>Last Message</div>
          <div style={{ fontSize: 13, color: '#ccc', fontStyle: 'italic' }}>
            "{selectedSession.lastMessage}"
          </div>
        </div>
      )}
    </div>
  );
}
