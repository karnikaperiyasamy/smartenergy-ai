import Layout from '../components/Layout'
import { DemoBadge, SectionHeader, Pill } from '../components/UI'
import { EQUIPMENT, STATUS_STYLES } from '../data/demoData'
import { HeartPulse, Zap, Clock, Gauge } from 'lucide-react'

function RingScore({ value, size = 56 }) {
  const stroke = 5
  const r = (size - stroke) / 2
  const c = 2 * Math.PI * r
  const offset = c - (value / 100) * c
  const color = value >= 85 ? '#4ADE80' : value >= 65 ? '#F5A623' : '#EF5350'
  return (
    <svg width={size} height={size} className="shrink-0 -rotate-90">
      <circle cx={size / 2} cy={size / 2} r={r} stroke="#2A3438" strokeWidth={stroke} fill="none" />
      <circle
        cx={size / 2} cy={size / 2} r={r} stroke={color} strokeWidth={stroke} fill="none"
        strokeDasharray={c} strokeDashoffset={offset} strokeLinecap="round"
        style={{ transition: 'stroke-dashoffset 0.6s ease' }}
      />
      <text x="50%" y="50%" transform={`rotate(90 ${size / 2} ${size / 2})`} textAnchor="middle" dominantBaseline="central" fontSize="13" fontWeight="700" fill="#E8EDF0" fontFamily="JetBrains Mono">
        {value}
      </text>
    </svg>
  )
}

export default function EquipmentHealth() {
  return (
    <Layout title="Equipment Health" subtitle="Simulated health and efficiency by equipment line">
      <div className="flex items-center justify-between mb-5">
        <p className="text-[13px] text-mist-500">{EQUIPMENT.length} equipment lines monitored</p>
        <DemoBadge />
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {EQUIPMENT.map((e) => {
          const style = STATUS_STYLES[e.status]
          return (
            <div key={e.id} className="panel p-5">
              <div className="flex items-start justify-between gap-3 mb-4">
                <div>
                  <h3 className="font-display font-semibold text-[15px] text-mist-100">{e.name}</h3>
                  <p className="text-[11.5px] text-mist-500">{e.zone}</p>
                </div>
                <RingScore value={e.health} />
              </div>

              <div className={`inline-flex items-center gap-1.5 text-[11px] font-semibold px-2.5 py-1 rounded-full mb-4 ${style.bg} ${style.color} ring-1 ${style.ring}`}>
                <span className={`w-1.5 h-1.5 rounded-full ${style.dot}`} />
                {e.status}
              </div>

              <div className="space-y-2.5">
                <Row icon={Gauge} label="Efficiency" value={`${e.efficiency}%`} />
                <Row icon={Zap} label="Energy Consumption" value={`${e.energyPerHour} kWh/h`} />
                <Row icon={Clock} label="Operating Hours" value={`${e.operatingHours} h/day`} />
              </div>

              <div className="mt-4 h-1.5 rounded-full bg-graphite-700 overflow-hidden">
                <div
                  className="h-full rounded-full"
                  style={{ width: `${e.efficiency}%`, background: e.efficiency >= 80 ? '#4ADE80' : e.efficiency >= 60 ? '#F5A623' : '#EF5350' }}
                />
              </div>
              <p className="text-[10.5px] text-mist-600 mt-1.5">Efficiency vs rated capacity</p>
            </div>
          )
        })}
      </div>
    </Layout>
  )
}

function Row({ icon: Icon, label, value }) {
  return (
    <div className="flex items-center justify-between text-[12.5px]">
      <span className="flex items-center gap-1.5 text-mist-500"><Icon size={13} /> {label}</span>
      <span className="font-mono-num font-medium text-mist-100">{value}</span>
    </div>
  )
}
