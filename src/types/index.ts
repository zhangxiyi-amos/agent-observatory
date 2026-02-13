export interface Session {
  key: string;
  kind: 'dm' | 'group' | 'cron' | 'subagent';
  channel: 'telegram' | 'discord' | 'webchat' | 'signal' | 'cron' | 'internal';
  status: 'active' | 'idle' | 'thinking';
  label?: string;
  lastMessage?: string;
  lastActivityAt: number;
}

export interface Activity {
  id: string;
  sessionKey: string;
  action: string;
  tool?: string;
  timestamp: number;
}

export const CHANNEL_COLORS: Record<Session['channel'], string> = {
  telegram: '#0088cc',
  discord: '#5865f2',
  webchat: '#22c55e',
  signal: '#3a76f0',
  cron: '#f59e0b',
  internal: '#8b5cf6',
};
