import { Badge } from '@/components/ui/badge'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'

const tabs = ['docs', 'deliverables', 'kanban', 'crons', 'resources'] as const

export default async function ProjectDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const projectName = id
    .split('-')
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(' ')

  return (
    <div className="flex flex-col gap-8">
      <section className="relative overflow-hidden rounded-2xl border border-border bg-card p-6 md:p-8">
        <div className="pointer-events-none absolute inset-0 mesh-blue opacity-50" />
        <div className="relative z-10">
          <h1 className="font-bold tracking-tight text-foreground">{projectName}</h1>
          <p className="mt-2 text-base md:text-lg text-muted-foreground max-w-3xl">
            Project command center — docs, deliverables, execution flow, and scheduled automation in one place.
          </p>
          <div className="mt-4 flex flex-wrap gap-2">
            <Badge className="text-sm px-3 py-1 bg-primary/15 text-primary border border-primary/30">22 Open Tasks</Badge>
            <Badge variant="secondary" className="text-sm px-3 py-1">6 Assigned Agents</Badge>
            <Badge variant="outline" className="text-sm px-3 py-1">Updated 18m ago</Badge>
          </div>
        </div>
      </section>

      <section className="grid gap-4 md:grid-cols-3">
        {[
          { label: 'Deliverables', value: '14', accent: 'bg-emerald-400' },
          { label: 'Open Tasks', value: '22', accent: 'bg-amber-400' },
          { label: 'Scheduled Crons', value: '7', accent: 'bg-blue-400' },
        ].map((s) => (
          <Card key={s.label} className="stat-card" style={{ ['--stat-accent' as any]: 'oklch(0.62 0.2 250)' }}>
            <CardHeader className="pb-2">
              <CardDescription className="text-sm">{s.label}</CardDescription>
              <CardTitle className="text-3xl font-bold">{s.value}</CardTitle>
            </CardHeader>
          </Card>
        ))}
      </section>

      <Tabs defaultValue="docs" className="space-y-5">
        <TabsList className="h-auto flex-wrap gap-2 bg-transparent p-0">
          {tabs.map((tab) => (
            <TabsTrigger
              key={tab}
              value={tab}
              className="rounded-md border border-border bg-card px-4 py-2.5 text-base capitalize data-[state=active]:border-primary/40 data-[state=active]:bg-primary/10"
            >
              {tab}
            </TabsTrigger>
          ))}
        </TabsList>

        <TabsContent value="docs" className="grid gap-4 lg:grid-cols-3">
          <Card className="lg:col-span-1">
            <CardHeader>
              <CardTitle className="text-xl">Doc Files</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2 text-base">
              <div className="rounded-md border border-border p-3">PRD.md</div>
              <div className="rounded-md border border-border p-3">ARCHITECTURE.md</div>
              <div className="rounded-md border border-border p-3">ROADMAP.md</div>
            </CardContent>
          </Card>
          <Card className="lg:col-span-2">
            <CardHeader>
              <CardTitle className="text-xl">Preview</CardTitle>
              <CardDescription className="text-base">Select a document to preview/edit.</CardDescription>
            </CardHeader>
            <CardContent className="text-base text-muted-foreground">
              No file selected yet. This panel will show markdown preview with inline edit actions.
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="deliverables">
          <Card>
            <CardHeader>
              <CardTitle className="text-xl">Recent Deliverables</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 text-base">
              {['UI Revamp Pack', 'Cron Automation Spec', 'Agent Profile Taxonomy'].map((d, i) => (
                <div key={d} className="flex items-center justify-between rounded-md border border-border p-3">
                  <span>{d}</span>
                  <Badge className={i === 0 ? 'bg-emerald-500/15 text-emerald-400' : 'bg-blue-500/15 text-blue-400'}>{i === 0 ? 'Final' : 'Draft'}</Badge>
                </div>
              ))}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="kanban">
          <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-4">
            {['Backlog', 'In Progress', 'Review', 'Done'].map((col) => (
              <Card key={col}>
                <CardHeader className="pb-3">
                  <CardTitle className="text-lg">{col}</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  <div className="rounded-md border border-border p-3 text-sm">Card A</div>
                  <div className="rounded-md border border-border p-3 text-sm">Card B</div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="crons">
          <Card>
            <CardHeader>
              <CardTitle className="text-xl">Scheduled Jobs</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 text-base">
              {[
                ['Sync Deliverables', 'Every 15m', 'Running'],
                ['Agent Health Sweep', 'Hourly', 'Running'],
                ['Nightly Summary', '00:00', 'Paused'],
              ].map(([name, next, status]) => (
                <div key={name} className="flex items-center justify-between rounded-md border border-border p-3">
                  <div>
                    <p className="font-medium">{name}</p>
                    <p className="text-sm text-muted-foreground">Next: {next}</p>
                  </div>
                  <Badge variant={status === 'Paused' ? 'secondary' : 'outline'}>{status}</Badge>
                </div>
              ))}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="resources">
          <div className="grid gap-4 md:grid-cols-2">
            {['Design Inspiration Pack', 'API Integration Notes', 'UX Benchmark Links', 'Data Dictionary'].map((r) => (
              <Card key={r}>
                <CardHeader>
                  <CardTitle className="text-lg">{r}</CardTitle>
                  <CardDescription className="text-sm">Tagged reference material</CardDescription>
                </CardHeader>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
