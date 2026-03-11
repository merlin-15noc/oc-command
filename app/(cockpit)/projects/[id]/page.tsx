import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'

const tabs = [
  { value: 'docs', label: 'Docs', description: 'Project documentation, specifications, and notes managed by agents.' },
  { value: 'deliverables', label: 'Deliverables', description: 'Completed artifacts, files, and outputs produced by agents.' },
  { value: 'kanban', label: 'Kanban', description: 'Task board with backlog, in-progress, review, and done columns.' },
  { value: 'crons', label: 'Crons', description: 'Scheduled agent jobs and recurring automation tasks.' },
  { value: 'resources', label: 'Resources', description: 'Domain knowledge files, data sources, and reference materials.' },
]

export default async function ProjectDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const projectName = id
    .split('-')
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(' ')

  return (
    <div className="flex flex-col gap-8">
      <div>
        <h1 className="font-bold tracking-tight text-foreground">{projectName}</h1>
        <p className="text-base text-muted-foreground mt-2">Project workspace</p>
      </div>

      <Tabs defaultValue="docs" className="space-y-5">
        <TabsList className="h-auto flex-wrap gap-2 bg-transparent p-0">
          {tabs.map((tab) => (
            <TabsTrigger
              key={tab.value}
              value={tab.value}
              className="rounded-md border border-border bg-card px-4 py-2.5 text-base data-[state=active]:border-primary/40 data-[state=active]:bg-primary/10"
            >
              {tab.label}
            </TabsTrigger>
          ))}
        </TabsList>

        {tabs.map((tab) => (
          <TabsContent key={tab.value} value={tab.value}>
            <Card className="rounded-xl border-border/80">
              <CardHeader className="pb-3">
                <CardTitle className="text-2xl font-semibold tracking-tight">{tab.label}</CardTitle>
                <CardDescription className="text-base text-muted-foreground leading-relaxed">
                  {tab.description}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-base text-muted-foreground leading-relaxed">
                  No {tab.label.toLowerCase()} yet. Agents will populate this section as work progresses.
                </p>
              </CardContent>
            </Card>
          </TabsContent>
        ))}
      </Tabs>
    </div>
  )
}
