'use client';

import { useConfigStore } from '../../stores/configStore';

export default function ConfigPanel() {
  const { config, isOpen, togglePanel } = useConfigStore();

  return (
    <>
      {/* Toggle Button */}
      <button
        onClick={togglePanel}
        style={{
          position: 'fixed',
          top: 20,
          right: 20,
          background: 'rgba(10, 10, 15, 0.9)',
          backdropFilter: 'blur(10px)',
          border: '1px solid #333',
          borderRadius: 8,
          padding: '8px 16px',
          color: 'white',
          cursor: 'pointer',
          fontFamily: 'system-ui, sans-serif',
          fontSize: 14,
          display: 'flex',
          alignItems: 'center',
          gap: 8,
        }}
      >
        <span style={{ fontSize: 16 }}>⚙️</span>
        Config
      </button>

      {/* Panel */}
      <div
        style={{
          position: 'fixed',
          top: 0,
          right: isOpen ? 0 : -360,
          width: 340,
          height: '100vh',
          background: 'rgba(10, 10, 15, 0.95)',
          backdropFilter: 'blur(20px)',
          borderLeft: '1px solid #222',
          transition: 'right 0.3s ease',
          padding: 24,
          color: 'white',
          fontFamily: 'system-ui, sans-serif',
          overflowY: 'auto',
        }}
      >
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 }}>
          <h2 style={{ margin: 0, fontSize: 18 }}>Agent Configuration</h2>
          <button
            onClick={togglePanel}
            style={{
              background: 'transparent',
              border: 'none',
              color: '#666',
              cursor: 'pointer',
              fontSize: 20,
            }}
          >
            ×
          </button>
        </div>

        {/* Agent Info */}
        <div style={{ marginBottom: 24 }}>
          <div style={{ color: '#888', fontSize: 12, marginBottom: 8 }}>AGENT</div>
          <div style={{
            background: '#1a1a2e',
            borderRadius: 8,
            padding: 16,
          }}>
            <div style={{ fontSize: 20, fontWeight: 600, marginBottom: 4 }}>{config.name}</div>
            <div style={{ color: '#6366f1', fontSize: 13 }}>🤖 AI Assistant</div>
          </div>
        </div>

        {/* Model */}
        <div style={{ marginBottom: 24 }}>
          <div style={{ color: '#888', fontSize: 12, marginBottom: 8 }}>MODEL</div>
          <div style={{
            background: '#1a1a2e',
            borderRadius: 8,
            padding: 12,
            fontSize: 13,
            fontFamily: 'monospace',
          }}>
            {config.model}
          </div>
        </div>

        {/* Thinking */}
        <div style={{ marginBottom: 24 }}>
          <div style={{ color: '#888', fontSize: 12, marginBottom: 8 }}>THINKING LEVEL</div>
          <div style={{ display: 'flex', gap: 8 }}>
            {['off', 'low', 'medium', 'high'].map((level) => (
              <div
                key={level}
                style={{
                  padding: '6px 12px',
                  borderRadius: 6,
                  fontSize: 12,
                  background: config.thinking === level ? '#6366f1' : '#1a1a2e',
                  color: config.thinking === level ? 'white' : '#888',
                  textTransform: 'capitalize',
                }}
              >
                {level}
              </div>
            ))}
          </div>
        </div>

        {/* Channels */}
        <div style={{ marginBottom: 24 }}>
          <div style={{ color: '#888', fontSize: 12, marginBottom: 8 }}>CHANNELS</div>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
            {config.channels.map((channel) => (
              <div
                key={channel}
                style={{
                  padding: '4px 10px',
                  borderRadius: 4,
                  fontSize: 12,
                  background: '#22c55e20',
                  color: '#22c55e',
                  textTransform: 'capitalize',
                }}
              >
                {channel}
              </div>
            ))}
          </div>
        </div>

        {/* Skills */}
        <div style={{ marginBottom: 24 }}>
          <div style={{ color: '#888', fontSize: 12, marginBottom: 8 }}>SKILLS ({config.skills.length})</div>
          <div style={{
            background: '#1a1a2e',
            borderRadius: 8,
            padding: 12,
            maxHeight: 200,
            overflowY: 'auto',
          }}>
            {config.skills.map((skill) => (
              <div
                key={skill}
                style={{
                  padding: '4px 0',
                  fontSize: 13,
                  color: '#ccc',
                  borderBottom: '1px solid #222',
                }}
              >
                📦 {skill}
              </div>
            ))}
          </div>
        </div>

        {/* Heartbeat */}
        <div>
          <div style={{ color: '#888', fontSize: 12, marginBottom: 8 }}>HEARTBEAT</div>
          <div style={{
            background: '#1a1a2e',
            borderRadius: 8,
            padding: 12,
            fontSize: 13,
          }}>
            Every {config.heartbeatInterval} minutes
          </div>
        </div>
      </div>
    </>
  );
}
