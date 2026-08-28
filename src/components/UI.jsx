import { FlaskConical } from 'lucide-react'

export function DemoBadge({ label = '     ', className = '' }) {
  return (
    <span className={`demo-badge ${className}`}>
      <FlaskConical size={12} />
      {label}
    </span>
  )
}

export function StatCard({ icon: Icon, label, value, unit, tone = 'amber', trend }) {
  const toneMap = {
    amber: 'text-amber-400 bg-amber-500/10 ring-amber-500/25',
    teal: 'text-teal-400 bg-teal-500/10 ring-teal-500/25',
    success: 'text-success bg-success/10 ring-success/25',
    danger: 'text-danger bg-danger/10 ring-danger/25',
  }
  return (
    <div className="panel p-5 flex flex-col gap-3 animate-rise">
      <div className="flex items-center justify-between">
        <span className="text-[12.5px] font-medium text-mist-500">{label}</span>
        <div className={`w-8 h-8 rounded-lg grid place-items-center ring-1 ${toneMap[tone]}`}>
          <Icon size={15} />
        </div>
      </div>
      <div className="flex items-baseline gap-1.5">
        <span className="font-mono-num text-[26px] font-semibold text-mist-100 leading-none">{value}</span>
        {unit && <span className="text-[12.5px] text-mist-500">{unit}</span>}
      </div>
      {trend && <span className="text-[11.5px] text-mist-500">{trend}</span>}
    </div>
  )
}

export function SectionHeader({ eyebrow, title, description, right }) {
  return (
    <div className="flex items-start justify-between gap-4 flex-wrap mb-5">
      <div>
        {eyebrow && <span className="text-[11px] font-semibold tracking-widest uppercase text-teal-400">{eyebrow}</span>}
        <h2 className="font-display font-semibold text-[19px] text-mist-100 mt-0.5">{title}</h2>
        {description && <p className="text-[13px] text-mist-500 mt-1 max-w-xl">{description}</p>}
      </div>
      {right}
    </div>
  )
}

export function Pill({ children, tone = 'default' }) {
  const toneMap = {
    default: 'bg-graphite-700 text-mist-300',
    high: 'bg-danger/10 text-danger ring-1 ring-danger/25',
    medium: 'bg-amber-500/10 text-amber-400 ring-1 ring-amber-500/25',
    low: 'bg-teal-500/10 text-teal-400 ring-1 ring-teal-500/25',
    success: 'bg-success/10 text-success ring-1 ring-success/25',
  }
  return <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-[11px] font-semibold ${toneMap[tone]}`}>{children}</span>
}

export function Modal({ open, onClose, children, title }) {
  if (!open) return null
  return (
    <div className="fixed inset-0 z-50 grid place-items-center p-4">
      <div className="absolute inset-0 bg-graphite-950/80 backdrop-blur-sm" onClick={onClose} />
      <div className="relative panel w-full max-w-md p-6 animate-rise">
        {title && <h3 className="font-display font-semibold text-[17px] text-mist-100 mb-3">{title}</h3>}
        {children}
      </div>
    </div>
  )
}
