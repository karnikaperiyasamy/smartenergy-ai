import { Database, BrainCircuit, AlertTriangle, Cpu, MessageCircle, Lightbulb, SlidersHorizontal, PiggyBank } from 'lucide-react'

const STAGES = [
  { label: 'Energy Data', icon: Database },
  { label: 'AI Analysis', icon: BrainCircuit },
  { label: 'Waste Detected', icon: AlertTriangle },
  { label: 'Equipment ID', icon: Cpu },
  { label: 'AI Explanation', icon: MessageCircle },
  { label: 'Recommendation', icon: Lightbulb },
  { label: 'Optimization', icon: SlidersHorizontal },
  { label: 'Savings', icon: PiggyBank },
]

export default function FlowStrip({ activeIndex = -1, compact = false }) {
  return (
    <div className="panel p-5 overflow-x-auto scrollbar-none">
      <div className="flex items-center min-w-[720px]">
        {STAGES.map((s, i) => {
          const Icon = s.icon
          const isDone = activeIndex >= 0 && i < activeIndex
          const isActive = i === activeIndex
          const lit = activeIndex === -1 || isDone || isActive
          return (
            <div key={s.label} className="flex items-center flex-1 last:flex-none">
              <div className="flex flex-col items-center gap-2 shrink-0">
                <div
                  className={`w-10 h-10 rounded-xl grid place-items-center ring-1 transition-all duration-300 ${
                    isActive
                      ? 'bg-amber-500/15 ring-amber-500/40 text-amber-400 shadow-glow scale-110'
                      : lit
                      ? 'bg-teal-500/10 ring-teal-500/25 text-teal-400'
                      : 'bg-graphite-800 ring-graphite-700 text-mist-700'
                  }`}
                >
                  <Icon size={16} strokeWidth={2} />
                </div>
                {!compact && (
                  <span className={`text-[10.5px] font-medium text-center whitespace-nowrap ${lit ? 'text-mist-300' : 'text-mist-700'}`}>
                    {s.label}
                  </span>
                )}
              </div>
              {i < STAGES.length - 1 && (
                <div className="flex-1 h-px mx-1.5 relative top-[-14px] min-w-[24px]">
                  <div className="w-full h-px bg-graphite-700" />
                  {(isDone || (activeIndex === -1)) && (
                    <div className="absolute inset-0 h-px bg-gradient-to-r from-teal-400/70 to-amber-400/70" />
                  )}
                </div>
              )}
            </div>
          )
        })}
      </div>
    </div>
  )
}
