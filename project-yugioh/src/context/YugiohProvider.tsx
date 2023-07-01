import { ReactElement, useEffect, useState } from "react"
import { Card, User } from "../types/type"
import { URL } from './../services/fetchYugioh';
import YugiohContext from './YugiohContext';

type Props = {
  children: ReactElement
}
const YugiohProvider = ({children}: Props) => {
  const [cardList, setCardList] = useState<Card[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)
  const [user, setUser] = useState<User[]>([])
  

  async function fetchYugioh(url: string): Promise<void> {
    const result = await fetch(url)
    const jsonResult = await result.json()
    setCardList(jsonResult.data)
  }

  useEffect(() => {
    try {
      setLoading(true)
      fetchYugioh(URL)
    } catch (e) {
      setError(true)
      console.log(e);
    } finally {
      setLoading(false)
    }
  }, [])

  return (
    <YugiohContext.Provider value={{cardList, setCardList, loading, error, user, setUser}}>
      {children}
    </YugiohContext.Provider>
  )
}

export default YugiohProvider;