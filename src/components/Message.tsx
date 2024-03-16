// Estilos css com SASS
import '../styles/message.scss'
import 'highlight.js/styles/vs.css'

//Imagens
import geminiIcon from '../assets/gemini.png'
import userIcon from '../assets/user.jpeg'

//Markdown Lib
import markdownit from 'markdown-it'
import mdHighlight from 'markdown-it-highlightjs'
const md = markdownit().use(mdHighlight)

type MessageProps = {
    author: string,
    message:string
}

export function Message({author, message}:MessageProps) {
    return (
        <div className="message">
            <div className="title">
                <img src={author == "Gemini" ?  geminiIcon : userIcon} alt={author} />
                <span>{author}</span>
            </div>
            <p>
                <pre dangerouslySetInnerHTML={{__html:md.render(message)}}></pre>
            </p>
        </div>
    )
}