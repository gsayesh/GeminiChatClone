// import { useEffect } from 'react'
import { useState } from 'react'
import { InputFrame } from './components/InputFrame'
import { Message } from './components/Message'
import './styles/app.scss'
import { ask } from './services/gemini'

type HistoryType = Array<{
  author: string,
  message:string
}>

function App() {
  const [text, setText] = useState('')
  const [history, setHistory] = useState([] as HistoryType)

  async function handleAddMessage() {
    if (text.trim() == '') return 
    const chat = document.getElementById('chat') as HTMLElement
    const prompt = text

    //Resposta do usuario
    const userMessage = {author:'Murilo', message:text}
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
      <div className='chat' id='chat'>
        {history.map(msg => (
          <Message key={history.indexOf(msg)} author={msg.author} message={msg.message}/>
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

export default App
