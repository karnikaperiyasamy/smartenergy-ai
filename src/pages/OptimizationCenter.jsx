import { useState } from 'react'
import { SlidersHorizontal, ArrowRight, CheckCircle2, Info } from 'lucide-react'
import Layout from '../components/Layout'
import { DemoBadge, SectionHeader, Modal } from '../components/UI'
import { OPTIMIZATIONS } from '../data/demoData'

export default function OptimizationCenter() {
  const [statuses, setStatuses] = useState(() => Object.fromEntries(OPTIMIZATIONS.map((o) => [o.id, o.status])))
  const [confirming, setConfirming] = useState(null)
  const [justApplied, setJustApplied] = useState(null)

  function confirmApply() {
    setStatuses((s) => ({ ...s, [confirming.id]: 'applied' }))
    setJustApplied(confirming)
    setConfirming(null)
  }

  return (
    <Layout title="Optimization Center" subtitle="Review and apply recommended schedule changes">
      <div className="flex items-center justify-between mb-5">
        <p className="text-[13px] text-mist-500">{OPTIMIZATIONS.length} optimization opportunities</p>
        <DemoBadge />
      </div>

      <div className="rounded-xl bg-teal-500/5 ring-1 ring-teal-500/20 px-4 py-3 mb-6 flex items-start gap-3">
        <Info size={16} className="text-teal-400 shrink-0 mt-0.5" />
        <p className="text-[12.5px] text-mist-400 leading-relaxed">
            simulation — no physical equipment is being controlled. Applying an optimization here only updates the plan shown in this demo.
        </p>
      </div>

      <div className="space-y-4">
        {OPTIMIZATIONS.map((o) => {
          const status = statuses[o.id]
          const applied = status === 'applied'
          return (
            <div key={o.id} className={`panel p-5 md:p-6 transition-opacity ${applied ? 'opacity-90' : ''}`}>
              <div className="flex items-start justify-between gap-4 flex-wrap mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-amber-500/10 ring-1 ring-amber-500/25 grid place-items-center">
                    <SlidersHorizontal size={16} className="text-amber-400" />
                  </div>
                  <div>
                    <h3 className="font-display font-semibold text-[15.5px] text-mist-100">{o.equipment}</h3>
                    <p className="text-[12.5px] text-mist-500">{o.title}</p>
                  </div>
                </div>
                {applied && (
                  <span className="inline-flex items-center gap-1.5 text-[11.5px] font-semibold text-success bg-success/10 ring-1 ring-success/25 rounded-full px-3 py-1">
                    <CheckCircle2 size={13} /> Applied
                  </span>
                )}
              </div>

              <div className="grid sm:grid-cols-2 gap-3 mb-4">
                <div className="rounded-xl bg-graphite-800/60 border border-graphite-700 px-4 py-3">
                  <p className="text-[10.5px] text-mist-500 mb-1">Current schedule</p>
                  <p className="text-[13px] text-mist-300 font-mono-num">{o.currentSchedule}</p>
                </div>
                <div className="rounded-xl bg-teal-500/5 border border-teal-500/25 px-4 py-3">
                  <p className="text-[10.5px] text-teal-400/80 mb-1">Recommended schedule</p>
                  <p className="text-[13px] text-teal-300 font-mono-num">{o.recommendedSchedule}</p>
                </div>
              </div>

              <div className="flex items-center justify-between flex-wrap gap-3">
                <p className="text-[12.5px] text-mist-500">
                  Estimated saving: <span className="text-mist-100 font-medium font-mono-num">{o.savingKwh} kWh</span> ·{' '}
                  <span className="text-mist-100 font-medium font-mono-num">₹{o.savingInr}</span>/month
                </p>
                <button
                  disabled={applied}
                  onClick={() => setConfirming(o)}
                  className={`inline-flex items-center gap-1.5 text-[12.5px] font-semibold rounded-xl px-4 py-2 transition-all ${
                    applied
                      ? 'bg-graphite-700 text-mist-500 cursor-not-allowed'
                      : 'bg-gradient-to-r from-amber-500 to-amber-400 text-graphite-950 hover:brightness-110'
                  }`}
                >
                  {applied ? 'Optimization Applied' : 'Apply Optimization'}
                  {!applied && <ArrowRight size={14} />}
                </button>
              </div>
            </div>
          )
        })}
      </div>

      <Modal open={!!confirming} onClose={() => setConfirming(null)} title="Confirm optimization">
        {confirming && (
          <div className="space-y-4">
            <p className="text-[13px] text-mist-300 leading-relaxed">
              Apply the recommended schedule for <span className="text-mist-100 font-medium">{confirming.equipment}</span>? This creates an optimization plan within the   — no physical equipment is being controlled.
            </p>
            <div className="flex gap-3">
              <button onClick={() => setConfirming(null)} className="flex-1 bg-graphite-700 hover:bg-graphite-600 text-mist-100 text-[13px] font-medium rounded-xl py-2.5 transition-colors">
                Cancel
              </button>
              <button onClick={confirmApply} className="flex-1 bg-gradient-to-r from-amber-500 to-amber-400 text-graphite-950 text-[13px] font-semibold rounded-xl py-2.5 hover:brightness-110 transition-all">
                Confirm
              </button>
            </div>
          </div>
        )}
      </Modal>

      <Modal open={!!justApplied} onClose={() => setJustApplied(null)}>
        {justApplied && (
          <div className="text-center py-2">
            <div className="w-14 h-14 rounded-full bg-success/10 ring-1 ring-success/25 grid place-items-center mx-auto mb-4">
              <CheckCircle2 size={26} className="text-success" />
            </div>
            <h3 className="font-display font-semibold text-[16px] text-mist-100 mb-1">Optimization schedule created.</h3>
            <p className="text-[12.5px] text-mist-500 mb-1">✓ Optimization Plan Applied for {justApplied.equipment}</p>
            <p className="text-[11.5px] text-mist-600 mb-5">  simulation — no physical equipment is being controlled.</p>
            <button onClick={() => setJustApplied(null)} className="w-full bg-graphite-700 hover:bg-graphite-600 text-mist-100 text-[13px] font-medium rounded-xl py-2.5 transition-colors">
              Done
            </button>
          </div>
        )}
      </Modal>
    </Layout>
  )
}
