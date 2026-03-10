'use client'

import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { ArrowRight, MessageSquare } from 'lucide-react'

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
  accent: string          // tailwind color key
  borderColor: string     // css border color
  glowColor: string       // css box-shadow glow
  gradientFrom: string    // card image overlay gradient start
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
    accent: 'blue',
    borderColor: 'rgba(59,130,246,0.6)',
    glowColor: '0 0 0 1px rgba(59,130,246,0.4), 0 0 24px rgba(59,130,246,0.15)',
    gradientFrom: 'rgba(17,24,39,0)',
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
    accent: 'violet',
    borderColor: 'rgba(139,92,246,0.5)',
    glowColor: '0 0 0 1px rgba(139,92,246,0.3), 0 0 20px rgba(139,92,246,0.1)',
    gradientFrom: 'rgba(17,24,39,0)',
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
    accent: 'emerald',
    borderColor: 'rgba(16,185,129,0.5)',
    glowColor: '0 0 0 1px rgba(16,185,129,0.3), 0 0 20px rgba(16,185,129,0.1)',
    gradientFrom: 'rgba(17,24,39,0)',
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
    accent: 'orange',
    borderColor: 'rgba(249,115,22,0.5)',
    glowColor: '0 0 0 1px rgba(249,115,22,0.3), 0 0 20px rgba(249,115,22,0.1)',
    gradientFrom: 'rgba(17,24,39,0)',
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
    accent: 'slate',
    borderColor: 'rgba(100,116,139,0.4)',
    glowColor: '0 0 0 1px rgba(100,116,139,0.2)',
    gradientFrom: 'rgba(17,24,39,0)',
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
    accent: 'rose',
    borderColor: 'rgba(244,63,94,0.5)',
    glowColor: '0 0 0 1px rgba(244,63,94,0.3), 0 0 20px rgba(244,63,94,0.1)',
    gradientFrom: 'rgba(17,24,39,0)',
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
    accent: 'cyan',
    borderColor: 'rgba(6,182,212,0.5)',
    glowColor: '0 0 0 1px rgba(6,182,212,0.3), 0 0 20px rgba(6,182,212,0.1)',
    gradientFrom: 'rgba(17,24,39,0)',
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
        <h1 className="text-2xl font-bold tracking-tight">Agents</h1>
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

      {/* Trading card grid */}
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {agents.map((agent) => {
          const status = statusConfig[agent.status]
          return (
            <div
              key={agent.id}
              className="group relative flex flex-col overflow-hidden rounded-xl bg-zinc-900 transition-all duration-300"
              style={{
                border: `1px solid ${agent.borderColor}`,
                boxShadow: agent.status === 'Active' ? agent.glowColor : 'none',
              }}
              onMouseEnter={(e) => {
                ;(e.currentTarget as HTMLDivElement).style.boxShadow = agent.glowColor
                ;(e.currentTarget as HTMLDivElement).style.transform = 'translateY(-2px)'
              }}
              onMouseLeave={(e) => {
                ;(e.currentTarget as HTMLDivElement).style.boxShadow =
                  agent.status === 'Active' ? agent.glowColor : 'none'
                ;(e.currentTarget as HTMLDivElement).style.transform = 'translateY(0)'
              }}
            >
              {/* Holographic shimmer overlay on hover */}
              <div
                className="pointer-events-none absolute inset-0 z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-xl"
                style={{
                  background:
                    'linear-gradient(135deg, transparent 40%, rgba(255,255,255,0.03) 50%, transparent 60%)',
                }}
              />

              {/* Full-bleed avatar image */}
              <div className="relative h-48 w-full overflow-hidden">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={agent.avatar}
                  alt={agent.name}
                  className="h-full w-full object-cover object-top transition-transform duration-500 group-hover:scale-105"
                />
                {/* Gradient fade to card body */}
                <div
                  className="absolute inset-0"
                  style={{
                    background: `linear-gradient(to bottom, transparent 30%, rgba(24,24,27,0.7) 70%, rgb(24,24,27) 100%)`,
                  }}
                />
                {/* Status pill — top right */}
                <div className="absolute top-3 right-3 flex items-center gap-1.5 rounded-full border border-white/10 bg-black/50 px-2.5 py-1 backdrop-blur-sm">
                  <span className={`size-1.5 rounded-full ${status.dotClass}`} />
                  <span className={`text-[11px] font-medium ${status.labelClass}`}>{status.label}</span>
                </div>
                {/* Name overlay at bottom of image */}
                <div className="absolute bottom-0 left-0 right-0 px-4 pb-3">
                  <h3 className="text-lg font-bold text-white drop-shadow-lg">{agent.name}</h3>
                  <p className="text-[11px] text-white/60">{agent.domain}</p>
                </div>
              </div>

              {/* Card body */}
              <div className="flex flex-col gap-3 p-4">
                {/* Model + accent stripe */}
                <div className="flex items-center gap-2">
                  <div
                    className="h-2 w-2 rounded-full shrink-0"
                    style={{ backgroundColor: agent.borderColor, boxShadow: `0 0 6px ${agent.borderColor}` }}
                  />
                  <span className="font-mono text-[11px] text-muted-foreground truncate">{agent.model}</span>
                </div>

                {/* Stats */}
                <div className="grid grid-cols-2 gap-2">
                  <div className="rounded-md bg-zinc-800/60 px-2.5 py-1.5">
                    <p className="text-[10px] text-muted-foreground">Last active</p>
                    <p className="text-xs font-medium text-foreground">{agent.lastActive}</p>
                  </div>
                  <div className="rounded-md bg-zinc-800/60 px-2.5 py-1.5">
                    <p className="text-[10px] text-muted-foreground">Heartbeat</p>
                    <p className="text-xs font-medium text-foreground">{agent.heartbeat}</p>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex items-center gap-2 pt-1">
                  <Button
                    variant="ghost"
                    size="sm"
                    className="h-7 flex-1 gap-1 px-2 text-xs text-muted-foreground hover:text-foreground"
                    asChild
                  >
                    <Link href={`/agents/${agent.id}`}>View Profile</Link>
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="h-7 gap-1 px-2 text-xs text-muted-foreground hover:text-primary"
                  >
                    <MessageSquare className="size-3" />
                    <ArrowRight className="size-3" />
                  </Button>
                </div>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
