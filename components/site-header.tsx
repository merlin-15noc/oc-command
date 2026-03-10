'use client'

import { usePathname } from 'next/navigation'
import { useTheme } from 'next-themes'
import { Sun, Moon } from 'lucide-react'
import { Button } from '@/components/ui/button'
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb'
import { Separator } from '@/components/ui/separator'
import { SidebarTrigger } from '@/components/ui/sidebar'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'

const labelMap: Record<string, string> = {
  projects: 'Projects',
  skills: 'Skills',
  agents: 'Agents',
  pipeline: 'Pipeline',
  settings: 'Settings',
}

function useBreadcrumbs() {
  const pathname = usePathname()
  const segments = pathname.split('/').filter(Boolean)
  if (segments.length === 0) return [{ label: 'Home', href: '/' }]
  return segments.map((seg, i) => {
    const href = '/' + segments.slice(0, i + 1).join('/')
    const label = labelMap[seg] ?? seg.charAt(0).toUpperCase() + seg.slice(1)
    return { label, href }
  })
}

export function SiteHeader() {
  const { theme, setTheme } = useTheme()
  const breadcrumbs = useBreadcrumbs()

  return (
    <header className="sticky top-0 z-50 flex h-14 shrink-0 items-center gap-2 border-b border-border bg-background/80 backdrop-blur-md px-4">
      <SidebarTrigger className="-ml-1 text-muted-foreground hover:text-foreground" />
      <Separator orientation="vertical" className="mx-2 h-4 bg-border" />

      <Breadcrumb>
        <BreadcrumbList>
          {breadcrumbs.map((crumb, i) => (
            <span key={crumb.href} className="flex items-center gap-1.5">
              {i > 0 && <BreadcrumbSeparator className="text-muted-foreground/50" />}
              <BreadcrumbItem>
                {i === breadcrumbs.length - 1 ? (
                  <BreadcrumbPage className="text-sm font-medium text-foreground">
                    {crumb.label}
                  </BreadcrumbPage>
                ) : (
                  <BreadcrumbLink
                    href={crumb.href}
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {crumb.label}
                  </BreadcrumbLink>
                )}
              </BreadcrumbItem>
            </span>
          ))}
        </BreadcrumbList>
      </Breadcrumb>

      <div className="ml-auto flex items-center gap-2">
        {/* Model badge */}
        <div className="flex items-center gap-1.5 rounded-md border border-border bg-muted/40 px-2.5 py-1 text-xs text-muted-foreground font-mono">
          <span className="size-1.5 rounded-full bg-emerald-400 shadow-[0_0_4px_oklch(0.75_0.18_160/0.8)]" />
          anthropic/claude-sonnet-4-6
        </div>

        <Separator orientation="vertical" className="h-4 bg-border" />

        {/* Theme toggle */}
        <Button
          variant="ghost"
          size="icon"
          className="size-8 text-muted-foreground hover:text-foreground"
          onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
        >
          <Sun className="h-4 w-4 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
          <Moon className="absolute h-4 w-4 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
          <span className="sr-only">Toggle theme</span>
        </Button>

        {/* Avatar */}
        <Avatar className="size-7 rounded-md cursor-pointer">
          <AvatarFallback className="rounded-md bg-primary/20 text-primary text-xs font-semibold">
            V
          </AvatarFallback>
        </Avatar>
      </div>
    </header>
  )
}
