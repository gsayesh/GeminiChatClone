import geminiTitle from '../assets/gemini-title-logo.png'
import googleLogo from '../assets/google-logo.svg'
import '../styles/login.scss'
import { signInWithGoogle } from '../services/firebase'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../hook/useAuth'



export function Login() {
  const { setUser } = useAuth()
  const navigate = useNavigate()
  async function handleLogin() {
    const user = await signInWithGoogle()
    if (!user) return
    setUser(user)
    navigate('/')
  }

  return (
    <div className="login-page">

      <img src={geminiTitle} alt="Gemini"/>

      <button className="login-google-button" onClick={handleLogin}>
        <img src={googleLogo} alt="Logo do Google"/>
        Login com o Google
      </button>

      <p id='footer'>* Isso é uma copia para fins educativos *</p>
    </div>
)
}