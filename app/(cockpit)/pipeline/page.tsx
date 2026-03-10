import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { GitBranch } from 'lucide-react'

export default function PipelinePage() {
  return (
    <div className="flex flex-1 items-center justify-center">
      <Card className="max-w-lg w-full">
        <CardHeader className="text-center pb-4">
          <div className="flex justify-center mb-4">
            <div className="rounded-full bg-muted p-4">
              <GitBranch className="h-8 w-8 text-muted-foreground" />
            </div>
          </div>
          <div className="flex items-center justify-center gap-2 mb-2">
            <CardTitle className="text-xl">Pipeline / Workflow Editor</CardTitle>
            <Badge variant="outline">Planned</Badge>
          </div>
          <CardDescription className="text-sm">
            Visual multi-agent workflow orchestration. Chain tasks, define handoffs, trigger conditions. Coming after Screens 1–3 are stable.
          </CardDescription>
        </CardHeader>
        <CardContent className="text-center">
          <p className="text-xs text-muted-foreground">
            This screen will enable building complex multi-step agent pipelines with visual drag-and-drop tooling.
          </p>
        </CardContent>
      </Card>
    </div>
  )
}
