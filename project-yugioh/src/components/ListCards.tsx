import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { Card } from '../types/type'

import style from './ListCards.module.css'

type Props = {
  cards: Card[];
}

export default function ListCards({ cards }: Props) {
  const [itemsToShow, setItemsToShow] = useState(() => {
    const storedItemsToShow = localStorage.getItem('itemsToShow');
    return storedItemsToShow ? parseInt(storedItemsToShow) : 18;
  })

  useEffect(() => {
    localStorage.setItem('itemsToShow', itemsToShow.toString());
  }, [itemsToShow]);

  return (
    <>
      <section className={style.container}>
        {cards.slice(0, itemsToShow).map(({id, name, card_images}) => (
          <div key={id} className={style.card}>
            <Link to={`/card/${id}`} target="_blank">
              {card_images.map(({image_url}) => (
                <img src={image_url} alt={name} />
              ))}
            </Link>
          </div>
        ))}
      </section>
      {itemsToShow < cards.length && (
        <button onClick={() => setItemsToShow(itemsToShow + 18)}>
          Mostrar Mais
        </button>
      )}
    </>
  )
}
