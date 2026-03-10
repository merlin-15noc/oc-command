import Link from 'next/link'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'

const mockAgents = [
  {
    id: 'merlin',
    name: 'Merlin',
    model: 'anthropic/claude-sonnet-4-6',
    status: 'idle' as const,
    lastActive: '10 minutes ago',
  },
  {
    id: 'scout',
    name: 'Scout',
    model: 'anthropic/claude-sonnet-4-6',
    status: 'running' as const,
    lastActive: 'Just now',
  },
  {
    id: 'forge',
    name: 'Forge',
    model: 'anthropic/claude-sonnet-4-6',
    status: 'stale' as const,
    lastActive: '2 days ago',
  },
]

const statusVariant = {
  idle: 'secondary',
  running: 'default',
  stale: 'outline',
} as const

export default function AgentsPage() {
  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight">Agents</h1>
        <p className="text-sm text-muted-foreground mt-1">Manage and monitor your OpenClaw agents.</p>
      </div>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {mockAgents.map((agent) => (
          <Link key={agent.id} href={`/agents/${agent.id}`}>
            <Card className="h-full cursor-pointer transition-colors hover:bg-muted/50">
              <CardHeader className="pb-3">
                <div className="flex items-center gap-3">
                  <Avatar className="h-10 w-10">
                    <AvatarFallback className="text-sm font-semibold">
                      {agent.name.charAt(0)}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1 min-w-0">
                    <CardTitle className="text-base">{agent.name}</CardTitle>
                    <p className="text-xs font-mono text-muted-foreground truncate">{agent.model}</p>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between">
                  <Badge variant={statusVariant[agent.status]}>{agent.status}</Badge>
                  <span className="text-xs text-muted-foreground">{agent.lastActive}</span>
                </div>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  )
}
