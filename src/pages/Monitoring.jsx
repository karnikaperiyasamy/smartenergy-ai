import { useMemo, useState } from 'react'
import { AreaChart, Area, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Line, LineChart } from 'recharts'
import Layout from '../components/Layout'
import { DemoBadge, SectionHeader } from '../components/UI'
import { HOURLY_CONSUMPTION, WEEKLY_TREND, EQUIPMENT } from '../data/demoData'

const FILTERS = ['All', 'Motor', 'Compressor', 'HVAC', 'Pump', 'Lighting']

const chartTip = {
  contentStyle: { background: '#171D21', border: '1px solid #2A3438', borderRadius: 10, fontSize: 12.5 },
  labelStyle: { color: '#B7C3CA' },
}

// Deterministic per-equipment-type scaling so filtering visibly changes the charts
const TYPE_SHARE = {
  All: 1,
  Motor: 0.16,
  Compressor: 0.42,
  HVAC: 0.28,
  Pump: 0.08,
  Lighting: 0.11,
}

function scale(data, keys, factor) {
  return data.map((row) => {
    const next = { ...row }
    keys.forEach((k) => { next[k] = Math.round(row[k] * factor * 10) / 10 })
    return next
  })
}

export default function Monitoring() {
  const [filter, setFilter] = useState('All')
  const factor = TYPE_SHARE[filter]

  const hourly = useMemo(() => scale(HOURLY_CONSUMPTION, ['actual', 'baseline'], factor), [factor])
  const weekly = useMemo(() => scale(WEEKLY_TREND, ['consumption', 'baseline'], factor), [factor])

  const daily = useMemo(() => {
    // Derive a simple daily-by-hour-block view from the hourly dataset
    const blocks = [
      { label: 'Night (12–6AM)', hours: hourly.slice(0, 6) },
      { label: 'Morning (6–12PM)', hours: hourly.slice(6, 12) },
      { label: 'Afternoon (12–6PM)', hours: hourly.slice(12, 18) },
      { label: 'Evening (6–12AM)', hours: hourly.slice(18, 24) },
    ]
    return blocks.map((b) => ({
      label: b.label,
      actual: Math.round(b.hours.reduce((s, r) => s + r.actual, 0)),
      baseline: Math.round(b.hours.reduce((s, r) => s + r.baseline, 0)),
    }))
  }, [hourly])

  const equipmentList = filter === 'All' ? EQUIPMENT : EQUIPMENT.filter((e) => e.type === filter)

  return (
    <Layout title="Energy Monitoring" subtitle="Hourly, daily, and weekly consumption views">
      <div className="flex items-center justify-between mb-5 flex-wrap gap-3">
        <div className="flex flex-wrap gap-2">
          {FILTERS.map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`px-3.5 py-1.5 rounded-full text-[12.5px] font-medium transition-colors ${
                filter === f ? 'bg-amber-500/15 text-amber-400 ring-1 ring-amber-500/30' : 'bg-graphite-800 text-mist-400 hover:text-mist-100'
              }`}
            >
              {f}
            </button>
          ))}
        </div>
        <DemoBadge />
      </div>

      <div className="panel p-5 mb-5">
        <SectionHeader eyebrow="Today" title="Hourly Energy Consumption" description={`Showing ${filter === 'All' ? 'all equipment' : filter + ' equipment'} · updates live as you change the filter.`} />
        <ResponsiveContainer width="100%" height={260}>
          <AreaChart data={hourly}>
            <defs>
              <linearGradient id="hourlyFill" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#F5A623" stopOpacity={0.35} />
                <stop offset="100%" stopColor="#F5A623" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid stroke="#1E2629" vertical={false} />
            <XAxis dataKey="hour" tick={{ fontSize: 10.5, fill: '#5C6B75' }} interval={2} axisLine={{ stroke: '#2A3438' }} tickLine={false} />
            <YAxis tick={{ fontSize: 10.5, fill: '#5C6B75' }} axisLine={false} tickLine={false} width={30} />
            <Tooltip {...chartTip} />
            <Area type="monotone" dataKey="actual" name="Actual (kWh)" stroke="#F5A623" fill="url(#hourlyFill)" strokeWidth={2} />
            <Line type="monotone" dataKey="baseline" name="Baseline (kWh)" stroke="#2DD4BF" strokeDasharray="4 4" dot={false} strokeWidth={1.75} />
          </AreaChart>
        </ResponsiveContainer>
      </div>

      <div className="grid lg:grid-cols-2 gap-5 mb-5">
        <div className="panel p-5">
          <SectionHeader eyebrow="Today" title="Daily Energy Consumption" description="Consumption grouped into 6-hour blocks." />
          <ResponsiveContainer width="100%" height={230}>
            <BarChart data={daily}>
              <CartesianGrid stroke="#1E2629" vertical={false} />
              <XAxis dataKey="label" tick={{ fontSize: 9.5, fill: '#5C6B75' }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 10.5, fill: '#5C6B75' }} axisLine={false} tickLine={false} width={30} />
              <Tooltip {...chartTip} />
              <Bar dataKey="actual" name="Actual (kWh)" fill="#F5A623" radius={[6, 6, 0, 0]} />
              <Bar dataKey="baseline" name="Baseline (kWh)" fill="#2A3438" radius={[6, 6, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="panel p-5">
          <SectionHeader eyebrow="7 Days" title="Weekly Energy Trend" description="Daily total consumption for the past week." />
          <ResponsiveContainer width="100%" height={230}>
            <LineChart data={weekly}>
              <CartesianGrid stroke="#1E2629" vertical={false} />
              <XAxis dataKey="day" tick={{ fontSize: 10.5, fill: '#5C6B75' }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 10.5, fill: '#5C6B75' }} axisLine={false} tickLine={false} width={30} />
              <Tooltip {...chartTip} />
              <Line type="monotone" dataKey="consumption" name="Consumption (kWh)" stroke="#F5A623" strokeWidth={2.25} dot={{ r: 3, fill: '#F5A623' }} />
              <Line type="monotone" dataKey="baseline" name="Baseline (kWh)" stroke="#2DD4BF" strokeDasharray="4 4" strokeWidth={1.75} dot={false} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="panel p-5">
        <SectionHeader eyebrow="Equipment" title={`${filter === 'All' ? 'All Equipment' : filter} — Live Snapshot`} />
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {equipmentList.map((e) => (
            <div key={e.id} className="rounded-xl bg-graphite-800/60 border border-graphite-700 px-4 py-3.5">
              <p className="text-[13.5px] font-medium text-mist-100">{e.name}</p>
              <p className="text-[11.5px] text-mist-500 mb-2">{e.zone}</p>
              <div className="flex items-baseline gap-1">
                <span className="font-mono-num text-[18px] font-semibold text-amber-400">{e.energyPerHour}</span>
                <span className="text-[11px] text-mist-500">kWh/hour</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Layout>
  )
}
