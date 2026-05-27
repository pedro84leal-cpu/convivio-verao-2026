import styles from '../home/home.module.css'
import imagem from '../../images/imagem1.png'
import { useAuth } from '../../context/AuthContext'
import { useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { supabase } from '../../lib/supabase'
import ContadorCircular from '../../components/contadorCircular/contadorCircular'
import kartIcon from '../../images/go-kart.png'
import dinnerIcon from '../../images/christmas-dinner.png'
import locaIcon from '../../images/google-maps.png'



function Home() {
  const { user, updateConfirmation, logout } = useAuth()
  const navigate = useNavigate()
  const [totais, setTotais] = useState({ kart: 0, almoco: 0 })
  const [refresh, setRefresh] = useState(0)

  function handleLogout() {
    logout()
    navigate('/login')
  }

  // 👈 função wrapper que atualiza e depois força o refresh do contador
  async function handleConfirmacao(tipo, valor) {
    await updateConfirmation(tipo, valor)
    setRefresh(prev => prev + 1)
  }

  useEffect(() => {
    async function fetchTotais() {
      const { data } = await supabase
        .from('users')
        .select('kart, almoco')

      if (data) {
        const kart = data.filter(u => u.kart).length
        const almoco = data.filter(u => u.almoco).length
        setTotais({ kart, almoco })
      }
    }
    fetchTotais()
  }, [refresh])

  return (
    <>
      <div className={styles.container}>
        <div className={styles.content}>
          <img src={imagem} alt='hero' className={styles.hero} />

          <div className={styles.header}>
            <p>Olá, <strong>{user?.nome}</strong>!</p>
            <button className={styles.logout} onClick={handleLogout}>Sair</button>
          </div>

          <div className={styles.confirmacoes}>
            <div className={styles.card}>
              <button
                className={user?.kart ? styles.btnAtivo : styles.btn}
                onClick={() => handleConfirmacao('kart', !user?.kart)} // 👈
              >
                {user?.kart ? '❌ Desistir do Kart' : 'Confirmar Kart'}
              </button>
            </div>

            <div className={styles.card}>
              <button
                className={user?.almoco ? styles.btnAtivo : styles.btn}
                onClick={() => handleConfirmacao('almoco', !user?.almoco)} // 👈
              >
                {user?.almoco ? '❌ Desistir do Almoço' : 'Confirmar Almoço'}
              </button>
            </div>
          </div>

          <div className={styles.contadores}>
            <ContadorCircular
              total={totais.kart}
              label="Pilotos"
              icone={<img src={kartIcon} alt="kart" width={60} />}
              cor="#06ff59"
            />
            <ContadorCircular
              total={totais.almoco}
              label="Almoços"
              icone={<img src={dinnerIcon} alt="kart" width={60} />}
              cor="#ae00ff"
            />
          </div>
        </div>
        <a href="https://maps.app.goo.gl/e2f7eYapHXYmf9DHA"
            target="_blank"
            rel="noreferrer"
            className={styles.localizacao}
          >
            <img src={locaIcon} alt="kart" width={40} />
            Ver Localização
        </a>
        <a href="https://maps.app.goo.gl/M3Qx4XhnrCLYD3Nk9"
            target="_blank"
            rel="noreferrer"
            className={styles.localizacao2}
          >
            <img src={locaIcon} alt="kart" width={40} />
            Ver Localização
        </a>
      </div>
    </>
  )
}

export default Home