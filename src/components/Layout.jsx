import { NavLink, useNavigate } from 'react-router-dom'
import {
  LayoutDashboard, Activity, BrainCircuit, Search, HeartPulse,
  Lightbulb, SlidersHorizontal, TrendingUp, MessageSquareText,
  PlayCircle, Zap, LogOut, Bell,
} from 'lucide-react'
import { ORG } from '../data/demoData'
import { signOut } from '../services/auth'

const NAV = [
  { to: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { to: '/monitoring', label: 'Energy Monitoring', icon: Activity },
  { to: '/analysis', label: 'AI Energy Analysis', icon: BrainCircuit },
  { to: '/waste-detective', label: 'Waste Detective', icon: Search },
  { to: '/equipment-health', label: 'Equipment Health', icon: HeartPulse },
  { to: '/recommendations', label: 'AI Recommendations', icon: Lightbulb },
  { to: '/optimization', label: 'Optimization Center', icon: SlidersHorizontal },
  { to: '/savings', label: 'Savings & Impact', icon: TrendingUp },
  { to: '/assistant', label: 'AI Assistant', icon: MessageSquareText },
  { to: '/demo', label: 'Demo Mode', icon: PlayCircle },
]

export default function Layout({ children, title, subtitle }) {
  const navigate = useNavigate()

  return (
    <div className="min-h-screen flex bg-graphite-950">
      {/* Sidebar */}
      <aside className="hidden md:flex md:w-64 shrink-0 flex-col border-r border-graphite-700 bg-graphite-900/80 backdrop-blur">
        <div className="flex items-center gap-2 px-5 h-16 border-b border-graphite-700">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-amber-400 to-amber-600 grid place-items-center shadow-glow shrink-0">
            <Zap size={17} className="text-graphite-950" strokeWidth={2.5} />
          </div>
          <span className="font-display font-bold text-[15px] tracking-tight text-mist-100">SmartEnergy <span className="text-amber-400">AI</span></span>
        </div>
        <nav className="flex-1 overflow-y-auto py-4 px-3 space-y-1 scrollbar-none">
          {NAV.map(({ to, label, icon: Icon }) => (
            <NavLink
              key={to}
              to={to}
              className={({ isActive }) =>
                `group flex items-center gap-3 px-3 py-2.5 rounded-xl text-[13.5px] font-medium transition-colors ${
                  isActive
                    ? 'bg-amber-500/10 text-amber-400 ring-1 ring-amber-500/25'
                    : 'text-mist-300 hover:text-mist-100 hover:bg-graphite-800'
                }`
              }
            >
              <Icon size={17} strokeWidth={2} className="shrink-0" />
              <span className="truncate">{label}</span>
            </NavLink>
          ))}
        </nav>
        <div className="p-3 border-t border-graphite-700">
          <button
            onClick={async () => { await signOut(); navigate('/') }}
            className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-[13.5px] font-medium text-mist-500 hover:text-danger hover:bg-danger/10 transition-colors"
          >
            <LogOut size={17} />
            Log out
          </button>
        </div>
      </aside>

      {/* Main */}
      <div className="flex-1 flex flex-col min-w-0">
        <header className="h-16 shrink-0 border-b border-graphite-700 bg-graphite-900/60 backdrop-blur flex items-center justify-between px-4 md:px-8">
          <div className="min-w-0">
            <h1 className="font-display font-semibold text-[17px] text-mist-100 truncate">{title}</h1>
            {subtitle && <p className="text-[12.5px] text-mist-500 truncate">{subtitle}</p>}
          </div>
          <div className="flex items-center gap-4 shrink-0">
            <span className="hidden lg:inline-flex items-center gap-1.5 text-[11.5px] text-mist-500">
              <span className="w-1.5 h-1.5 rounded-full bg-success animate-pulseline" />
              {ORG.name}
            </span>
            <button className="relative text-mist-400 hover:text-mist-100 transition-colors" aria-label="Notifications">
              <Bell size={18} />
              <span className="absolute -top-1 -right-1 w-3.5 h-3.5 rounded-full bg-amber-500 text-graphite-950 text-[9px] font-bold grid place-items-center">3</span>
            </button>
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-teal-400 to-teal-500 grid place-items-center text-graphite-950 font-display font-bold text-[12px]">
              SP
            </div>
          </div>
        </header>
        <nav className="md:hidden flex gap-1.5 overflow-x-auto px-4 py-2.5 border-b border-graphite-700 bg-graphite-900/60 scrollbar-none">
          {NAV.map(({ to, label, icon: Icon }) => (
            <NavLink
              key={to}
              to={to}
              className={({ isActive }) =>
                `flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[12px] font-medium whitespace-nowrap shrink-0 ${
                  isActive ? 'bg-amber-500/15 text-amber-400 ring-1 ring-amber-500/30' : 'text-mist-400 bg-graphite-800'
                }`
              }
            >
              <Icon size={13} />
              {label}
            </NavLink>
          ))}
        </nav>
        <main className="flex-1 min-w-0 p-4 md:p-8">{children}</main>
      </div>
    </div>
  )
}
