import { useContext } from 'react'
import Header from '../components/Header'
import ListCards from '../components/ListCards'
import YugiohContext from '../context/YugiohContext'
import { Card } from '../types/type'

export default function Monsters() {
  const { cardList } = useContext(YugiohContext)
  const cards = cardList.filter((card: Card) => card.type.includes('Monster'))
  
  if (!cardList) {
    return <div>Loading...</div>
  }

  return (
    <>
      <Header />
      <ListCards cards={cards}/>
    </>
  )
}
