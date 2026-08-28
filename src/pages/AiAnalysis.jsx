import { useState, useRef, useEffect } from 'react'
import { BrainCircuit, Play, CheckCircle2, AlertTriangle, Loader2 } from 'lucide-react'
import Layout from '../components/Layout'
import { DemoBadge, SectionHeader, Pill } from '../components/UI'
import FlowStrip from '../components/FlowStrip'
import { ANALYSIS_STEPS, ANALYSIS_RESULT } from '../data/demoData'

export default function AiAnalysis() {
  const [phase, setPhase] = useState('idle') // idle | running | done
  const [stepIndex, setStepIndex] = useState(-1)
  const timers = useRef([])

  useEffect(() => () => timers.current.forEach(clearTimeout), [])

  function runAnalysis() {
    timers.current.forEach(clearTimeout)
    timers.current = []
    setPhase('running')
    setStepIndex(0)
    ANALYSIS_STEPS.forEach((_, i) => {
      const t = setTimeout(() => setStepIndex(i), i * 650)
      timers.current.push(t)
    })
    const finalT = setTimeout(() => setPhase('done'), ANALYSIS_STEPS.length * 650 + 300)
    timers.current.push(finalT)
  }

  return (
    <Layout title="AI Energy Analysis" subtitle="Run the AI simulation engine against today's demo dataset">
      <div className="flex items-center justify-between mb-5">
        <p className="text-[13px] text-mist-500">Rule-based analysis engine · runs entirely in your browser</p>
        <DemoBadge />
      </div>

      <div className="mb-6">
        <FlowStrip activeIndex={phase === 'idle' ? -1 : phase === 'running' ? 1 : 2} />
      </div>

      <div className="panel p-8 text-center max-w-2xl mx-auto">
        <div className="w-14 h-14 rounded-2xl bg-amber-500/10 ring-1 ring-amber-500/25 grid place-items-center mx-auto mb-4">
          <BrainCircuit size={24} className="text-amber-400" />
        </div>
        <h2 className="font-display font-semibold text-[19px] text-mist-100">AI Energy Analysis</h2>
        <p className="text-[13px] text-mist-500 mt-1.5 max-w-md mx-auto">
          Compares today's simulated readings from all five equipment lines against expected baselines to surface abnormal consumption.
        </p>

        {phase !== 'running' && (
          <button
            onClick={runAnalysis}
            className="mt-6 inline-flex items-center gap-2 bg-gradient-to-r from-amber-500 to-amber-400 text-graphite-950 font-display font-semibold text-[14px] rounded-xl px-6 py-3 hover:brightness-110 transition-all shadow-glow"
          >
            <Play size={16} fill="currentColor" />
            Run AI Analysis
          </button>
        )}

        {phase === 'running' && (
          <div className="mt-7 text-left max-w-sm mx-auto space-y-2.5">
            {ANALYSIS_STEPS.map((step, i) => (
              <div key={step} className={`flex items-center gap-3 text-[13px] transition-opacity duration-300 ${i <= stepIndex ? 'opacity-100' : 'opacity-30'}`}>
                {i < stepIndex ? (
                  <CheckCircle2 size={16} className="text-success shrink-0" />
                ) : i === stepIndex ? (
                  <Loader2 size={16} className="text-amber-400 shrink-0 animate-spin" />
                ) : (
                  <span className="w-4 h-4 rounded-full border border-graphite-600 shrink-0" />
                )}
                <span className={i <= stepIndex ? 'text-mist-100' : 'text-mist-600'}>{step}</span>
              </div>
            ))}
          </div>
        )}

        {phase === 'done' && (
          <div className="mt-7 text-left animate-rise">
            <div className="flex items-center gap-2 justify-center mb-4">
              <CheckCircle2 size={18} className="text-success" />
              <span className="font-display font-semibold text-[15px] text-mist-100">Analysis Complete</span>
            </div>

            <div className="rounded-2xl bg-danger/5 ring-1 ring-danger/25 p-5">
              <div className="flex items-center gap-2 mb-3">
                <AlertTriangle size={17} className="text-danger" />
                <span className="text-[13.5px] font-semibold text-mist-100">Abnormal energy consumption detected</span>
              </div>
              <div className="grid grid-cols-2 gap-3 text-[12.5px]">
                <div>
                  <p className="text-mist-500">Equipment</p>
                  <p className="text-mist-100 font-medium mt-0.5">{ANALYSIS_RESULT.equipment}</p>
                </div>
                <div>
                  <p className="text-mist-500">Deviation</p>
                  <p className="text-danger font-semibold font-mono-num mt-0.5">+{ANALYSIS_RESULT.deviationPct}%</p>
                </div>
                <div>
                  <p className="text-mist-500">Current</p>
                  <p className="text-mist-100 font-mono-num mt-0.5">{ANALYSIS_RESULT.current} kWh/hour</p>
                </div>
                <div>
                  <p className="text-mist-500">Expected</p>
                  <p className="text-mist-100 font-mono-num mt-0.5">{ANALYSIS_RESULT.expected} kWh/hour</p>
                </div>
              </div>
            </div>

            <button
              onClick={runAnalysis}
              className="mt-5 w-full text-center text-[12.5px] text-mist-500 hover:text-mist-100 transition-colors"
            >
              Run analysis again
            </button>
          </div>
        )}
      </div>
    </Layout>
  )
}
