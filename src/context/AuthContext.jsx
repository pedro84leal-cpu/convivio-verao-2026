import { createContext, useContext, useState } from 'react'
import { supabase } from '../lib/supabase'

const AuthContext = createContext()

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    const saved = localStorage.getItem('currentUser')
    return saved ? JSON.parse(saved) : null
  })

async function register(nome, password) {
  const { data: existing } = await supabase
    .from('users')
    .select('id')
    .eq('password', password)
    .maybeSingle() // 👈 usa maybeSingle em vez de single (não dá erro se não encontrar)

  if (existing) return { error: 'Essa password já está em uso.' }

  const { error } = await supabase // 👈 remove o "data" que não é usado
    .from('users')
    .insert([{ nome, password, kart: false, almoco: false }])
    .select()
    .single()

  if (error) return { error: 'Erro ao registar. Tenta novamente.' }

  return { success: true }
}

  async function login(password) {
    const { data, error } = await supabase
      .from('users')
      .select('*')
      .eq('password', password)
      .single()

    if (error || !data) return { error: 'Password incorreta.' }

    setUser(data)
    localStorage.setItem('currentUser', JSON.stringify(data))
    return { success: true }
  }

  function logout() {
    setUser(null)
    localStorage.removeItem('currentUser')
  }

  async function updateConfirmation(tipo, valor) {
    const { error } = await supabase
      .from('users')
      .update({ [tipo]: valor })
      .eq('id', user.id)

    if (error) return { error: 'Erro ao atualizar.' }

    const updatedUser = { ...user, [tipo]: valor }
    setUser(updatedUser)
    localStorage.setItem('currentUser', JSON.stringify(updatedUser))
  }

  return (
    <AuthContext.Provider value={{ user, register, login, logout, updateConfirmation }}>
      {children}
    </AuthContext.Provider>
  )
}
// eslint-disable-next-line react-refresh/only-export-components
export function useAuth() {
  return useContext(AuthContext)
}