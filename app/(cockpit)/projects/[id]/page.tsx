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
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight">{projectName}</h1>
        <p className="text-sm text-muted-foreground mt-1">Project workspace</p>
      </div>
      <Tabs defaultValue="docs">
        <TabsList>
          {tabs.map((tab) => (
            <TabsTrigger key={tab.value} value={tab.value}>
              {tab.label}
            </TabsTrigger>
          ))}
        </TabsList>
        {tabs.map((tab) => (
          <TabsContent key={tab.value} value={tab.value}>
            <Card>
              <CardHeader>
                <CardTitle>{tab.label}</CardTitle>
                <CardDescription>{tab.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
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
