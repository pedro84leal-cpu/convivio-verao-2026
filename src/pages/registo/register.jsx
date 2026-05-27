import { useState } from 'react'
import { useAuth } from '../../context/AuthContext'
import { useNavigate, Link } from 'react-router-dom'
import styles from '../registo/registo.module.css'

export default function Register() {
  const { register } = useAuth()
  const navigate = useNavigate()
  const [nome, setNome] = useState('')
  const [password, setPassword] = useState('')
  const [erro, setErro] = useState('')

  function handleSubmit(e) {
    e.preventDefault()
    const result = register(nome, password)
    if (result.error) return setErro(result.error)
    navigate('/login')
  }

  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <h1 className={styles.ca}>Convívio verão</h1>
        <h2 className={styles.title}>S_<span>M</span>_I</h2>
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <input
            className={styles.input}
            placeholder="Nome"
            value={nome}
            onChange={e => setNome(e.target.value)}
            required
          />
          <input
            className={styles.input}
            placeholder="Password"
            type="password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            required
          />
          {erro && <p className={styles.erro}>{erro}</p>}
          <button className={styles.button} type="submit">Registar</button>
        </form>
        <p className={styles.link}>
          Já tens conta? <Link to="/login">Entrar</Link>
        </p>
      </div>
    </div>
  )
}
