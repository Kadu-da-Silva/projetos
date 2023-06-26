import { ReactElement, useEffect, useState } from "react"
import { Card, CardDetails } from "../types/type"
import { URL } from './../services/fetchYugioh';
import YugiohContext from './YugiohContext';

type Props = {
  children: ReactElement
}
const YugiohProvider = ({children}: Props) => {
  const [cardList, setCardList] = useState<Card[]>([])
  const [cardDetails, setCardDetails] = useState<CardDetails[]>([])

  async function fetchYugioh(url: string): Promise<void> {
    const result = await fetch(url)
    const jsonResult = await result.json()
    setCardList(jsonResult.data)
  }

  useEffect(() => {
    fetchYugioh(URL)
  }, [])

  return (
    <YugiohContext.Provider value={{cardList, setCardList, cardDetails, setCardDetails}}>
      {children}
    </YugiohContext.Provider>
  )
}

export default YugiohProvider;