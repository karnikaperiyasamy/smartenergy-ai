import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Zap, Mail, Lock, ArrowRight, Gauge, ShieldCheck, UserRound } from 'lucide-react'
import { DEMO_CREDENTIALS } from '../data/demoData'
import { isAuthConfigured, signIn, signUp } from '../services/auth'

export default function Login() {
  const navigate = useNavigate()
  const [email, setEmail] = useState(DEMO_CREDENTIALS.email)
  const [password, setPassword] = useState(DEMO_CREDENTIALS.password)
  const [fullName, setFullName] = useState('')
  const [registering, setRegistering] = useState(false)
  const [busy, setBusy] = useState(false)
  const [notice, setNotice] = useState('')
  const [error, setError] = useState('')

  async function handleSubmit(e) {
    e.preventDefault()
    setError('')
    setNotice('')
    setBusy(true)
    try {
      if (isAuthConfigured) {
        if (registering) {
          const data = await signUp(email, password, fullName)
          if (!data.session) setNotice('Account created. Check your email to confirm your account, then sign in.')
          else navigate('/dashboard')
        } else {
          await signIn(email, password)
          navigate('/dashboard')
        }
      } else if (email === DEMO_CREDENTIALS.email && password === DEMO_CREDENTIALS.password) {
        navigate('/dashboard')
      } else {
        setError('Use the demo credentials shown below, or configure Supabase Auth for real accounts.')
      }
    } catch (authError) {
      setError(authError.message || 'Authentication failed. Please try again.')
    } finally {
      setBusy(false)
    }
  }

  return (
    <div className="min-h-screen bg-graphite-950 flex items-center justify-center p-4 relative overflow-hidden">
      <div className="absolute -top-32 -left-32 w-96 h-96 rounded-full bg-amber-500/10 blur-3xl" />
      <div className="absolute -bottom-32 -right-32 w-96 h-96 rounded-full bg-teal-500/10 blur-3xl" />

      <div className="relative w-full max-w-4xl grid md:grid-cols-2 rounded-3xl overflow-hidden border border-graphite-700 shadow-panel">
        {/* Left visual panel */}
        <div className="hidden md:flex flex-col justify-between p-10 bg-graphite-900 relative">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(245,166,35,0.12),transparent_50%)]" />
          <div className="relative flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-amber-400 to-amber-600 grid place-items-center shadow-glow">
              <Zap size={18} className="text-graphite-950" strokeWidth={2.5} />
            </div>
            <span className="font-display font-bold text-[16px] text-mist-100">SmartEnergy <span className="text-amber-400">AI</span></span>
          </div>

          <div className="relative">
            <h2 className="font-display font-semibold text-[22px] text-mist-100 leading-snug">
              Find the kWh your factory floor doesn't need to spend.
            </h2>
            <p className="text-[13px] text-mist-500 mt-3 leading-relaxed">
              AI-assisted detection walks from raw energy data to a scheduling fix your team can apply this week — built for      manufacturing lines.
            </p>
            <div className="mt-6 flex items-center gap-4 text-[12px] text-mist-500">
              <span className="flex items-center gap-1.5"><Gauge size={14} className="text-teal-400" /> Live-style monitoring</span>
              <span className="flex items-center gap-1.5"><ShieldCheck size={14} className="text-teal-400" /> No hardware required</span>
            </div>
          </div>

          <p className="relative text-[11px] text-mist-700">           — Energy Efficiency Track</p>
        </div>

        {/* Right form panel */}
        <div className="bg-graphite-850 p-8 md:p-10 flex flex-col justify-center">
          <div className="md:hidden flex items-center gap-2.5 mb-8">
            <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-amber-400 to-amber-600 grid place-items-center">
              <Zap size={18} className="text-graphite-950" strokeWidth={2.5} />
            </div>
            <span className="font-display font-bold text-[16px] text-mist-100">SmartEnergy AI</span>
          </div>

          <h1 className="font-display font-semibold text-[21px] text-mist-100">{registering ? 'Create your account' : 'Welcome back'}</h1>
          <p className="text-[13px] text-mist-500 mt-1 mb-7">{isAuthConfigured ? 'Secure access to your energy workspace' : 'Demo access is active until Supabase is configured'}</p>

          <form onSubmit={handleSubmit} className="space-y-4">
            {registering && <div>
              <label className="text-[12px] font-medium text-mist-400 mb-1.5 block">Full name</label>
              <div className="flex items-center gap-2.5 bg-graphite-800 border border-graphite-600 rounded-xl px-3.5 py-2.5 focus-within:border-amber-500/50">
                <UserRound size={16} className="text-mist-500 shrink-0" />
                <input required value={fullName} onChange={(e) => setFullName(e.target.value)} className="bg-transparent outline-none text-[13.5px] text-mist-100 w-full" placeholder="Your name" />
              </div>
            </div>}
            <div>
              <label className="text-[12px] font-medium text-mist-400 mb-1.5 block">Email</label>
              <div className="flex items-center gap-2.5 bg-graphite-800 border border-graphite-600 rounded-xl px-3.5 py-2.5 focus-within:border-amber-500/50">
                <Mail size={16} className="text-mist-500 shrink-0" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="bg-transparent outline-none text-[13.5px] text-mist-100 w-full placeholder:text-mist-700"
                  placeholder="you@company.com"
                />
              </div>
            </div>
            <div>
              <label className="text-[12px] font-medium text-mist-400 mb-1.5 block">Password</label>
              <div className="flex items-center gap-2.5 bg-graphite-800 border border-graphite-600 rounded-xl px-3.5 py-2.5 focus-within:border-amber-500/50">
                <Lock size={16} className="text-mist-500 shrink-0" />
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="bg-transparent outline-none text-[13.5px] text-mist-100 w-full placeholder:text-mist-700"
                  placeholder="••••••••"
                />
              </div>
            </div>

            {error && <p className="text-[12.5px] text-danger">{error}</p>}
            {notice && <p className="text-[12.5px] text-teal-300">{notice}</p>}

            <button
              type="submit"
              className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-amber-500 to-amber-400 text-graphite-950 font-display font-semibold text-[14px] rounded-xl py-3 hover:brightness-110 transition-all shadow-glow"
            >
              {busy ? 'Please wait...' : registering ? 'Create Account' : 'Enter Dashboard'}
              <ArrowRight size={16} />
            </button>
          </form>

          {isAuthConfigured ? <button type="button" onClick={() => { setRegistering(!registering); setError(''); setNotice('') }} className="mt-5 text-[12.5px] text-amber-400 hover:text-amber-300">
            {registering ? 'Already have an account? Sign in' : 'New here? Create an account'}
          </button> : <div className="mt-6 rounded-xl bg-graphite-800/60 border border-graphite-700 px-4 py-3">
            <p className="text-[11px] font-semibold uppercase tracking-wide text-mist-500 mb-1">Demo credentials</p>
            <p className="text-[12.5px] text-mist-300 font-mono-num">{DEMO_CREDENTIALS.email}</p>
            <p className="text-[12.5px] text-mist-300 font-mono-num">{DEMO_CREDENTIALS.password}</p>
          </div>}
        </div>
      </div>
    </div>
  )
}
