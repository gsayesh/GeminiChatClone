// Estilos css com SASS
import '../styles/message.scss'
// import 'highlight.js/styles/vs.css'
//import 'highlight.js/styles/vs2015.css'

//Imagens
import geminiIcon from '../assets/gemini.png'
// import userIcon from '../assets/user.jpeg'

//Markdown Lib
import markdownit from 'markdown-it'
import mdHighlight from 'markdown-it-highlightjs'
import { useEffect } from 'react'
const md = markdownit().use(mdHighlight)

type MessageProps = {
  author: string,
  authorImage?: string
  message: string
  theme: boolean 
}

export function Message({author, authorImage, message, theme}:MessageProps) {
  //Cria Elemento de link css
  useEffect(() => {
    const link = document.createElement('link')
    link.id = 'css-theme'
    link.rel = 'stylesheet'
    link.type = 'text/css'
    document.head.appendChild(link);
  }, [])

  // Side Effect caso thema mude
  useEffect(() => {
    const link = document.getElementById('css-theme') as any
    link.href = theme ? 'https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.9.0/styles/vs2015.css' : 'https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.9.0/styles/vs.css'
  }, [theme])

  return (
    <div className="message">
      <div className="title">
        <img src={author == "Gemini" ?  geminiIcon : authorImage} alt={author} />
        <span>{author}</span>
      </div>
      <div dangerouslySetInnerHTML={{__html:md.render(message)}}></div>
    </div>
  )
}