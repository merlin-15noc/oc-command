import Link from 'next/link'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import { ArrowRight, MessageSquare } from 'lucide-react'

type AgentStatus = 'Active' | 'Idle' | 'Stale'

const mockAgents: {
  id: string
  name: string
  initial: string
  avatarColor: string
  status: AgentStatus
  model: string
  lastActive: string
  heartbeat: string
}[] = [
  {
    id: 'merlin',
    name: 'Merlin',
    initial: 'M',
    avatarColor: 'bg-blue-500/20 text-blue-400',
    status: 'Active',
    model: 'anthropic/claude-sonnet-4-6',
    lastActive: '2h ago',
    heartbeat: '24h',
  },
  {
    id: 'scout',
    name: 'Scout',
    initial: 'S',
    avatarColor: 'bg-violet-500/20 text-violet-400',
    status: 'Idle',
    model: 'anthropic/claude-sonnet-4-6',
    lastActive: '6h ago',
    heartbeat: '24h',
  },
  {
    id: 'canvas',
    name: 'Canvas',
    initial: 'C',
    avatarColor: 'bg-emerald-500/20 text-emerald-400',
    status: 'Idle',
    model: 'anthropic/claude-sonnet-4-6',
    lastActive: '12h ago',
    heartbeat: '24h',
  },
  {
    id: 'forge',
    name: 'Forge',
    initial: 'F',
    avatarColor: 'bg-orange-500/20 text-orange-400',
    status: 'Idle',
    model: 'anthropic/claude-sonnet-4-6',
    lastActive: '1d ago',
    heartbeat: '24h',
  },
  {
    id: 'helm',
    name: 'Helm',
    initial: 'H',
    avatarColor: 'bg-slate-500/20 text-slate-400',
    status: 'Stale',
    model: 'anthropic/claude-sonnet-4-6',
    lastActive: '3d ago',
    heartbeat: '72h',
  },
  {
    id: 'orion',
    name: 'Orion',
    initial: 'O',
    avatarColor: 'bg-rose-500/20 text-rose-400',
    status: 'Idle',
    model: 'anthropic/claude-sonnet-4-6',
    lastActive: '2d ago',
    heartbeat: '48h',
  },
]

const statusConfig: Record<AgentStatus, { label: string; className: string; dot?: string }> = {
  Active: {
    label: 'Active',
    className: 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20',
    dot: 'bg-emerald-400 shadow-[0_0_4px_oklch(0.75_0.18_160/0.8)]',
  },
  Idle: {
    label: 'Idle',
    className: 'bg-zinc-800 text-zinc-400 border border-zinc-700',
  },
  Stale: {
    label: 'Stale',
    className: 'bg-amber-500/10 text-amber-400 border border-amber-500/20',
  },
}

export default function AgentsPage() {
  return (
    <div className="flex flex-col gap-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-foreground">Agents</h1>
        <p className="mt-1 text-sm text-muted-foreground">Agent roster and profiles.</p>
        <div className="mt-3 flex items-center gap-2">
          <span className="rounded-md border border-border bg-muted/40 px-2 py-0.5 text-xs text-muted-foreground">
            {mockAgents.length} agents
          </span>
          <span className="rounded-md border border-border bg-muted/40 px-2 py-0.5 text-xs text-muted-foreground">
            1 active now
          </span>
        </div>
      </div>

      {/* Grid */}
      <div className="grid gap-4 sm:grid-cols-2">
        {mockAgents.map((agent) => {
          const status = statusConfig[agent.status]
          const isActive = agent.status === 'Active'
          return (
            <div
              key={agent.id}
              className={[
                'group flex flex-col gap-4 rounded-lg border border-border bg-card p-4',
                'transition-all duration-200',
                isActive ? 'blue-glow border-primary/20' : 'hover:border-border/80',
              ].join(' ')}
            >
              {/* Top row */}
              <div className="flex items-center gap-3">
                <Avatar className="size-10 rounded-md shrink-0">
                  <AvatarFallback className={`rounded-md text-sm font-semibold ${agent.avatarColor}`}>
                    {agent.initial}
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-semibold text-foreground">{agent.name}</span>
                    <span className={`inline-flex items-center gap-1 rounded-sm px-1.5 py-0.5 text-[10px] font-medium ${status.className}`}>
                      {status.dot && <span className={`size-1.5 rounded-full ${status.dot}`} />}
                      {status.label}
                    </span>
                  </div>
                  <p className="mt-0.5 font-mono text-[11px] text-muted-foreground truncate">
                    {agent.model}
                  </p>
                </div>
              </div>

              {/* Divider */}
              <div className="h-px w-full bg-border" />

              {/* Stats */}
              <div className="flex items-center gap-4 text-xs text-muted-foreground">
                <span>Last active: <span className="text-foreground/80">{agent.lastActive}</span></span>
                <span>Heartbeat: <span className="text-foreground/80">{agent.heartbeat}</span></span>
              </div>

              {/* Actions */}
              <div className="flex items-center gap-2">
                <Button variant="ghost" size="sm" className="h-7 gap-1.5 px-2 text-xs text-muted-foreground hover:text-foreground" asChild>
                  <Link href={`/agents/${agent.id}`}>
                    View Profile
                  </Link>
                </Button>
                <Button variant="ghost" size="sm" className="h-7 gap-1.5 px-2 text-xs text-muted-foreground hover:text-primary">
                  <MessageSquare className="size-3" />
                  Message
                  <ArrowRight className="size-3" />
                </Button>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
