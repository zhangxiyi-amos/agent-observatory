import { create } from 'zustand';

interface AgentConfig {
  name: string;
  model: string;
  thinking: string;
  channels: string[];
  skills: string[];
  heartbeatInterval: number;
}

interface ConfigState {
  config: AgentConfig;
  isOpen: boolean;
  togglePanel: () => void;
}

const mockConfig: AgentConfig = {
  name: 'Roci',
  model: 'claude-opus-4-5-20251101',
  thinking: 'low',
  channels: ['telegram', 'discord', 'webchat', 'signal'],
  skills: [
    'apple-calendar',
    'brainstorm',
    'coding-agent',
    'github',
    'obsidian',
    'weather',
    'web_search',
    'web_fetch',
  ],
  heartbeatInterval: 30,
};

export const useConfigStore = create<ConfigState>((set) => ({
  config: mockConfig,
  isOpen: false,
  togglePanel: () => set((state) => ({ isOpen: !state.isOpen })),
}));
