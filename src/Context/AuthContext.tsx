import { ReactNode, createContext, useState } from 'react'

type AuthContextProps = {
    user: UserTypes|null
    setUser: Function
}

type UserTypes = {
    displayName: string
    photoURL: string
}

export const AuthContext = createContext({} as AuthContextProps)

type AuthContextProviderProps = {
    children: ReactNode
}

export function AuthContextProvider(props:AuthContextProviderProps) {
    const [user, setUser] = useState<UserTypes|null>(null)
    return (
        <AuthContext.Provider value={{user, setUser}}>
            {props.children}
        </AuthContext.Provider>
    )
}