# Architecture - Agent Observatory

## Overview

A 3D visualization dashboard for observing AI agents running on OpenClaw. The application renders sessions as distinct entities orbiting a central "AI core" in a space-like environment.

## System Diagram

```
┌─────────────────────────────────────────────────────────────────┐
│                         Browser                                  │
│  ┌───────────────────────────────────────────────────────────┐  │
│  │                    Next.js App                             │  │
│  │  ┌─────────────────────────────────────────────────────┐  │  │
│  │  │              React Three Fiber Canvas               │  │  │
│  │  │  ┌─────────┐  ┌─────────┐  ┌─────────┐             │  │  │
│  │  │  │ Session │  │ Session │  │ Session │  ...        │  │  │
│  │  │  │ Entity  │  │ Entity  │  │ Entity  │             │  │  │
│  │  │  └────┬────┘  └────┬────┘  └────┬────┘             │  │  │
│  │  │       └────────────┼───────────┘                    │  │  │
│  │  │                    ▼                                │  │  │
│  │  │              ┌──────────┐                           │  │  │
│  │  │              │ Core Hub │ (Central AI Entity)       │  │  │
│  │  │              └──────────┘                           │  │  │
│  │  └─────────────────────────────────────────────────────┘  │  │
│  │                                                            │  │
│  │  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐        │  │
│  │  │Config Panel │  │Session Info │  │Activity Log │        │  │
│  │  └─────────────┘  └─────────────┘  └─────────────┘        │  │
│  │                    (2D Overlay UI)                         │  │
│  └───────────────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────────────┘
                              │
                              │ (Future: WebSocket)
                              ▼
                    ┌─────────────────┐
                    │ OpenClaw Gateway│
                    │   (API calls)   │
                    └─────────────────┘
```

## Tech Stack

| Layer | Technology | Purpose |
|-------|------------|---------|
| Framework | Next.js 14 | React framework with App Router |
| 3D Rendering | React Three Fiber | React renderer for Three.js |
| 3D Helpers | Drei | Useful R3F components |
| State | Zustand | Lightweight state management |
| Styling | Tailwind CSS | Utility-first CSS |
| Language | TypeScript | Type safety |
| Deployment | Vercel | Edge deployment |

## Component Architecture

### 3D Layer (`/components/scene/`)

- **Scene.tsx**: Main Canvas wrapper, sets up camera, lighting, controls
- **CoreHub.tsx**: Central glowing entity representing the AI core
- **SessionEntity.tsx**: Individual session visualization
- **Effects.tsx**: Post-processing (bloom, etc.)

### UI Layer (`/components/ui/`)

- **ConfigPanel.tsx**: Slide-out panel showing agent configuration
- **SessionInfo.tsx**: Selected session details
- **ActivityLog.tsx**: Real-time activity feed

### State Layer (`/stores/`)

- **sessionStore.ts**: Active sessions, selection state
- **configStore.ts**: Agent configuration
- **activityStore.ts**: Activity log entries

## Data Flow

```
┌──────────────┐     ┌──────────────┐     ┌──────────────┐
│  Mock Data   │────▶│ Zustand Store│────▶│  Components  │
│ (or API)     │     │              │     │              │
└──────────────┘     └──────────────┘     └──────────────┘
                            │
                            ▼
                     State Updates
                     trigger re-render
```

## Key Decisions

1. **Mock data first**: Start with hardcoded data, add real API later
2. **Client-side only**: All 3D rendering on client, no SSR for Three.js
3. **Zustand over Context**: Better performance for frequent updates
4. **Vercel deployment**: Zero-config, instant deploys

## Future Extensions

1. **Real-time WebSocket**: Connect to OpenClaw event stream
2. **Task dispatch**: Send tasks from UI to sessions
3. **Historical view**: Replay past session activity
4. **Multi-agent support**: Visualize agent-to-agent communication

## Performance Considerations

- Use `useFrame` throttling for non-critical animations
- Limit particle count
- Use instancing for many similar objects
- Lazy load heavy components
