import { useState, useRef, useEffect } from 'react'
import { Send, Bot, User, FlaskConical } from 'lucide-react'
import Layout from '../components/Layout'
import { DemoBadge } from '../components/UI'
import { ASSISTANT_SUGGESTIONS } from '../data/demoData'
import { getAssistantResponse } from '../services/aiSimulation'
import { getGroqAssistantResponse, isGroqConfigured } from '../services/groq'

const INTRO = "Hi, I'm the EnergyAI Assistant. I can answer questions about the current   dataset — try one of the suggestions below or ask your own."

export default function Assistant() {
  const [messages, setMessages] = useState([{ role: 'assistant', text: INTRO }])
  const [input, setInput] = useState('')
  const [typing, setTyping] = useState(false)
  const endRef = useRef(null)

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages, typing])

  function send(text) {
    const q = text.trim()
    if (!q) return
    setMessages((m) => [...m, { role: 'user', text: q }])
    setInput('')
    setTyping(true)
    setTimeout(async () => {
      let response
      try {
        response = isGroqConfigured() ? await getGroqAssistantResponse(q) : getAssistantResponse(q)
      } catch (groqError) {
        response = `I couldn't get a response from Groq: ${groqError.message}. Check your model name, API key, and network connection.`
      }
      setMessages((m) => [...m, { role: 'assistant', text: response }])
      setTyping(false)
    }, 650)
  }

  return (
    <Layout title="AI Assistant" subtitle="EnergyAI Assistant —   Demo">
      <div className="flex items-center justify-between mb-5">
        <span className="inline-flex items-center gap-1.5 text-[12px] text-mist-500">
          <FlaskConical size={13} className="text-amber-400" />
          {isGroqConfigured() ? 'Groq AI connected — grounded in this facility dataset' : 'Demo responder — add a Groq API key for live AI answers'}
        </span>
        {!isGroqConfigured() && <DemoBadge />}
      </div>

      <div className="panel flex flex-col h-[560px] max-w-3xl mx-auto">
        <div className="flex items-center gap-3 px-5 h-14 border-b border-graphite-700 shrink-0">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-teal-400 to-teal-500 grid place-items-center">
            <Bot size={16} className="text-graphite-950" />
          </div>
          <div>
            <p className="text-[13.5px] font-semibold text-mist-100 leading-tight">EnergyAI Assistant</p>
            <p className="text-[11px] text-mist-500 leading-tight">AI Assistant ·   Demo</p>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto p-5 space-y-4 scrollbar-none">
          {messages.map((m, i) => (
            <div key={i} className={`flex gap-2.5 ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
              {m.role === 'assistant' && (
                <div className="w-7 h-7 rounded-lg bg-teal-500/10 ring-1 ring-teal-500/25 grid place-items-center shrink-0">
                  <Bot size={14} className="text-teal-400" />
                </div>
              )}
              <div
                className={`max-w-[78%] rounded-2xl px-4 py-2.5 text-[13px] leading-relaxed ${
                  m.role === 'user'
                    ? 'bg-amber-500/15 text-mist-100 ring-1 ring-amber-500/25 rounded-tr-sm'
                    : 'bg-graphite-800 text-mist-200 ring-1 ring-graphite-700 rounded-tl-sm'
                }`}
              >
                {m.text}
              </div>
              {m.role === 'user' && (
                <div className="w-7 h-7 rounded-lg bg-graphite-700 grid place-items-center shrink-0">
                  <User size={13} className="text-mist-300" />
                </div>
              )}
            </div>
          ))}
          {typing && (
            <div className="flex gap-2.5 justify-start">
              <div className="w-7 h-7 rounded-lg bg-teal-500/10 ring-1 ring-teal-500/25 grid place-items-center shrink-0">
                <Bot size={14} className="text-teal-400" />
              </div>
              <div className="bg-graphite-800 ring-1 ring-graphite-700 rounded-2xl rounded-tl-sm px-4 py-3 flex gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-mist-500 animate-pulseline" style={{ animationDelay: '0ms' }} />
                <span className="w-1.5 h-1.5 rounded-full bg-mist-500 animate-pulseline" style={{ animationDelay: '150ms' }} />
                <span className="w-1.5 h-1.5 rounded-full bg-mist-500 animate-pulseline" style={{ animationDelay: '300ms' }} />
              </div>
            </div>
          )}
          <div ref={endRef} />
        </div>

        <div className="px-5 py-3 border-t border-graphite-700 shrink-0">
          <div className="flex flex-wrap gap-1.5 mb-3">
            {ASSISTANT_SUGGESTIONS.map((q) => (
              <button
                key={q}
                onClick={() => send(q)}
                className="text-[11px] px-2.5 py-1.5 rounded-full bg-graphite-800 text-mist-400 hover:text-amber-400 hover:bg-amber-500/10 transition-colors"
              >
                {q}
              </button>
            ))}
          </div>
          <form
            onSubmit={(e) => { e.preventDefault(); send(input) }}
            className="flex items-center gap-2.5 bg-graphite-800 border border-graphite-600 rounded-xl px-3.5 py-2 focus-within:border-amber-500/50"
          >
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask about your energy data..."
              className="bg-transparent outline-none text-[13px] text-mist-100 w-full placeholder:text-mist-700"
            />
            <button type="submit" className="text-amber-400 hover:text-amber-300 transition-colors shrink-0" aria-label="Send">
              <Send size={17} />
            </button>
          </form>
        </div>
      </div>
    </Layout>
  )
}
