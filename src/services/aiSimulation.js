// ============================================================
// SmartEnergy AI —   AI Simulation Engine
// Runs entirely in the browser. This is NOT a trained machine
// learning model and is NOT connected to any external LLM API.
// It applies simple, explainable rules to the demo dataset so
// the product flow can be demonstrated without a backend.
// ============================================================

import { EQUIPMENT, ANOMALIES, RECOMMENDATIONS, HOURLY_CONSUMPTION, ORG } from '../data/demoData'

const DEVIATION_THRESHOLD = 1.2 // current > expected * 1.2 => anomaly
const LOW_PRODUCTION_HOURS = ['13:00', '14:00']

/**
 * analyzeEnergy(data)
 * Walks the equipment list and flags any unit whose current draw
 * exceeds its expected draw by more than the deviation threshold.
 */
export function analyzeEnergy(equipment = EQUIPMENT) {
  return equipment.map((e) => {
    const ratio = e.energyPerHour / e.expectedPerHour
    const isAnomaly = ratio > DEVIATION_THRESHOLD
    return {
      ...e,
      deviationPct: Math.round((ratio - 1) * 100),
      isAnomaly,
    }
  })
}

/**
 * detectWaste(data)
 * For each anomalous unit, estimates monthly wasted energy and cost,
 * and attaches a plain-language, clearly-labeled "possible cause"
 * rather than asserting a definite physical diagnosis.
 */
export function detectWaste(equipment = EQUIPMENT) {
  const analyzed = analyzeEnergy(equipment)
  return analyzed
    .filter((e) => e.isAnomaly)
    .map((e) => {
      const hourlyWaste = e.energyPerHour - e.expectedPerHour
      const monthlyWasteKwh = Math.round(hourlyWaste * 26) // ~26 operating days/month
      return {
        equipmentId: e.id,
        equipment: e.name,
        current: e.energyPerHour,
        expected: e.expectedPerHour,
        deviationPct: e.deviationPct,
        monthlyWasteKwh,
        monthlyCostInr: Math.round(monthlyWasteKwh * ORG.tariff),
        severity: e.deviationPct >= 40 ? 'High' : e.deviationPct >= 15 ? 'Medium' : 'Low',
      }
    })
}

/**
 * generateRecommendation(wasteItem)
 * Applies a small rule set: equipment operating through the
 * low-production window gets a scheduling recommendation.
 */
export function generateRecommendation(wasteItem) {
  const runsDuringLowProduction = LOW_PRODUCTION_HOURS.every((h) => {
    const row = HOURLY_CONSUMPTION.find((r) => r.hour === h)
    return row && row.actual > row.baseline
  })

  if (runsDuringLowProduction) {
    return {
      action: `Reduce or pause ${wasteItem.equipment} operation during the low-production window (1 PM – 3 PM).`,
      basis: 'Rule: equipment active while facility-wide load sits below baseline for 2+ consecutive hours.',
    }
  }
  return {
    action: `Review ${wasteItem.equipment}'s duty cycle against production schedule for further tuning.`,
    basis: 'Rule: deviation detected without a clear low-production overlap.',
  }
}

/**
 * predictEnergy(history)
 * A simple frontend projection: takes the trailing average deviation
 * and applies it forward. Explicitly a "  Prediction" — not
 * a trained ML forecast.
 */
export function predictEnergy(history = HOURLY_CONSUMPTION) {
  const totalActual = history.reduce((s, r) => s + r.actual, 0)
  const totalBaseline = history.reduce((s, r) => s + r.baseline, 0)
  const avgDeviation = (totalActual - totalBaseline) / totalBaseline
  const nextDayProjection = Math.round(totalBaseline * (1 + avgDeviation * 0.6))
  return {
    label: '  Prediction',
    projectedKwh: nextDayProjection,
    method: 'Trailing 24-hour deviation applied to baseline (simple frontend calculation).',
  }
}

// ---- AI Assistant rule-based responder --------------------------
const KB = [
  {
    match: /high|why.*consumption|expensive/i,
    respond: () => {
      const w = detectWaste()[0]
      return w
        ? `Based on the current   data, ${w.equipment} has the highest abnormal consumption. It is using approximately ${w.deviationPct}% more energy than its expected level. The recommended action is to reduce operation during low-production periods.`
        : 'No abnormal consumption is currently flagged in the demo dataset.'
    },
  },
  {
    match: /waste|wastes the most|worst/i,
    respond: () => {
      const w = detectWaste().sort((a, b) => b.monthlyWasteKwh - a.monthlyWasteKwh)[0]
      return `${w.equipment} wastes the most energy in this dataset — about ${w.monthlyWasteKwh} kWh/month, roughly ₹${w.monthlyCostInr}/month at the demo tariff of ₹${ORG.tariff}/kWh.`
    },
  },
  {
    match: /bill|reduce.*electricity|lower.*cost/i,
    respond: () => {
      const total = RECOMMENDATIONS.reduce((s, r) => s + r.savingInr, 0)
      return `Applying all current AI recommendations could save an estimated ₹${total}/month in this  . The highest-impact step is rescheduling Compressor 02 around the 1–3 PM low-production window.`
    },
  },
  {
    match: /efficiency score|how efficient/i,
    respond: () => 'The current facility efficiency score in this   is 82/100, based on simulated equipment performance and consumption-versus-baseline data.',
  },
  {
    match: /how much.*save|savings|potential saving/i,
    respond: () => 'Based on the demo dataset, the facility could save an estimated 82 kWh and ₹780 today, projecting to roughly 12.7% efficiency improvement if recommendations are applied.',
  },
  {
    match: /optimize first|which equipment should/i,
    respond: () => 'Compressor 02 should be optimized first — it shows the largest deviation from expected consumption (+42%) and the highest potential monthly savings in this dataset.',
  },
]

export function getAssistantResponse(question) {
  const hit = KB.find((k) => k.match.test(question))
  if (hit) return hit.respond()
  return "This   assistant recognizes a focused set of demo questions. Try asking about high consumption, which equipment wastes the most energy, your efficiency score, or how to reduce your bill."
}
