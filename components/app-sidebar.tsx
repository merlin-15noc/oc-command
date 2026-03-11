'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { FolderOpen, Puzzle, Bot, GitBranch, Settings } from 'lucide-react'
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarSeparator,
} from '@/components/ui/sidebar'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'

const navItems = [
  { href: '/projects', label: 'Projects', icon: FolderOpen },
  { href: '/skills', label: 'Skills', icon: Puzzle },
  { href: '/agents', label: 'Agents', icon: Bot },
  { href: '/pipeline', label: 'Pipeline', icon: GitBranch, soon: true },
]

export function AppSidebar() {
  const pathname = usePathname()

  return (
    <Sidebar collapsible="icon" className="border-r border-sidebar-border bg-sidebar">
      {/* Logo */}
      <SidebarHeader className="px-3 py-4">
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" asChild className="hover:bg-transparent">
              <Link href="/projects" className="flex items-center gap-2.5">
                <div className="flex size-8 shrink-0 items-center justify-center rounded-md bg-primary text-primary-foreground text-base font-bold shadow-[0_0_12px_oklch(0.6_0.2_250/0.4)]">
                  ⬡
                </div>
                <div className="grid flex-1 text-left leading-tight">
                  <span className="truncate text-base font-semibold text-sidebar-foreground">OC Command</span>
                  <span className="truncate text-sm text-muted-foreground">OpenClaw Control Plane</span>
                </div>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>

      <SidebarSeparator />

      {/* Nav */}
      <SidebarContent className="px-2 py-2">
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu className="gap-0.5">
              {navItems.map((item) => {
                const isActive = pathname.startsWith(item.href)
                return (
                  <SidebarMenuItem key={item.href}>
                    <SidebarMenuButton
                      asChild
                      isActive={isActive}
                      tooltip={item.label}
                      className={[
                        'relative h-11 gap-3 rounded-md px-3 text-base font-medium transition-all duration-150',
                        isActive
                          ? 'bg-primary/10 text-primary before:absolute before:left-0 before:top-1.5 before:bottom-1.5 before:w-0.5 before:rounded-full before:bg-primary'
                          : 'text-muted-foreground hover:bg-muted/50 hover:text-foreground',
                      ].join(' ')}
                    >
                      <Link href={item.href} className="flex items-center gap-3 w-full">
                        <item.icon
                          className={['size-4 shrink-0', isActive ? 'text-primary' : 'text-muted-foreground'].join(' ')}
                        />
                        <span className="flex-1">{item.label}</span>
                        {item.soon && (
                          <span className="ml-auto rounded-sm bg-muted px-1.5 py-0.5 text-xs font-medium text-muted-foreground">
                            Soon
                          </span>
                        )}
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                )
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      {/* Footer */}
      <SidebarFooter className="px-2 py-3">
        <SidebarSeparator className="mb-3" />
        <SidebarMenu className="gap-0.5">
          <SidebarMenuItem>
            <SidebarMenuButton
              asChild
              tooltip="Settings"
              className="h-11 gap-3 rounded-md px-3 text-base font-medium text-muted-foreground hover:bg-muted/50 hover:text-foreground transition-all duration-150"
            >
              <Link href="/settings" className="flex items-center gap-3">
                <Settings className="size-4 shrink-0 text-muted-foreground" />
                <span>Settings</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <SidebarMenuButton
              size="lg"
              className="h-14 gap-3 rounded-md px-3 hover:bg-muted/50 transition-all duration-150"
            >
              <Avatar className="size-8 shrink-0 rounded-md">
                <AvatarFallback className="rounded-md bg-primary/20 text-primary text-sm font-semibold">
                  V
                </AvatarFallback>
              </Avatar>
              <div className="grid flex-1 text-left text-base leading-tight">
                <span className="truncate font-semibold text-foreground">heyviet</span>
                <span className="truncate text-sm text-muted-foreground">Owner</span>
              </div>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  )
}
