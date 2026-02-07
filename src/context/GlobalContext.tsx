import { createContext, useState, type Dispatch, type FC, type ReactNode, type SetStateAction } from "react"
import type { UserType } from "../@types/UserType"

interface ContextType{
    token:boolean|{}
    setToken:Dispatch<SetStateAction<boolean|UserType>>
    users:UserType[]
    setUsers:Dispatch<SetStateAction<UserType[]>>
}
export const Context=createContext<ContextType>({} as ContextType)
export const GlobalContext:FC<{children:ReactNode}>=({children})=>{
    const [users, setUsers] = useState([
        {id:1,firstName:"John",lastName:"Doe",email:"john.doe@example.com",password:"password123"}
    ])
    const [token, setToken] = useState<boolean |UserType>(false)
    return(
        <Context.Provider value={{token,setToken,users,setUsers}}>
            {children}
        </Context.Provider>
    )
}
