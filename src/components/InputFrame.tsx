// import { ask } from '../services/gemini'
import { FormEvent } from 'react'
import '../styles/input-frame.scss'

type InputFrameProps = {
  value: string
  getText: Function
  onSubmit: Function
}

export function InputFrame({value, getText, onSubmit}:InputFrameProps) {

  function handleSubmit (event:FormEvent){
    event.preventDefault()
    onSubmit()
    document.getElementById('text')?.focus()
  }

  return (
    <form id='input-form' onSubmit={handleSubmit}>
      <input 
        type="text" 
        name="text" 
        autoComplete="off"
        id="text"
        value={value}
        spellCheck="false"
        onChange={event => getText(event.target.value)}
      />
      <button type="submit">Enviar</button>
    </form>
  )
}