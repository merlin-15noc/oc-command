import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Folder } from 'lucide-react'

const mockSkills = [
  'coding-agent',
  'frontend-design',
  'github',
  'weather',
  'vercel-react-best-practices',
  'data-analysis',
  'api-integration',
  'documentation',
]

export default function SkillsPage() {
  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight">Skills</h1>
        <p className="text-sm text-muted-foreground mt-1">Browse and inspect agent skill definitions.</p>
      </div>
      <div className="flex gap-4 h-[calc(100vh-12rem)]">
        <div className="w-72 shrink-0 border rounded-lg overflow-hidden">
          <ScrollArea className="h-full">
            <div className="p-2">
              {mockSkills.map((skill) => (
                <button
                  key={skill}
                  className="flex w-full items-center gap-2 rounded-md px-3 py-2 text-sm hover:bg-muted transition-colors text-left"
                >
                  <Folder className="h-4 w-4 text-muted-foreground shrink-0" />
                  <span className="font-mono">{skill}</span>
                </button>
              ))}
            </div>
          </ScrollArea>
        </div>
        <Card className="flex-1">
          <CardHeader>
            <CardTitle>No skill selected</CardTitle>
            <CardDescription>Select a skill from the list to view its SKILL.md definition.</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">
              Skills are YAML-frontmatter Markdown files that define agent capabilities, tools, and behavioral guidelines.
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
