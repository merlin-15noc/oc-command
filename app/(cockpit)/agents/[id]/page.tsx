import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'

const tabs = [
  { value: 'identity', label: 'Identity', description: 'Agent name, model, system prompt, and core configuration.' },
  { value: 'skills-tools', label: 'Skills & Tools', description: 'Loaded skills, available tools, and capability configuration.' },
  { value: 'activity', label: 'Activity', description: 'Recent sessions, task history, and execution logs.' },
  { value: 'scheduled-tasks', label: 'Scheduled Tasks', description: 'Cron jobs and scheduled automations assigned to this agent.' },
  { value: 'domain-resources', label: 'Domain Resources', description: 'Domain knowledge files and reference materials for this agent.' },
]

export default async function AgentDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const agentName = id.charAt(0).toUpperCase() + id.slice(1)

  return (
    <div className="flex flex-col gap-8">
      <div>
        <h1 className="font-bold tracking-tight text-foreground">{agentName}</h1>
        <p className="text-base text-muted-foreground mt-2">Agent profile</p>
      </div>

      <Tabs defaultValue="identity" className="space-y-5">
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
                  No data available yet for {agentName}&apos;s {tab.label.toLowerCase()}.
                </p>
              </CardContent>
            </Card>
          </TabsContent>
        ))}
      </Tabs>
    </div>
  )
}
