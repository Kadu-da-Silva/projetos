import { useContext } from 'react'
import YugiohContext from '../context/YugiohContext'
import { Card } from '../types/type'

import Header from '../components/Header'
import ListCards from '../components/ListCards'

export default function Traps() {
  const { cardList } = useContext(YugiohContext)
  const cards = cardList.filter((card: Card) => card.type.includes('Trap'))

  if (!cardList) {
    return <div>Loading...</div>
  }

  return (
    <>
      <Header />
      <ListCards cards={cards} />
    </>
  )
}
