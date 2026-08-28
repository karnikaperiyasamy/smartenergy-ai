import { Link } from 'react-router-dom'
import {
  LineChart, Line, AreaChart, Area, BarChart, Bar, XAxis, YAxis, CartesianGrid,
  Tooltip, ResponsiveContainer, Legend,
} from 'recharts'
import { Zap, Gauge, AlertTriangle, PiggyBank, Leaf, Target, ArrowUpRight } from 'lucide-react'
import Layout from '../components/Layout'
import { DemoBadge, StatCard, SectionHeader, Pill } from '../components/UI'
import FlowStrip from '../components/FlowStrip'
import {
  DASHBOARD_SUMMARY, HOURLY_CONSUMPTION, EQUIPMENT_USAGE_SHARE, ANOMALIES, RECOMMENDATIONS,
} from '../data/demoData'

const chartTip = {
  contentStyle: { background: '#171D21', border: '1px solid #2A3438', borderRadius: 10, fontSize: 12.5 },
  labelStyle: { color: '#B7C3CA' },
}

export default function Dashboard() {
  const s = DASHBOARD_SUMMARY
  return (
    <Layout title="Dashboard" subtitle="Facility-wide overview, updated hourly">
      <div className="flex items-center justify-between mb-5">
        <p className="text-[13px] text-mist-500">Shreeji Precision Works · Coimbatore</p>
        <DemoBadge />
      </div>

      <div className="mb-6">
        <FlowStrip />
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-6 gap-4 mb-6">
        <StatCard icon={Zap} label="Today's Consumption" value={s.todayConsumption} unit="kWh" tone="teal" />
        <StatCard icon={Gauge} label="Current Demand" value={s.currentDemand} unit="kW" tone="teal" />
        <StatCard icon={AlertTriangle} label="Energy Wasted" value={s.energyWasted} unit="kWh" tone="danger" />
        <StatCard icon={PiggyBank} label="Potential Savings" value={`₹${s.potentialSavingsInr}`} tone="amber" />
        <StatCard icon={Leaf} label="CO2 Reduction" value={s.co2ReductionKg} unit="kg" tone="success" />
        <StatCard icon={Target} label="Efficiency Score" value={s.efficiencyScore} unit="/100" tone="amber" />
      </div>

      <div className="grid lg:grid-cols-3 gap-5 mb-6">
        <div className="lg:col-span-2 panel p-5">
          <SectionHeader eyebrow="Live Trend" title="Hourly Consumption vs Baseline" description="Actual draw against the expected baseline curve for today." />
          <ResponsiveContainer width="100%" height={260}>
            <AreaChart data={HOURLY_CONSUMPTION}>
              <defs>
                <linearGradient id="actualFill" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#F5A623" stopOpacity={0.35} />
                  <stop offset="100%" stopColor="#F5A623" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid stroke="#1E2629" vertical={false} />
              <XAxis dataKey="hour" tick={{ fontSize: 10.5, fill: '#5C6B75' }} interval={2} axisLine={{ stroke: '#2A3438' }} tickLine={false} />
              <YAxis tick={{ fontSize: 10.5, fill: '#5C6B75' }} axisLine={false} tickLine={false} width={30} />
              <Tooltip {...chartTip} />
              <Area type="monotone" dataKey="actual" name="Actual (kWh)" stroke="#F5A623" fill="url(#actualFill)" strokeWidth={2} />
              <Line type="monotone" dataKey="baseline" name="Baseline (kWh)" stroke="#2DD4BF" strokeDasharray="4 4" dot={false} strokeWidth={1.75} />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        <div className="panel p-5">
          <SectionHeader eyebrow="Breakdown" title="Equipment Energy Usage" description="Share of today's kWh by equipment." />
          <ResponsiveContainer width="100%" height={260}>
            <BarChart data={EQUIPMENT_USAGE_SHARE} layout="vertical" margin={{ left: 8 }}>
              <CartesianGrid stroke="#1E2629" horizontal={false} />
              <XAxis type="number" tick={{ fontSize: 10.5, fill: '#5C6B75' }} axisLine={false} tickLine={false} />
              <YAxis type="category" dataKey="name" tick={{ fontSize: 10.5, fill: '#B7C3CA' }} axisLine={false} tickLine={false} width={80} />
              <Tooltip {...chartTip} />
              <Bar dataKey="value" name="kWh" radius={[0, 6, 6, 0]} fill="#2DD4BF" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="grid lg:grid-cols-2 gap-5">
        <div className="panel p-5">
          <SectionHeader eyebrow="AI Alerts" title="Recent AI Alerts" right={<Link to="/waste-detective" className="text-[12px] text-amber-400 flex items-center gap-1 hover:underline">View all <ArrowUpRight size={13} /></Link>} />
          <div className="space-y-2.5">
            {ANOMALIES.map((a) => (
              <div key={a.id} className="flex items-center justify-between gap-3 rounded-xl bg-graphite-800/60 border border-graphite-700 px-4 py-3">
                <div className="min-w-0">
                  <p className="text-[13px] font-medium text-mist-100 truncate">{a.equipment} — {a.title}</p>
                  <p className="text-[11.5px] text-mist-500 mt-0.5">{a.current} kWh/h vs {a.expected} expected · +{a.deviationPct}%</p>
                </div>
                <Pill tone={a.severity === 'High' ? 'high' : a.severity === 'Medium' ? 'medium' : 'low'}>{a.severity}</Pill>
              </div>
            ))}
          </div>
        </div>

        <div className="panel p-5">
          <SectionHeader eyebrow="Suggested" title="Recent Recommendations" right={<Link to="/recommendations" className="text-[12px] text-amber-400 flex items-center gap-1 hover:underline">View all <ArrowUpRight size={13} /></Link>} />
          <div className="space-y-2.5">
            {RECOMMENDATIONS.slice(0, 3).map((r) => (
              <div key={r.id} className="flex items-center justify-between gap-3 rounded-xl bg-graphite-800/60 border border-graphite-700 px-4 py-3">
                <div className="min-w-0">
                  <p className="text-[13px] font-medium text-mist-100 truncate">{r.title}</p>
                  <p className="text-[11.5px] text-mist-500 mt-0.5">Saves ~{r.savingKwh} kWh · ₹{r.savingInr}/month</p>
                </div>
                <Pill tone={r.priority === 'High' ? 'high' : r.priority === 'Medium' ? 'medium' : 'low'}>{r.priority}</Pill>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Layout>
  )
}
