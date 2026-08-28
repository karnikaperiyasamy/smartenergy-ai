import { AreaChart, Area, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts'
import { Zap, IndianRupee, Leaf, TrendingUp } from 'lucide-react'
import Layout from '../components/Layout'
import { DemoBadge, StatCard, SectionHeader } from '../components/UI'
import { SAVINGS_IMPACT, MONTHLY_BEFORE_AFTER, MONTHLY_SAVINGS_PROJECTION } from '../data/demoData'

const chartTip = {
  contentStyle: { background: '#171D21', border: '1px solid #2A3438', borderRadius: 10, fontSize: 12.5 },
  labelStyle: { color: '#B7C3CA' },
}

export default function Savings() {
  const s = SAVINGS_IMPACT
  return (
    <Layout title="Savings & Impact" subtitle="Estimated results from applying AI recommendations">
      <div className="flex items-center justify-between mb-5">
        <p className="text-[13px] text-mist-500">Estimated /   Results</p>
        <DemoBadge />
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <StatCard icon={Zap} label="Energy Saved" value={s.energySavedKwh} unit="kWh" tone="teal" />
        <StatCard icon={IndianRupee} label="Estimated Cost Saved" value={`₹${s.costSavedInr}`} tone="amber" />
        <StatCard icon={Leaf} label="CO2 Reduction" value={s.co2ReductionKg} unit="kg" tone="success" />
        <StatCard icon={TrendingUp} label="Efficiency Improvement" value={`${s.efficiencyImprovementPct}%`} tone="amber" />
      </div>

      <div className="panel p-5 mb-6">
        <SectionHeader eyebrow="Estimated /   Results" title="Monthly Consumption — Before vs After Optimization" description="Projected effect of applying AI recommendations across the past 6 months." />
        <ResponsiveContainer width="100%" height={280}>
          <AreaChart data={MONTHLY_BEFORE_AFTER}>
            <defs>
              <linearGradient id="beforeFill" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#5C6B75" stopOpacity={0.3} />
                <stop offset="100%" stopColor="#5C6B75" stopOpacity={0} />
              </linearGradient>
              <linearGradient id="afterFill" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#2DD4BF" stopOpacity={0.35} />
                <stop offset="100%" stopColor="#2DD4BF" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid stroke="#1E2629" vertical={false} />
            <XAxis dataKey="month" tick={{ fontSize: 11, fill: '#5C6B75' }} axisLine={false} tickLine={false} />
            <YAxis tick={{ fontSize: 10.5, fill: '#5C6B75' }} axisLine={false} tickLine={false} width={40} />
            <Tooltip {...chartTip} />
            <Legend wrapperStyle={{ fontSize: 12 }} />
            <Area type="monotone" dataKey="before" name="Before (kWh)" stroke="#5C6B75" fill="url(#beforeFill)" strokeWidth={2} />
            <Area type="monotone" dataKey="after" name="After (kWh)" stroke="#2DD4BF" fill="url(#afterFill)" strokeWidth={2} />
          </AreaChart>
        </ResponsiveContainer>
      </div>

      <div className="panel p-5">
        <SectionHeader eyebrow="Projection" title="Monthly Savings Projection" description="Estimated cost savings if current recommendations remain applied." />
        <ResponsiveContainer width="100%" height={260}>
          <LineChart data={MONTHLY_SAVINGS_PROJECTION}>
            <CartesianGrid stroke="#1E2629" vertical={false} />
            <XAxis dataKey="month" tick={{ fontSize: 11, fill: '#5C6B75' }} axisLine={false} tickLine={false} />
            <YAxis tick={{ fontSize: 10.5, fill: '#5C6B75' }} axisLine={false} tickLine={false} width={50} />
            <Tooltip {...chartTip} formatter={(v) => [`₹${v}`, 'Projected Saving']} />
            <Line type="monotone" dataKey="projectedSavingInr" name="Projected Saving (₹)" stroke="#F5A623" strokeWidth={2.5} dot={{ r: 4, fill: '#F5A623' }} />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </Layout>
  )
}
