import { DASHBOARD_SUMMARY, EQUIPMENT, HOURLY_CONSUMPTION, ORG, RECOMMENDATIONS } from '../data/demoData'

const GROQ_ENDPOINT = 'https://api.groq.com/openai/v1/chat/completions'
const GROQ_MODEL = import.meta.env.VITE_GROQ_MODEL || 'openai/gpt-oss-120b'

function getApiKey() {
  return import.meta.env.VITE_GROQ_API_KEY
}

function buildEnergyContext() {
  return JSON.stringify({
    organization: ORG,
    summary: DASHBOARD_SUMMARY,
    equipment: EQUIPMENT,
    hourlyConsumption: HOURLY_CONSUMPTION,
    existingRecommendations: RECOMMENDATIONS,
  })
}

async function askGroq(messages, options = {}) {
  const apiKey = getApiKey()
  if (!apiKey) throw new Error('Missing VITE_GROQ_API_KEY')

  const response = await fetch(GROQ_ENDPOINT, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      model: GROQ_MODEL,
      temperature: options.temperature ?? 0.2,
      max_tokens: options.maxTokens ?? 700,
      messages,
    }),
  })

  if (!response.ok) {
    const error = await response.json().catch(() => ({}))
    throw new Error(error.error?.message || `Groq request failed (${response.status})`)
  }

  const data = await response.json()
  return data.choices?.[0]?.message?.content?.trim() || 'Groq returned an empty response.'
}

export async function getGroqAssistantResponse(question) {
  return askGroq([
    {
      role: 'system',
      content: `You are EnergyAI, a practical energy-efficiency assistant for a small manufacturing unit. Answer only using the supplied facility data. Explain calculations briefly, distinguish measured facts from recommendations, and never claim to control physical equipment. If the question is unrelated to energy or this facility, say what you can help with. Keep answers under 180 words. Facility data: ${buildEnergyContext()}`,
    },
    { role: 'user', content: question },
  ])
}

export async function generateGroqRecommendations() {
  const response = await askGroq([
    {
      role: 'system',
      content: `You are an industrial energy analyst. Use only the supplied facility data and return exactly a JSON array of 4 recommendation objects. Each object must contain: title, equipment, problem, reason, action, priority (High, Medium, or Low), savingKwh (number), savingInr (number), co2Kg (number). Do not invent sensors, prices, or equipment. Estimate conservatively from the provided tariff and usage. Facility data: ${buildEnergyContext()}`,
    },
    { role: 'user', content: 'Generate prioritized, practical energy-saving recommendations for this facility.' },
  ], { maxTokens: 1200 })

  const json = response.replace(/^```json\s*|\s*```$/g, '')
  const recommendations = JSON.parse(json)
  if (!Array.isArray(recommendations) || recommendations.length === 0) {
    throw new Error('Groq returned an invalid recommendation list')
  }
  return recommendations.map((recommendation, index) => ({
    ...recommendation,
    id: `groq-rec-${index + 1}`,
  }))
}

export function isGroqConfigured() {
  return Boolean(getApiKey())
}