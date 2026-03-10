# OC Cockpit

Lightweight control plane for OpenClaw. Organize projects, manage agent configurations, track deliverables, and monitor activity — all in one place.

## Setup

cp .env.example .env.local
pnpm install
pnpm dev

Open http://localhost:3000

## Environment Variables

| Variable | Description |
|---|---|
| OC_GATEWAY_URL | OpenClaw gateway URL (default: http://localhost:18789) |
| OC_GATEWAY_TOKEN | Gateway auth token |
| WORKSPACE_PATH | Path to OpenClaw workspace (default: /data/.openclaw/workspace) |

## Screens

- **Projects** — Project workspaces with docs, deliverables, kanban, crons, resources
- **Skills** — Global skill browser and editor
- **Agents** — Per-agent profiles, activity, domain resources
- **Pipeline** — Multi-agent workflow editor (planned)
