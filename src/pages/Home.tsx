// import { useEffect } from 'react'
import { useEffect, useState } from 'react'
import { InputFrame } from '../components/InputFrame'
import { Message } from '../components/Message'
import '../styles/home.scss'
import { ask } from '../services/gemini'
import { useAuth } from '../hook/useAuth'
import { useNavigate } from 'react-router-dom'

type HistoryType = Array<{
  author: string,
  authorImage?:string
  message: string
}>

export function Home() {
  const navigate = useNavigate()
  const { user } = useAuth()
  const displayName = user?.displayName as string
  const photoURL = user?.photoURL as string
  console.log(user)

  useEffect(() => {
    if (!user) {
      navigate('/login')
    }
  })
  
  const [darkmode, setDarkmode] = useState(false)
  const [text, setText] = useState('')
  const [history, setHistory] = useState([] as HistoryType)

  //darkmode
  useEffect(() => {
    const body = document.body
    darkmode ? body?.classList.add('darkmode') : body?.classList.remove('darkmode')  
  }, [darkmode])

  async function handleAddMessage() {
    if (text.trim() == '') return 
    const chat = document.getElementById('chat') as HTMLElement
    const prompt = text

    //Resposta do usuario
    const userMessage = {author:displayName, authorImage:photoURL, message:text}
    setHistory([...history, userMessage])
    setText('')

    //Movimentando Scroll para baixo
    setTimeout(() => {chat.scrollTop = chat.scrollHeight}, 100)

    //Resposta do Gemini
    const response = await ask(prompt)
    const geminiMessage = {author:'Gemini', message:response}
    setHistory([...history, userMessage, geminiMessage])

    //Movimentando Scroll para baixo
    setTimeout(() => {chat.scrollTop = chat.scrollHeight}, 100)
  }

  return (
    <main>
      <button 
        type="button" 
        className='darkmode-btn' 
        onClick={() => {setDarkmode(!darkmode)}}
      >
        {darkmode ? "LightMode" : "Darkmode"}
      </button>
      <div className='chat' id='chat'>
        {history.map(msg => (
          <Message theme={darkmode} key={history.indexOf(msg)} author={msg.author} authorImage={msg.authorImage} message={msg.message}/>
        ))}
      </div> 

      <InputFrame
        getText={setText}
        onSubmit={handleAddMessage}
        value={text}
      />
    </main>
  )
}