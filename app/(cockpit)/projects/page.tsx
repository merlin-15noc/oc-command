import Link from 'next/link'
import { ArrowRight, Plus } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'

const mockProjects = [
  {
    id: 'oc-command',
    name: 'OC Command',
    description: 'Lightweight control plane UI for OpenClaw agent orchestration.',
    agents: [
      { initial: 'M', color: 'bg-blue-500/20 text-blue-400' },
      { initial: 'S', color: 'bg-violet-500/20 text-violet-400' },
    ],
    kanban: [
      { label: 'Backlog', count: 2, color: 'text-zinc-400 bg-zinc-800' },
      { label: 'In Progress', count: 1, color: 'text-blue-400 bg-blue-500/10' },
      { label: 'Review', count: 0, color: 'text-amber-400 bg-amber-500/10' },
      { label: 'Done', count: 1, color: 'text-emerald-400 bg-emerald-500/10' },
    ],
    lastActivity: '2h ago',
    mesh: 'mesh-blue',
  },
  {
    id: 'api-integration',
    name: 'API Integration',
    description: 'Gateway API client and webhook integration layer for external services.',
    agents: [
      { initial: 'F', color: 'bg-orange-500/20 text-orange-400' },
      { initial: 'M', color: 'bg-blue-500/20 text-blue-400' },
    ],
    kanban: [
      { label: 'Backlog', count: 4, color: 'text-zinc-400 bg-zinc-800' },
      { label: 'In Progress', count: 2, color: 'text-blue-400 bg-blue-500/10' },
      { label: 'Review', count: 1, color: 'text-amber-400 bg-amber-500/10' },
      { label: 'Done', count: 3, color: 'text-emerald-400 bg-emerald-500/10' },
    ],
    lastActivity: '1d ago',
    mesh: 'mesh-purple',
  },
  {
    id: 'design-system',
    name: 'Design System',
    description: 'Shared component library and design tokens for consistent UI.',
    agents: [
      { initial: 'S', color: 'bg-violet-500/20 text-violet-400' },
      { initial: 'F', color: 'bg-orange-500/20 text-orange-400' },
      { initial: 'M', color: 'bg-blue-500/20 text-blue-400' },
    ],
    kanban: [
      { label: 'Backlog', count: 6, color: 'text-zinc-400 bg-zinc-800' },
      { label: 'In Progress', count: 3, color: 'text-blue-400 bg-blue-500/10' },
      { label: 'Review', count: 2, color: 'text-amber-400 bg-amber-500/10' },
      { label: 'Done', count: 8, color: 'text-emerald-400 bg-emerald-500/10' },
    ],
    lastActivity: '3d ago',
    mesh: 'mesh-teal',
  },
]

export default function ProjectsPage() {
  return (
    <div className="flex flex-col gap-6">
      {/* Header */}
      <div className="flex items-start justify-between gap-4">
        <div>
          <h1 className="font-bold tracking-tight text-foreground">Projects</h1>
          <p className="mt-2 text-base text-muted-foreground">Your agent-driven workspaces.</p>
          {/* Stats row */}
          <div className="mt-3 flex items-center gap-2">
            <span className="rounded-md border border-border bg-muted/40 px-3 py-1 text-sm text-muted-foreground">
              3 active
            </span>
            <span className="rounded-md border border-border bg-muted/40 px-3 py-1 text-sm text-muted-foreground">
              22 open tasks
            </span>
            <span className="rounded-md border border-border bg-muted/40 px-3 py-1 text-sm text-muted-foreground">
              Last updated 2h ago
            </span>
          </div>
        </div>
        <Button size="default" className="shrink-0 gap-2 text-base px-5 py-5">
          <Plus className="size-4" />
          New Project
        </Button>
      </div>

      {/* Grid */}
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
        {mockProjects.map((project) => (
          <Link key={project.id} href={`/projects/${project.id}`}>
            <div className={[
              'group relative flex h-full flex-col overflow-hidden rounded-lg border border-border bg-card',
              'transition-all duration-200 hover:border-primary/30 hover:blue-glow',
            ].join(' ')}>
              {/* Gradient mesh top strip */}
              <div className={`h-20 w-full ${project.mesh}`} />

              {/* Body */}
              <div className="flex flex-1 flex-col gap-4 p-4 pt-3">
                <div>
                  <h2 className="text-xl font-semibold text-foreground">{project.name}</h2>
                  <p className="mt-2 text-base text-muted-foreground leading-relaxed">{project.description}</p>
                </div>

                {/* Mini kanban */}
                <div className="flex flex-wrap gap-1.5">
                  {project.kanban.map((col) => (
                    <span
                      key={col.label}
                      className={`rounded-sm px-2.5 py-1 text-sm font-medium ${col.color}`}
                    >
                      {col.count} {col.label}
                    </span>
                  ))}
                </div>

                {/* Footer */}
                <div className="mt-auto flex items-center justify-between pt-1">
                  {/* Agent avatars */}
                  <div className="flex -space-x-2">
                    {project.agents.map((agent) => (
                      <Avatar
                        key={agent.initial}
                        className="size-8 rounded-full border border-border ring-0 transition-all group-hover:ring-1 group-hover:ring-primary/50"
                      >
                        <AvatarFallback className={`text-sm font-semibold ${agent.color}`}>
                          {agent.initial}
                        </AvatarFallback>
                      </Avatar>
                    ))}
                  </div>

                  <div className="flex items-center gap-2">
                    <span className="text-sm text-muted-foreground">{project.lastActivity}</span>
                    <ArrowRight className="size-4 text-muted-foreground transition-colors group-hover:text-primary" />
                  </div>
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}
