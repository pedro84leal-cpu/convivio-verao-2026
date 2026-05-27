import { useState } from 'react'
import { useAuth } from '../../context/AuthContext'
import { useNavigate, Link } from 'react-router-dom'
import styles from './login.module.css'

export default function Login() {
  const { login } = useAuth()
  const navigate = useNavigate()
  const [password, setPassword] = useState('')
  const [erro, setErro] = useState('')

  function handleSubmit(e) {
    e.preventDefault()
    const result = login(password)
    if (result.error) return setErro(result.error)
    navigate('/')
  }

  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <h1 className={styles.ca}>Convívio verão</h1>
        <h2 className={styles.title}>S_<span>M</span>_I</h2>
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <input
            className={styles.input}
            placeholder="Password"
            type="password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            required
          />
          {erro && <p className={styles.erro}>{erro}</p>}
          <button className={styles.button} type="submit">Entrar</button>
        </form>
        <p className={styles.link}>
          Ainda não tens conta? <Link to="/register">Registar</Link>
        </p>
      </div>
    </div>
  )
}