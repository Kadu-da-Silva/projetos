import { useContext, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { Card } from '../types/type'
import YugiohContext from '../context/YugiohContext'

import style from './ListCards.module.css'
import arrowUp from '../images/circle-2-svgrepo-com.svg'
import arrowDown from '../images/circle-2-svgrepo-com (1).svg'
import blackHeart from '../images/black-heart.svg'
import whiteHeart from '../images/white-heart.svg'

type Props = {
  cards: Card[];
}

export default function ListCards({ cards }: Props) {
  const [itemsToShow, setItemsToShow] = useState((105))
  // const [loading, setLoading] = useState(false);
  const [upIsVisible, setUpIsVisible] = useState(false);
  const [downIsVisible, setDownIsVisible] = useState(false);
  
  const { favorites, setFavorites } = useContext(YugiohContext)

  useEffect(() => {
    const handleScroll = () => {
      const { scrollTop, scrollHeight, clientHeight  } = document.documentElement;

      // Verifica se o usuário chegou ao pé da página
      const isAtBottom = scrollTop + clientHeight >= scrollHeight;

      // Ajusta a quantidade de itens com base no valor de scrollTop
      // const newItemsToShow = Math.round(scrollTop / 100) + 100; --- Muito Bug

      if (isAtBottom) setItemsToShow(itemsToShow + 15);
      if (scrollTop === 0) setItemsToShow(105)

      setUpIsVisible(scrollTop > 1000);
      setDownIsVisible(scrollTop < 1000 && itemsToShow > 30);
    };

    // Adiciona um listener para o evento de scroll
    window.addEventListener('scroll', handleScroll);

    // Remove o listener quando o componente for desmontado
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [itemsToShow]);

  const scrollToTop = () => {
    // Faz o scroll suave para o topo da página
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  const scrollToBottom = () => {
    // Faz o scroll suave para o final da página
    window.scrollTo({
      top: document.documentElement.scrollHeight,
      behavior: 'smooth',
    });
  };

  const handleFavoriteToggle = (card: Card) => {
    if (isFavorite(card)) {
      const updatedFavorites = favorites.filter((favoriteCard) => favoriteCard.id !== card.id);
      setFavorites(updatedFavorites);
    } else {
      setFavorites([...favorites, card]);
    }
  };

  const isFavorite = (card: Card) => {
    return favorites.some((favoriteCard) => favoriteCard.id === card.id);
  };
  
  return (
    <>
      {cards.length > itemsToShow 
      ? <span className={style.cardsLength}>{`${itemsToShow} / ${cards.length}`}</span>
      : <span className={style.cardsLength}>{`${cards.length} / ${cards.length}`}</span>
      }
      <section className={style.container}>
        {cards.slice(0, itemsToShow).map((card) => (
          <div key={card.id} className={style.card}>
            <Link to={`/card/${card.id}`} target="_blank">
              <img key={card.id} src={card.card_images[0].image_url} alt={card.name} />
            </Link>
            <button className={style.btnFavorite} onClick={() => handleFavoriteToggle(card)}>
              {isFavorite(card)
                ? <img src={blackHeart} alt="Desfavoritar" />
                : <img src={whiteHeart} alt="Favoritar" />
              }
            </button>
          </div>
        ))}
      </section>
      <button
        onClick={scrollToTop}
        className={`${upIsVisible ? style.btnVisible : style.btnHidden}`}
      >
        <img src={arrowUp} alt="" />
      </button>
      <button
        onClick={scrollToBottom}
        className={`${downIsVisible ? style.btnVisible : style.btnHidden}`}
      >
        <img src={arrowDown} alt="" />
      </button>
    </>
  )
}
