import { Badge } from '@/components/ui/badge'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'

const tabs = ['identity', 'skills-tools', 'activity', 'scheduled-tasks', 'domain-resources'] as const

const agentAvatarMap: Record<string, string> = {
  merlin: '/avatars/atlas.png',
  scout: '/avatars/scout.png',
  canvas: '/avatars/canvas.png',
  forge: '/avatars/forge.png',
  helm: '/avatars/helm.png',
  orion: '/avatars/atlas.png',
  dispatch: '/avatars/dispatch.png',
}

export default async function AgentDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const agentName = id.charAt(0).toUpperCase() + id.slice(1)
  const avatar = agentAvatarMap[id] ?? '/avatars/atlas.png'

  return (
    <div className="flex flex-col gap-8">
      <section className="relative overflow-hidden rounded-2xl border border-border bg-card p-6 md:p-8">
        <div className="pointer-events-none absolute inset-0 mesh-purple opacity-40" />
        <div className="relative z-10 grid gap-5 md:grid-cols-[1fr_180px] md:items-end">
          <div>
            <h1 className="font-bold tracking-tight text-foreground">{agentName}</h1>
            <p className="mt-2 text-base md:text-lg text-muted-foreground">Agent profile and execution intelligence.</p>
            <div className="mt-4 flex flex-wrap gap-2">
              <Badge className="text-sm px-3 py-1 bg-emerald-500/15 text-emerald-400 border border-emerald-500/30">Active</Badge>
              <Badge variant="secondary" className="text-sm px-3 py-1">anthropic/claude-sonnet-4-6</Badge>
              <Badge variant="outline" className="text-sm px-3 py-1">Role: Specialist</Badge>
            </div>
          </div>
          <div className="justify-self-start md:justify-self-end">
            <div className="relative h-40 w-32 md:h-48 md:w-36 overflow-hidden rounded-xl border border-border/70 bg-black/30 blue-glow">
              <img src={avatar} alt={agentName} className="h-full w-full object-cover object-top" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-transparent to-transparent" />
            </div>
          </div>
        </div>
      </section>

      <section className="grid gap-4 md:grid-cols-3">
        {[
          { label: 'Last Active', value: '4m ago' },
          { label: 'Task Throughput', value: '18 / day' },
          { label: 'Scheduled Jobs', value: '5' },
        ].map((s) => (
          <Card key={s.label}>
            <CardHeader className="pb-2">
              <CardDescription className="text-sm">{s.label}</CardDescription>
              <CardTitle className="text-3xl font-bold">{s.value}</CardTitle>
            </CardHeader>
          </Card>
        ))}
      </section>

      <Tabs defaultValue="identity" className="space-y-5">
        <TabsList className="h-auto flex-wrap gap-2 bg-transparent p-0">
          {tabs.map((tab) => (
            <TabsTrigger
              key={tab}
              value={tab}
              className="rounded-md border border-border bg-card px-4 py-2.5 text-base data-[state=active]:border-primary/40 data-[state=active]:bg-primary/10"
            >
              {tab}
            </TabsTrigger>
          ))}
        </TabsList>

        <TabsContent value="identity">
          <Card>
            <CardHeader>
              <CardTitle className="text-xl">Identity</CardTitle>
              <CardDescription className="text-base">Core profile, role scope, and behavior summary.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-2 text-base">
              <div className="rounded-md border border-border p-3">Primary Model: anthropic/claude-sonnet-4-6</div>
              <div className="rounded-md border border-border p-3">Fallback: openai-codex/gpt-5.3-codex</div>
              <div className="rounded-md border border-border p-3">Persona: mission-first, concise, execution-focused</div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="skills-tools">
          <Card>
            <CardHeader>
              <CardTitle className="text-xl">Skills & Tools</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-base">
              <div className="flex flex-wrap gap-2">
                {['coding-agent', 'frontend-design', 'github', 'cron', 'browser'].map((s) => (
                  <Badge key={s} variant="secondary" className="text-sm px-3 py-1">{s}</Badge>
                ))}
              </div>
              <div className="rounded-md border border-border p-3">Tool profile: full • messaging • filesystem • web</div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="activity">
          <Card>
            <CardHeader>
              <CardTitle className="text-xl">Activity Timeline</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 text-base">
              {['12:11 — deployed oc-command update', '12:05 — generated agent card redesign', '11:48 — patched auth middleware'].map((e) => (
                <div key={e} className="rounded-md border border-border p-3">{e}</div>
              ))}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="scheduled-tasks">
          <Card>
            <CardHeader>
              <CardTitle className="text-xl">Scheduled Tasks</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 text-base">
              {['Followup enforcer — every 2m', 'Deploy watchdog — on push', 'Health check — hourly'].map((t) => (
                <div key={t} className="flex items-center justify-between rounded-md border border-border p-3">
                  <span>{t}</span>
                  <Badge variant="outline">enabled</Badge>
                </div>
              ))}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="domain-resources">
          <Card>
            <CardHeader>
              <CardTitle className="text-xl">Domain Resources</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 text-base">
              <div className="rounded-md border border-border p-3">UI pattern library references</div>
              <div className="rounded-md border border-border p-3">Feedback log from V</div>
              <div className="rounded-md border border-border p-3">Design trend notes and examples</div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
