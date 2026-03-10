import { Layers, Zap } from 'lucide-react'
import { Badge } from '@/components/ui/badge'

export default function PipelinePage() {
  return (
    <div className="relative flex flex-1 flex-col items-center justify-center overflow-hidden min-h-[calc(100vh-8rem)]">
      {/* Abstract node-graph SVG background */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden opacity-30" aria-hidden>
        <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
          {/* Grid of nodes */}
          {([
            [120, 80], [320, 60], [540, 100], [740, 70], [920, 90],
            [80, 240], [260, 200], [460, 230], [660, 210], [860, 240],
            [150, 380], [380, 360], [580, 390], [780, 370], [960, 380],
            [200, 520], [420, 500], [620, 530], [820, 510],
          ] as [number, number][]).map(([cx, cy], i) => (
            <circle key={`n${i}`} cx={cx} cy={cy} r="3" fill="oklch(0.35 0 0)" />
          ))}
          {/* Connecting lines */}
          {([
            [120,80, 320,60], [320,60, 540,100], [540,100, 740,70], [740,70, 920,90],
            [80,240, 260,200], [260,200, 460,230], [460,230, 660,210], [660,210, 860,240],
            [150,380, 380,360], [380,360, 580,390], [580,390, 780,370], [780,370, 960,380],
            [200,520, 420,500], [420,500, 620,530], [620,530, 820,510],
            [120,80, 80,240], [260,200, 150,380], [460,230, 420,500],
            [320,60, 260,200], [540,100, 460,230], [660,210, 620,530],
            [740,70, 780,370], [860,240, 820,510], [920,90, 860,240],
            [80,240, 150,380], [380,360, 200,520], [580,390, 420,500],
          ] as [number,number,number,number][]).map(([x1,y1,x2,y2], i) => (
            <line key={`l${i}`} x1={x1} y1={y1} x2={x2} y2={y2}
              stroke="oklch(0.28 0 0)" strokeWidth="1" />
          ))}
          {/* Blue accent nodes */}
          {([[320,60],[540,100],[460,230],[780,370]] as [number,number][]).map(([cx,cy],i) => (
            <circle key={`a${i}`} cx={cx} cy={cy} r="5"
              fill="oklch(0.6 0.2 250 / 0.5)"
              stroke="oklch(0.6 0.2 250 / 0.3)" strokeWidth="1" />
          ))}
        </svg>
      </div>

      {/* Centered content */}
      <div className="relative flex flex-col items-center gap-8 px-4 text-center">
        <div className="flex flex-col items-center gap-3">
          <h1 className="text-4xl font-bold tracking-tight gradient-text">Pipeline</h1>
          <p className="text-sm text-muted-foreground max-w-md leading-relaxed">
            Chain agents, define handoffs, trigger conditions. Visual workflow orchestration powered by OpenClaw&apos;s Lobster routing.
          </p>
          <Badge variant="outline" className="border-primary/30 text-primary bg-primary/10 text-xs">
            Planned
          </Badge>
        </div>

        {/* Feature preview cards */}
        <div className="flex flex-col sm:flex-row gap-3 w-full max-w-sm">
          <div className="flex-1 rounded-lg border border-border bg-card p-4 text-left hover:border-primary/30 transition-colors duration-200">
            <div className="flex items-center gap-2 mb-2">
              <div className="flex size-7 items-center justify-center rounded-md bg-blue-500/10">
                <Layers className="size-3.5 text-blue-400" />
              </div>
              <span className="text-xs font-semibold text-foreground">Task Chaining</span>
            </div>
            <p className="text-[11px] text-muted-foreground leading-relaxed">
              Sequential or parallel task flows with conditional branching and error recovery.
            </p>
          </div>

          <div className="flex-1 rounded-lg border border-border bg-card p-4 text-left hover:border-primary/30 transition-colors duration-200">
            <div className="flex items-center gap-2 mb-2">
              <div className="flex size-7 items-center justify-center rounded-md bg-violet-500/10">
                <Zap className="size-3.5 text-violet-400" />
              </div>
              <span className="text-xs font-semibold text-foreground">Lobster Integration</span>
            </div>
            <p className="text-[11px] text-muted-foreground leading-relaxed">
              Native OpenClaw Lobster routing — smart agent dispatch with context-aware handoffs.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
