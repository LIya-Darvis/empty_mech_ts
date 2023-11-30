import { createContext, useContext } from "react"

export type GlobalContent = {
  copy: string | null
  setCopy:(c: string) => void
}

export const MyGlobalContext = createContext<GlobalContent>({
    copy: 'default',
    setCopy: () => {},
})



export const useGlobalContext = () => useContext(MyGlobalContext)
