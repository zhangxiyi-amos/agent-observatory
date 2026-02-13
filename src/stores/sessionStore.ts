import { create } from 'zustand';
import type { Session } from '../types';

interface SessionState {
  sessions: Session[];
  selectedSessionKey: string | null;
  selectSession: (key: string | null) => void;
  updateSession: (key: string, updates: Partial<Session>) => void;
}

// Mock data
const mockSessions: Session[] = [
  {
    key: 'tg-main',
    kind: 'dm',
    channel: 'telegram',
    status: 'active',
    label: 'Amos (Telegram)',
    lastMessage: 'Building something cool...',
    lastActivityAt: Date.now(),
  },
  {
    key: 'discord-dev',
    kind: 'group',
    channel: 'discord',
    status: 'idle',
    label: 'Dev Chat',
    lastMessage: 'Anyone seen the new update?',
    lastActivityAt: Date.now() - 300000,
  },
  {
    key: 'webchat-visitor',
    kind: 'dm',
    channel: 'webchat',
    status: 'thinking',
    label: 'Web Visitor',
    lastMessage: 'How does this work?',
    lastActivityAt: Date.now() - 60000,
  },
  {
    key: 'cron-heartbeat',
    kind: 'cron',
    channel: 'cron',
    status: 'idle',
    label: 'Heartbeat',
    lastActivityAt: Date.now() - 1800000,
  },
  {
    key: 'subagent-coding',
    kind: 'subagent',
    channel: 'internal',
    status: 'active',
    label: 'Coding Agent',
    lastMessage: 'Implementing feat-004...',
    lastActivityAt: Date.now() - 10000,
  },
];

export const useSessionStore = create<SessionState>((set) => ({
  sessions: mockSessions,
  selectedSessionKey: null,
  selectSession: (key) => set({ selectedSessionKey: key }),
  updateSession: (key, updates) =>
    set((state) => ({
      sessions: state.sessions.map((s) =>
        s.key === key ? { ...s, ...updates } : s
      ),
    })),
}));
