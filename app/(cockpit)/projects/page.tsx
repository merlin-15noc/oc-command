import Link from 'next/link'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'

const mockProjects = [
  {
    id: 'oc-command',
    name: 'OC Command',
    description: 'Lightweight control plane UI for OpenClaw agent orchestration runtime.',
    agents: ['M', 'S'],
    openTasks: 7,
    lastActivity: '2 hours ago',
  },
  {
    id: 'api-integration',
    name: 'API Integration',
    description: 'Gateway API client and webhook integration layer for external services.',
    agents: ['F', 'M'],
    openTasks: 3,
    lastActivity: '1 day ago',
  },
  {
    id: 'design-system',
    name: 'Design System',
    description: 'Shared component library and design tokens for consistent UI across products.',
    agents: ['S', 'F', 'M'],
    openTasks: 12,
    lastActivity: '3 days ago',
  },
]

export default function ProjectsPage() {
  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight">Projects</h1>
        <p className="text-sm text-muted-foreground mt-1">Your agent-driven project workspaces.</p>
      </div>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {mockProjects.map((project) => (
          <Link key={project.id} href={`/projects/${project.id}`}>
            <Card className="h-full cursor-pointer transition-colors hover:bg-muted/50">
              <CardHeader className="pb-2">
                <div className="flex items-start justify-between gap-2">
                  <CardTitle className="text-base">{project.name}</CardTitle>
                  <Badge variant="secondary">{project.openTasks} open</Badge>
                </div>
                <CardDescription className="text-sm">{project.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between">
                  <div className="flex -space-x-2">
                    {project.agents.map((initial) => (
                      <Avatar key={initial} className="h-7 w-7 border-2 border-background">
                        <AvatarFallback className="text-xs">{initial}</AvatarFallback>
                      </Avatar>
                    ))}
                  </div>
                  <span className="text-xs text-muted-foreground">{project.lastActivity}</span>
                </div>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  )
}
