import { useState } from 'react'
import { Lightbulb, Zap, IndianRupee, Leaf, ChevronDown, Sparkles, LoaderCircle } from 'lucide-react'
import Layout from '../components/Layout'
import { DemoBadge, Pill } from '../components/UI'
import { RECOMMENDATIONS } from '../data/demoData'
import { generateGroqRecommendations, isGroqConfigured } from '../services/groq'

const priorityTone = { High: 'high', Medium: 'medium', Low: 'low' }

export default function Recommendations() {
  const [openId, setOpenId] = useState(RECOMMENDATIONS[0]?.id ?? null)
  const [recommendations, setRecommendations] = useState(RECOMMENDATIONS)
  const [generating, setGenerating] = useState(false)
  const [error, setError] = useState('')

  async function generateRecommendations() {
    setGenerating(true)
    setError('')
    try {
      const generated = await generateGroqRecommendations()
      setRecommendations(generated)
      setOpenId(generated[0]?.id ?? null)
    } catch (generationError) {
      setError(generationError.message || 'Unable to generate recommendations.')
    } finally {
      setGenerating(false)
    }
  }

  return (
    <Layout title="AI Recommended Actions" subtitle={isGroqConfigured() ? 'Live recommendations grounded in today\'s facility data' : 'Demo suggestions generated from today\'s facility data'}>
      <div className="flex items-center justify-between mb-5">
        <p className="text-[13px] text-mist-500">{recommendations.length} recommendations</p>
        <div className="flex items-center gap-3">
          {!isGroqConfigured() && <DemoBadge />}
          <button
            onClick={generateRecommendations}
            disabled={generating || !isGroqConfigured()}
            title={isGroqConfigured() ? 'Generate recommendations with Groq' : 'Configure VITE_GROQ_API_KEY first'}
            className="inline-flex items-center gap-2 rounded-xl bg-teal-500 px-3.5 py-2 text-[12px] font-semibold text-graphite-950 transition hover:bg-teal-400 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {generating ? <LoaderCircle size={14} className="animate-spin" /> : <Sparkles size={14} />}
            {generating ? 'Generating...' : 'Generate with Groq'}
          </button>
        </div>
      </div>

      {error && <p className="mb-4 rounded-xl border border-danger/30 bg-danger/10 px-4 py-3 text-[12px] text-danger">{error}</p>}

      <div className="space-y-3">
        {recommendations.map((r, i) => {
          const open = openId === r.id
          return (
            <div key={r.id} className="panel overflow-hidden">
              <button
                onClick={() => setOpenId(open ? null : r.id)}
                className="w-full flex items-center justify-between gap-4 p-5 text-left"
              >
                <div className="flex items-center gap-3.5 min-w-0">
                  <div className="w-9 h-9 rounded-lg bg-amber-500/10 ring-1 ring-amber-500/25 grid place-items-center shrink-0 font-mono-num text-[12px] font-bold text-amber-400">
                    {i + 1}
                  </div>
                  <div className="min-w-0">
                    <h3 className="font-display font-semibold text-[15px] text-mist-100 truncate">{r.title}</h3>
                    <p className="text-[12px] text-mist-500 truncate">{r.equipment}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 shrink-0">
                  <Pill tone={priorityTone[r.priority]}>{r.priority}</Pill>
                  <ChevronDown size={17} className={`text-mist-500 transition-transform ${open ? 'rotate-180' : ''}`} />
                </div>
              </button>

              {open && (
                <div className="px-5 pb-5 animate-rise">
                  <div className="border-t border-graphite-700 pt-4 space-y-3.5">
                    <Field label="Problem" value={r.problem} />
                    <Field label="Reason" value={r.reason} />
                    <Field label="Recommended Action" value={r.action} highlight />

                    <div className="grid grid-cols-3 gap-3 pt-1">
                      <StatMini icon={Zap} label="Energy Saving" value={`${r.savingKwh} kWh/mo`} />
                      <StatMini icon={IndianRupee} label="Cost Saving" value={`₹${r.savingInr}/mo`} />
                      <StatMini icon={Leaf} label="CO2 Reduction" value={`${r.co2Kg} kg/mo`} />
                    </div>

                    <button className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-gradient-to-r from-amber-500 to-amber-400 text-graphite-950 font-display font-semibold text-[13px] rounded-xl px-5 py-2.5 hover:brightness-110 transition-all">
                      <Lightbulb size={15} />
                      View Recommendation
                    </button>
                  </div>
                </div>
              )}
            </div>
          )
        })}
      </div>
    </Layout>
  )
}

function Field({ label, value, highlight }) {
  return (
    <div>
      <p className="text-[11px] font-semibold uppercase tracking-wide text-mist-500 mb-1">{label}</p>
      <p className={`text-[13px] leading-relaxed ${highlight ? 'text-amber-300' : 'text-mist-200'}`}>{value}</p>
    </div>
  )
}

function StatMini({ icon: Icon, label, value }) {
  return (
    <div className="rounded-xl bg-graphite-800/60 border border-graphite-700 px-3 py-2.5">
      <span className="flex items-center gap-1.5 text-[10.5px] text-mist-500 mb-1"><Icon size={12} />{label}</span>
      <p className="font-mono-num text-[13px] font-semibold text-mist-100">{value}</p>
    </div>
  )
}
