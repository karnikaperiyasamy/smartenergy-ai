import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

export const isAuthConfigured = Boolean(supabaseUrl && supabaseAnonKey)
export const supabase = isAuthConfigured ? createClient(supabaseUrl, supabaseAnonKey) : null

export async function signIn(email, password) {
  if (!supabase) throw new Error('Supabase Auth is not configured')
  const { data, error } = await supabase.auth.signInWithPassword({ email, password })
  if (error) throw error
  return data
}

export async function signUp(email, password, fullName) {
  if (!supabase) throw new Error('Supabase Auth is not configured')
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: { data: { full_name: fullName } },
  })
  if (error) throw error
  return data
}

export async function signOut() {
  if (supabase) await supabase.auth.signOut()
}
