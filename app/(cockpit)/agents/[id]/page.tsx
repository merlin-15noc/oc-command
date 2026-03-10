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
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight">{agentName}</h1>
        <p className="text-sm text-muted-foreground mt-1">Agent profile</p>
      </div>
      <Tabs defaultValue="identity">
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
