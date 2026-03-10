export interface Project {
  id: string
  name: string
  description: string
  agentIds: string[]
  createdAt: string
  updatedAt: string
}

export interface Agent {
  id: string
  name: string
  model: string
  status: 'idle' | 'running' | 'stale'
  lastActive: string
}

export interface KanbanCard {
  id: string
  title: string
  description: string
  status: 'backlog' | 'in_progress' | 'review' | 'done'
  assignedAgentId?: string
  linkedCronId?: string
  deliverablePath?: string
  completionNotes?: string
}
