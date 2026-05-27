import { useEffect, useState, useRef } from 'react'
import styles from './contadorCircular.module.css'

export default function ContadorCircular({ total, label, icone, cor }) {
  const [count, setCount] = useState(0)
  const [animado, setAnimado] = useState(false)
  const timerRef = useRef(null)

  useEffect(() => {
    if (timerRef.current) clearInterval(timerRef.current)

    let start = 0
    const alvo = total
    const duration = 1500
    const increment = alvo / (duration / 16)

    timerRef.current = setInterval(() => {
      start += increment
      if (start >= alvo) {
        setCount(alvo)
        setAnimado(true)
        clearInterval(timerRef.current)
      } else {
        setCount(Math.floor(start))
        setAnimado(false)
      }
    }, 16)

    return () => clearInterval(timerRef.current)
  }, [total])

  const raio = 70
  const circunferencia = 2 * Math.PI * raio
  const progresso = total > 0 ? (count / total) * circunferencia : 0

  return (
    <div className={styles.wrapper}>
      <div className={`${styles.container} ${animado ? styles.glow : ''}`} style={{ '--cor': cor }}>
        <svg width="180" height="180" viewBox="0 0 180 180">
          <circle cx="90" cy="90" r={raio} fill="none" stroke="#222" strokeWidth="12" />
          <circle
            cx="90" cy="90" r={raio}
            fill="none"
            stroke={cor}
            strokeWidth="12"
            strokeLinecap="round"
            strokeDasharray={circunferencia}
            strokeDashoffset={circunferencia - progresso}
            transform="rotate(-90 90 90)"
            className={styles.arco}
          />
        </svg>
        <div className={styles.centro}>
          <span className={styles.icone}>{icone}</span>
          <span className={styles.numero} style={{ color: cor }}>{count}</span>
          <span className={styles.label}>{label}</span>
        </div>
      </div>
    </div>
  )
}