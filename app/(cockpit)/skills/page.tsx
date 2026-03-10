'use client'

import { useState } from 'react'
import { Search } from 'lucide-react'
import { Input } from '@/components/ui/input'
import { ScrollArea } from '@/components/ui/scroll-area'

type SkillCategory = 'core' | 'ai' | 'public' | 'utility'

interface Skill {
  id: string
  name: string
  version: string
  category: SkillCategory
  dotColor: string
}

const skillGroups: { label: string; icon: string; category: SkillCategory; dotColor: string }[] = [
  { label: 'Core', icon: '🔧', category: 'core', dotColor: 'bg-blue-400' },
  { label: 'AI / Models', icon: '🤖', category: 'ai', dotColor: 'bg-violet-400' },
  { label: 'Public', icon: '🌐', category: 'public', dotColor: 'bg-emerald-400' },
  { label: 'Utility', icon: '🔍', category: 'utility', dotColor: 'bg-amber-400' },
]

const mockSkills: Skill[] = [
  { id: 'coding-agent', name: 'coding-agent', version: '2.1.0', category: 'core', dotColor: 'bg-blue-400' },
  { id: 'github', name: 'github', version: '1.4.2', category: 'core', dotColor: 'bg-blue-400' },
  { id: 'gh-issues', name: 'gh-issues', version: '1.0.1', category: 'core', dotColor: 'bg-blue-400' },
  { id: 'nano-banana-pro', name: 'nano-banana-pro', version: '3.0.0', category: 'ai', dotColor: 'bg-violet-400' },
  { id: 'openai-image-gen', name: 'openai-image-gen', version: '1.2.0', category: 'ai', dotColor: 'bg-violet-400' },
  { id: 'openai-whisper-api', name: 'openai-whisper-api', version: '1.1.0', category: 'ai', dotColor: 'bg-violet-400' },
  { id: 'frontend-design', name: 'frontend-design', version: '1.0.0', category: 'public', dotColor: 'bg-emerald-400' },
  { id: 'vercel-react-best-practices', name: 'vercel-react-best-practices', version: '1.0.0', category: 'public', dotColor: 'bg-emerald-400' },
  { id: 'weather', name: 'weather', version: '0.9.1', category: 'utility', dotColor: 'bg-amber-400' },
  { id: 'healthcheck', name: 'healthcheck', version: '1.0.0', category: 'utility', dotColor: 'bg-amber-400' },
  { id: 'himalaya', name: 'himalaya', version: '0.3.2', category: 'utility', dotColor: 'bg-amber-400' },
]

export default function SkillsPage() {
  const [selected, setSelected] = useState<string | null>(null)
  const [query, setQuery] = useState('')

  const filtered = mockSkills.filter((s) =>
    s.name.toLowerCase().includes(query.toLowerCase())
  )
  const selectedSkill = mockSkills.find((s) => s.id === selected)

  return (
    <div className="flex flex-col gap-4 h-full">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-foreground">Skills</h1>
        <p className="mt-1 text-sm text-muted-foreground">Browse and inspect agent skill definitions.</p>
      </div>

      {/* Two-panel layout */}
      <div className="flex gap-0 overflow-hidden rounded-lg border border-border bg-card" style={{ height: 'calc(100vh - 14rem)' }}>
        {/* Left panel */}
        <div className="w-72 shrink-0 flex flex-col border-r border-border">
          {/* Search */}
          <div className="p-3 border-b border-border">
            <div className="relative">
              <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 size-3.5 text-muted-foreground" />
              <Input
                placeholder="Search skills..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="h-8 pl-8 text-xs bg-background border-border focus-visible:ring-primary/30"
              />
            </div>
          </div>

          {/* Skill list */}
          <ScrollArea className="flex-1">
            <div className="p-2">
              {skillGroups.map((group) => {
                const groupSkills = filtered.filter((s) => s.category === group.category)
                if (groupSkills.length === 0) return null
                return (
                  <div key={group.category} className="mb-4">
                    {/* Group header */}
                    <div className="flex items-center gap-1.5 px-2 py-1 mb-1">
                      <span className="text-[10px]">{group.icon}</span>
                      <span className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">
                        {group.label}
                      </span>
                      <span className="ml-auto rounded-sm bg-muted px-1 py-0.5 text-[9px] font-medium text-muted-foreground">
                        {groupSkills.length}
                      </span>
                    </div>

                    {/* Skill items */}
                    {groupSkills.map((skill) => {
                      const isActive = selected === skill.id
                      return (
                        <button
                          key={skill.id}
                          onClick={() => setSelected(skill.id)}
                          className={[
                            'relative flex w-full items-center gap-2.5 rounded-md px-3 py-2 text-left transition-all duration-100',
                            isActive
                              ? 'bg-primary/10 text-foreground before:absolute before:left-0 before:top-1.5 before:bottom-1.5 before:w-0.5 before:rounded-full before:bg-primary'
                              : 'text-muted-foreground hover:bg-muted/50 hover:text-foreground',
                          ].join(' ')}
                        >
                          <span className={`size-1.5 shrink-0 rounded-full ${skill.dotColor}`} />
                          <span className="flex-1 truncate font-mono text-[11px]">{skill.name}</span>
                          <span className="shrink-0 text-[9px] text-muted-foreground/60">{skill.version}</span>
                        </button>
                      )
                    })}
                  </div>
                )
              })}
            </div>
          </ScrollArea>
        </div>

        {/* Right panel */}
        <div className="flex flex-1 flex-col overflow-hidden">
          {selectedSkill ? (
            <div className="flex flex-col h-full">
              {/* Skill header */}
              <div className="flex items-center gap-3 border-b border-border px-6 py-4">
                <span className={`size-2 rounded-full ${selectedSkill.dotColor}`} />
                <h2 className="text-base font-semibold text-foreground font-mono">{selectedSkill.name}</h2>
                <span className="rounded-sm bg-muted px-1.5 py-0.5 text-[10px] font-medium text-muted-foreground">
                  v{selectedSkill.version}
                </span>
              </div>
              {/* Content placeholder */}
              <ScrollArea className="flex-1 p-6">
                <div className="rounded-md border border-border bg-muted/20 p-4">
                  <p className="text-xs text-muted-foreground font-mono leading-relaxed">
                    # {selectedSkill.name}{'\n\n'}
                    SKILL.md content would render here.{'\n'}
                    Select a skill to view its definition, tools, and behavioral guidelines.
                  </p>
                </div>
              </ScrollArea>
            </div>
          ) : (
            <div className="flex flex-1 flex-col items-center justify-center gap-4 p-8">
              {/* Hexagon icon */}
              <div className="flex size-16 items-center justify-center rounded-xl border border-border bg-muted/30 text-3xl">
                ⬡
              </div>
              <div className="text-center">
                <p className="text-sm font-medium text-foreground">Select a skill</p>
                <p className="mt-1 text-xs text-muted-foreground">
                  Choose a skill from the list to view its SKILL.md definition.
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
