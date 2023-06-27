import { useContext, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { Card } from '../types/type'
import YugiohContext from '../context/YugiohContext'

import style from './ListCards.module.css'
import { renderImage } from './utils/renderElements'

type Props = {
  propType: string;
}

export default function ListCards({ propType }: Props) {
  const { cardList } = useContext(YugiohContext)
  const [itemsToShow, setItemsToShow] = useState(() => {
    const storedItemsToShow = localStorage.getItem('itemsToShow');
    return storedItemsToShow ? parseInt(storedItemsToShow) : 18;
  })

  useEffect(() => {
    localStorage.setItem('itemsToShow', itemsToShow.toString());
  }, [itemsToShow]);

  const card = cardList.filter((card: Card) => card.type.includes(propType))

  if (!cardList) {
    return <div>Loading...</div>
  }

  return (
    <>
      <section className={style.container}>
        {card.slice(0, itemsToShow).map(({id, name, card_images}) => (
          <div key={id} className={style.card}>
            <Link to={`/card/${id}`} target="_blank">
            <img src={renderImage(card_images)} alt={name} />
            </Link>
          </div>
        ))}
      </section>
      {itemsToShow < card.length && (
          <button onClick={() => setItemsToShow(itemsToShow + 18)}>
            Mostrar Mais
          </button>
      )}
    </>
  )
}
