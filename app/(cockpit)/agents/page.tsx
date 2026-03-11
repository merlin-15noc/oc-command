'use client'

import Link from 'next/link'
import { MessageSquare } from 'lucide-react'

type AgentStatus = 'Active' | 'Idle' | 'Stale'

const agents: {
  id: string
  name: string
  initial: string
  avatar: string
  status: AgentStatus
  model: string
  lastActive: string
  heartbeat: string
  domain: string
  borderColor: string
  glowColor: string
}[] = [
  {
    id: 'merlin',
    name: 'Merlin',
    initial: 'M',
    avatar: '/avatars/atlas.png',
    status: 'Active',
    model: 'claude-sonnet-4-6',
    lastActive: '2m ago',
    heartbeat: '24h',
    domain: 'Executive Orchestrator',
    borderColor: 'rgba(59,130,246,0.55)',
    glowColor: '0 0 0 1px rgba(59,130,246,0.4), 0 0 28px rgba(59,130,246,0.18)',
  },
  {
    id: 'scout',
    name: 'Scout',
    initial: 'S',
    avatar: '/avatars/scout.png',
    status: 'Idle',
    model: 'claude-sonnet-4-6',
    lastActive: '6h ago',
    heartbeat: '24h',
    domain: 'Research & Discovery',
    borderColor: 'rgba(139,92,246,0.5)',
    glowColor: '0 0 0 1px rgba(139,92,246,0.3), 0 0 24px rgba(139,92,246,0.12)',
  },
  {
    id: 'canvas',
    name: 'Canvas',
    initial: 'C',
    avatar: '/avatars/canvas.png',
    status: 'Idle',
    model: 'claude-sonnet-4-6',
    lastActive: '12h ago',
    heartbeat: '24h',
    domain: 'Creative Production',
    borderColor: 'rgba(16,185,129,0.5)',
    glowColor: '0 0 0 1px rgba(16,185,129,0.3), 0 0 24px rgba(16,185,129,0.12)',
  },
  {
    id: 'forge',
    name: 'Forge',
    initial: 'F',
    avatar: '/avatars/forge.png',
    status: 'Idle',
    model: 'claude-sonnet-4-6',
    lastActive: '1d ago',
    heartbeat: '24h',
    domain: 'Implementation & Build',
    borderColor: 'rgba(249,115,22,0.5)',
    glowColor: '0 0 0 1px rgba(249,115,22,0.3), 0 0 24px rgba(249,115,22,0.12)',
  },
  {
    id: 'helm',
    name: 'Helm',
    initial: 'H',
    avatar: '/avatars/helm.png',
    status: 'Stale',
    model: 'gemini-2.5-flash-lite',
    lastActive: '3d ago',
    heartbeat: '72h',
    domain: 'Utility & Hygiene',
    borderColor: 'rgba(100,116,139,0.35)',
    glowColor: '0 0 0 1px rgba(100,116,139,0.2)',
  },
  {
    id: 'orion',
    name: 'Orion',
    initial: 'O',
    avatar: '/avatars/atlas.png',
    status: 'Idle',
    model: 'claude-sonnet-4-6',
    lastActive: '2d ago',
    heartbeat: '48h',
    domain: 'Board Lead',
    borderColor: 'rgba(244,63,94,0.5)',
    glowColor: '0 0 0 1px rgba(244,63,94,0.3), 0 0 24px rgba(244,63,94,0.12)',
  },
  {
    id: 'dispatch',
    name: 'Dispatch',
    initial: 'D',
    avatar: '/avatars/dispatch.png',
    status: 'Idle',
    model: 'claude-sonnet-4-6',
    lastActive: '2d ago',
    heartbeat: '24h',
    domain: 'Task Routing',
    borderColor: 'rgba(6,182,212,0.5)',
    glowColor: '0 0 0 1px rgba(6,182,212,0.3), 0 0 24px rgba(6,182,212,0.12)',
  },
]

const statusConfig: Record<AgentStatus, { label: string; dotClass: string; labelClass: string }> = {
  Active: {
    label: 'Active',
    dotClass: 'bg-emerald-400 shadow-[0_0_6px_rgba(52,211,153,0.9)] animate-pulse',
    labelClass: 'text-emerald-400',
  },
  Idle: {
    label: 'Idle',
    dotClass: 'bg-zinc-500',
    labelClass: 'text-zinc-400',
  },
  Stale: {
    label: 'Stale',
    dotClass: 'bg-amber-400',
    labelClass: 'text-amber-400',
  },
}

