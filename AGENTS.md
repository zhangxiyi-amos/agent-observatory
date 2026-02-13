# AGENTS.md - Agent Observatory Development Guide

## Project Overview

A 3D visualization dashboard for observing AI agents. Built with React Three Fiber, displays sessions as entities orbiting a central "AI core", shows real-time activity, and provides configuration viewing.

## Tech Stack

- **Framework**: Next.js 14 (App Router)
- **3D**: React Three Fiber + Drei
- **State**: Zustand
- **Styling**: Tailwind CSS
- **Language**: TypeScript
- **Deploy**: Vercel

## Directory Structure

```
src/
├── app/
│   ├── layout.tsx
│   ├── page.tsx
│   └── globals.css
├── components/
│   ├── scene/           # 3D components
│   │   ├── Scene.tsx    # Main 3D canvas
│   │   ├── CoreHub.tsx  # Central AI entity
│   │   ├── SessionEntity.tsx
│   │   └── Effects.tsx  # Post-processing
│   ├── ui/              # 2D overlay components
│   │   ├── ConfigPanel.tsx
│   │   ├── SessionInfo.tsx
│   │   └── ActivityLog.tsx
│   └── index.ts
├── stores/
│   ├── sessionStore.ts
│   ├── configStore.ts
│   └── activityStore.ts
├── types/
│   └── index.ts
└── lib/
    └── mockData.ts
```

## Critical Rules

1. **ONE FEATURE PER SESSION** - Do not try to implement multiple features at once
2. **TEST VISUALLY** - After implementing, verify it renders correctly in browser
3. **COMMIT AFTER EACH FEATURE** - Keep commits atomic and descriptive
4. **UPDATE PROGRESS** - Always update .dev/progress.txt at session end

## Coding Standards

### TypeScript
- Strict mode enabled
- Explicit return types on functions
- No `any` types without justification

### React Three Fiber
- Use Drei helpers when available
- Keep 3D components pure (no side effects in render)
- Use `useFrame` for animations, not setInterval

### Components
- One component per file
- Export from index.ts
- Props interfaces defined above component

### State Management
- Zustand stores in /stores
- Actions defined in store
- Selectors for derived state

## Testing

Since this is a visual project, testing is primarily manual:
1. Run `pnpm dev`
2. Open http://localhost:3000
3. Verify feature works visually
4. Check console for errors
5. Test interactions (click, hover, etc.)

## Commands

```bash
pnpm dev      # Start dev server
pnpm build    # Production build
pnpm lint     # Run linter
```

## Feature Implementation Flow

1. Read `.dev/feature_list.json` to find next feature
2. Implement the feature
3. Test in browser
4. If passing: update feature passes to true
5. Git commit with `feat: [feat-id] description`
6. Update `.dev/progress.txt`

## Known Gotchas

- Three.js must be dynamically imported in Next.js (no SSR)
- Use `'use client'` directive for 3D components
- OrbitControls needs `makeDefault` prop
- Canvas must have explicit height (not just 100%)

## Design Guidelines

### Visual Style
- Dark theme (space-like)
- Glowing, ethereal aesthetics
- Smooth animations
- Glassmorphism for UI panels

### Colors
- Background: `#0a0a0f` (near black)
- Core hub: `#6366f1` (indigo glow)
- Telegram sessions: `#0088cc`
- Webchat sessions: `#22c55e`
- Discord sessions: `#5865f2`
- Active state: brighter + bloom
- Idle state: dimmer

### Animation
- Core hub: slow rotation + pulse
- Sessions: gentle orbit + float
- Activity: particle beams
- Transitions: 300ms ease

## Do Not

- Remove or modify feature definitions in feature_list.json
- Skip visual testing
- Leave console errors unfixed
- Implement features out of order without reason
- Forget to update progress.txt
