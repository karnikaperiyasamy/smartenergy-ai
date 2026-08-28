import { useEffect, useState } from 'react'
import { Navigate, Routes, Route } from 'react-router-dom'
import Login from './pages/Login'
import Dashboard from './pages/Dashboard'
import Monitoring from './pages/Monitoring'
import AiAnalysis from './pages/AiAnalysis'
import WasteDetective from './pages/WasteDetective'
import EquipmentHealth from './pages/EquipmentHealth'
import Recommendations from './pages/Recommendations'
import OptimizationCenter from './pages/OptimizationCenter'
import Savings from './pages/Savings'
import Assistant from './pages/Assistant'
import DemoMode from './pages/DemoMode'
import { isAuthConfigured, supabase } from './services/auth'

const APP_ROUTES = [
  ['/dashboard', Dashboard], ['/monitoring', Monitoring], ['/analysis', AiAnalysis],
  ['/waste-detective', WasteDetective], ['/equipment-health', EquipmentHealth],
  ['/recommendations', Recommendations], ['/optimization', OptimizationCenter],
  ['/savings', Savings], ['/assistant', Assistant], ['/demo', DemoMode],
]

function ProtectedRoute({ children }) {
  const [session, setSession] = useState(null)
  const [loading, setLoading] = useState(isAuthConfigured)

  useEffect(() => {
    if (!supabase) return undefined
    supabase.auth.getSession().then(({ data }) => { setSession(data.session); setLoading(false) })
    const { data: listener } = supabase.auth.onAuthStateChange((_event, nextSession) => setSession(nextSession))
    return () => listener.subscription.unsubscribe()
  }, [])

  if (!isAuthConfigured) return children
  if (loading) return <div className="min-h-screen bg-graphite-950" />
  return session ? children : <Navigate to="/" replace />
}

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      {APP_ROUTES.map(([path, Component]) => (
        <Route key={path} path={path} element={<ProtectedRoute><Component /></ProtectedRoute>} />
      ))}
      <Route path="*" element={<Login />} />
    </Routes>
  )
}