export default function AgentsPage() {
  return (
    <div className="flex flex-col gap-6">
      {/* Header */}
      <div>
        <h1 className="font-bold tracking-tight">Agents</h1>
        <p className="mt-1 text-sm text-muted-foreground">Agent roster and profiles.</p>
        <div className="mt-3 flex items-center gap-2">
          <span className="rounded-md border border-border bg-muted/40 px-2 py-0.5 text-xs text-muted-foreground">
            {agents.length} agents
          </span>
          <span className="rounded-md border border-emerald-500/30 bg-emerald-500/10 px-2 py-0.5 text-xs text-emerald-400">
            ● 1 active now
          </span>
        </div>
      </div>

      {/* Trading card grid — 3/4 aspect ratio locked */}
      <div className="grid gap-5 grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
        {agents.map((agent) => {
          const status = statusConfig[agent.status]
          return (
            <Link
              key={agent.id}
              href={`/agents/${agent.id}`}
              className="group block"
              style={{ aspectRatio: '3/4' }}
            >
              <div
                className="relative w-full h-full overflow-hidden rounded-xl transition-all duration-300 cursor-pointer"
                style={{
                  border: `1px solid ${agent.borderColor}`,
                  boxShadow: agent.status === 'Active' ? agent.glowColor : 'none',
                }}
                onMouseEnter={(e) => {
                  const el = e.currentTarget as HTMLDivElement
                  el.style.boxShadow = agent.glowColor
                  el.style.transform = 'translateY(-3px) scale(1.01)'
                }}
                onMouseLeave={(e) => {
                  const el = e.currentTarget as HTMLDivElement
                  el.style.boxShadow = agent.status === 'Active' ? agent.glowColor : 'none'
                  el.style.transform = 'translateY(0) scale(1)'
                }}
              >
                {/* Full-bleed image */}
                <img
                  src={agent.avatar}
                  alt={agent.name}
                  className="absolute inset-0 w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-105"
                />

                {/* Single gradient overlay — bottom legibility only */}
                <div
                  className="absolute inset-0"
                  style={{
                    background:
                      'linear-gradient(to top, rgba(0,0,0,0.92) 0%, rgba(0,0,0,0.55) 35%, rgba(0,0,0,0.1) 60%, transparent 80%)',
                  }}
                />

                {/* Status pill — top right, always visible */}
                <div className="absolute top-3 right-3 flex items-center gap-1.5 rounded-full border border-white/10 bg-black/50 px-2.5 py-1 backdrop-blur-sm">
                  <span className={`size-1.5 rounded-full ${status.dotClass}`} />
                  <span className={`text-sm font-medium ${status.labelClass}`}>{status.label}</span>
                </div>

                {/* Bottom-justified content */}
                <div className="absolute inset-0 flex flex-col justify-end p-4 gap-2">
                  {/* Name + domain */}
                  <div>
                    <h3 className="text-base font-bold text-white leading-tight drop-shadow-lg">
                      {agent.name}
                    </h3>
                    <p className="text-sm text-white/55 mt-0.5">{agent.domain}</p>
                  </div>

                  {/* Stats row */}
                  <div className="flex items-center gap-3 text-sm text-white/50">
                    <span>{agent.lastActive}</span>
                    <span className="text-white/25">·</span>
                    <span>HB {agent.heartbeat}</span>
                  </div>

                  {/* Model + chat icon row */}
                  <div className="flex items-center justify-between gap-2">
                    <div className="flex items-center gap-1.5 min-w-0">
                      <div
                        className="size-1.5 rounded-full shrink-0"
                        style={{
                          backgroundColor: agent.borderColor,
                          boxShadow: `0 0 5px ${agent.borderColor}`,
                        }}
                      />
                      <span className="font-mono text-xs text-white/45 truncate">
                        {agent.model}
                      </span>
                    </div>
                    <button
                      onClick={(e) => {
                        e.preventDefault()
                        e.stopPropagation()
                      }}
                      className="shrink-0 rounded-md p-1.5 text-white/40 transition-colors hover:bg-white/10 hover:text-white"
                      title="Message agent"
                    >
                      <MessageSquare className="size-3.5" />
                    </button>
                  </div>
                </div>
              </div>
            </Link>
          )
        })}
      </div>
    </div>
  )
}
