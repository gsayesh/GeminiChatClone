import { GoogleGenerativeAI } from '@google/generative-ai'

const genAI = new GoogleGenerativeAI(import.meta.env.VITE_API_KEY_GEMINI as string)
const model = genAI.getGenerativeModel({model: "gemini-pro"})
const chat = model.startChat({})

export async function ask(prompt: string){
    // const result = await model.generateContent(prompt)
    const result = await chat.sendMessage(prompt)
    const response = await result.response
    const text = response.text()
    return text
}