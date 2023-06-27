import { useContext } from 'react'
import Header from '../components/Header'
import ListCards from '../components/ListCards'
import YugiohContext from '../context/YugiohContext'
import { Card } from '../types/type'
import Button from '../components/Button'

export default function Monsters() {
  const { cardList } = useContext(YugiohContext)
  const cards = cardList.filter((card: Card) => card.type.includes('Monster'))
  
  const filterButtons = () => {
    const handleClick = () => {
      console.log('clicou');
      
    }
    return (
      <Button 
        classStyle='button'
        onClick={ handleClick }
        label='teste'
      />
    )
  }
  
  return (
    <>
      <Header />
      {filterButtons()}
      <ListCards cards={cards}/>
    </>
  )
}
