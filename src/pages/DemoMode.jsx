import { useState, useRef, useEffect } from 'react'
import { Play, RotateCcw, CheckCircle2, Loader2, Zap, IndianRupee, Leaf } from 'lucide-react'
import Layout from '../components/Layout'
import { DemoBadge } from '../components/UI'
import FlowStrip from '../components/FlowStrip'
import { DEMO_STEPS, DEMO_RESULT } from '../data/demoData'

const STEP_MS = 900

export default function DemoMode() {
  const [phase, setPhase] = useState('idle') // idle | running | done
  const [stepIndex, setStepIndex] = useState(-1)
  const timers = useRef([])

  useEffect(() => () => timers.current.forEach(clearTimeout), [])

  function start() {
    timers.current.forEach(clearTimeout)
    timers.current = []
    setPhase('running')
    setStepIndex(0)
    DEMO_STEPS.forEach((_, i) => {
      const t = setTimeout(() => setStepIndex(i), i * STEP_MS)
      timers.current.push(t)
    })
    const finalT = setTimeout(() => setPhase('done'), DEMO_STEPS.length * STEP_MS + 400)
    timers.current.push(finalT)
  }

  function reset() {
    timers.current.forEach(clearTimeout)
    timers.current = []
    setPhase('idle')
    setStepIndex(-1)
  }

  const flowActiveIndex = phase === 'idle' ? -1 : phase === 'done' ? 8 : Math.min(3 + Math.floor(stepIndex / 2), 7)

  return (
    <Layout title="Live AI Energy Efficiency Demo" subtitle="A guided walkthrough of the full detection-to-savings flow">
      <div className="flex items-center justify-between mb-5">
        <p className="text-[13px] text-mist-500">Designed for a 3–5 minute walkthrough</p>
        <DemoBadge />
      </div>

      <div className="mb-6">
        <FlowStrip activeIndex={flowActiveIndex} />
      </div>

      <div className="panel p-8 max-w-2xl mx-auto text-center">
        {phase === 'idle' && (
          <>
            <div className="w-16 h-16 rounded-2xl bg-amber-500/10 ring-1 ring-amber-500/25 grid place-items-center mx-auto mb-5">
              <Play size={26} className="text-amber-400" fill="currentColor" />
            </div>
            <h2 className="font-display font-semibold text-[20px] text-mist-100">Ready to run the demo</h2>
            <p className="text-[13px] text-mist-500 mt-2 max-w-md mx-auto">
              Walks through data collection, AI detection, explanation, recommendation, and savings — end to end, using the  's simulated dataset.
            </p>
            <button
              onClick={start}
              className="mt-7 inline-flex items-center gap-2.5 bg-gradient-to-r from-amber-500 to-amber-400 text-graphite-950 font-display font-bold text-[16px] rounded-2xl px-8 py-4 hover:brightness-110 transition-all shadow-glow"
            >
              <Play size={20} fill="currentColor" />
              Start Demo
            </button>
          </>
        )}

        {phase === 'running' && (
          <div className="text-left">
            <p className="text-[12px] font-semibold uppercase tracking-widest text-teal-400 mb-5 text-center">Running Demo</p>
            <div className="space-y-3">
              {DEMO_STEPS.map((step, i) => (
                <div
                  key={step.id}
                  className={`flex items-start gap-3 rounded-xl px-4 py-3 transition-all duration-300 ${
                    i === stepIndex ? 'bg-amber-500/10 ring-1 ring-amber-500/25' : i < stepIndex ? 'opacity-70' : 'opacity-25'
                  }`}
                >
                  {i < stepIndex ? (
                    <CheckCircle2 size={17} className="text-success shrink-0 mt-0.5" />
                  ) : i === stepIndex ? (
                    <Loader2 size={17} className="text-amber-400 shrink-0 mt-0.5 animate-spin" />
                  ) : (
                    <span className="w-[17px] h-[17px] rounded-full border border-graphite-600 shrink-0 mt-0.5" />
                  )}
                  <div>
                    <p className={`text-[13.5px] font-medium ${i <= stepIndex ? 'text-mist-100' : 'text-mist-600'}`}>
                      Step {step.id}: {step.title}
                    </p>
                    {i <= stepIndex && <p className="text-[12px] text-mist-500 mt-0.5">{step.detail}</p>}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {phase === 'done' && (
          <div className="animate-rise">
            <div className="w-14 h-14 rounded-full bg-success/10 ring-1 ring-success/25 grid place-items-center mx-auto mb-4">
              <CheckCircle2 size={26} className="text-success" />
            </div>
            <h2 className="font-display font-semibold text-[19px] text-mist-100">Energy Optimization Analysis Complete</h2>

            <div className="grid grid-cols-2 gap-3 mt-6">
              <div className="rounded-xl bg-graphite-800/60 border border-graphite-700 px-4 py-4">
                <p className="text-[11px] text-mist-500 mb-1">Before</p>
                <p className="font-mono-num text-[22px] font-semibold text-mist-100">{DEMO_RESULT.beforeKwh} <span className="text-[12px] text-mist-500">kWh/day</span></p>
              </div>
              <div className="rounded-xl bg-teal-500/5 border border-teal-500/25 px-4 py-4">
                <p className="text-[11px] text-teal-400/80 mb-1">After Optimization</p>
                <p className="font-mono-num text-[22px] font-semibold text-teal-300">{DEMO_RESULT.afterKwh} <span className="text-[12px] text-teal-400/70">kWh/day</span></p>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-3 mt-3">
              <ResultStat icon={Zap} label="Potential Saving" value={`${DEMO_RESULT.savingKwh} kWh/day`} tone="teal" />
              <ResultStat icon={IndianRupee} label="Cost Saving" value={`₹${DEMO_RESULT.savingInr}/day`} tone="amber" />
              <ResultStat icon={Leaf} label="CO2 Reduction" value={`${DEMO_RESULT.co2Kg} kg`} tone="success" />
            </div>

            <p className="text-[11px] text-mist-600 mt-5">Simulated   Results — based on demo dataset, not live metering.</p>

            <button
              onClick={reset}
              className="mt-6 inline-flex items-center gap-2 text-[13px] font-medium text-mist-400 hover:text-mist-100 transition-colors"
            >
              <RotateCcw size={15} />
              Run demo again
            </button>
          </div>
        )}
      </div>
    </Layout>
  )
}

function ResultStat({ icon: Icon, label, value, tone }) {
  const toneMap = {
    teal: 'text-teal-400 bg-teal-500/10 ring-teal-500/25',
    amber: 'text-amber-400 bg-amber-500/10 ring-amber-500/25',
    success: 'text-success bg-success/10 ring-success/25',
  }
  return (
    <div className="rounded-xl bg-graphite-800/60 border border-graphite-700 px-3 py-3.5">
      <div className={`w-7 h-7 rounded-lg grid place-items-center ring-1 mx-auto mb-2 ${toneMap[tone]}`}>
        <Icon size={13} />
      </div>
      <p className="text-[10px] text-mist-500 mb-0.5">{label}</p>
      <p className="font-mono-num text-[13px] font-semibold text-mist-100">{value}</p>
    </div>
  )
}
