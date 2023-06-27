import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { Card } from '../types/type'

import style from './ListCards.module.css'
import arrowUp from '../images/circle-2-svgrepo-com.svg'
import arrowDown from '../images/circle-2-svgrepo-com (1).svg'

type Props = {
  cards: Card[];
}

export default function ListCards({ cards }: Props) {
  const [itemsToShow, setItemsToShow] = useState(() => {
    const storedItemsToShow = localStorage.getItem('itemsToShow');
    return storedItemsToShow ? parseInt(storedItemsToShow) : 18;
  })
  const [upIsVisible, setUpIsVisible] = useState(false);
  const [downIsVisible, setDownIsVisible] = useState(false);

  useEffect(() => {
    localStorage.setItem('itemsToShow', itemsToShow.toString());
  }, [itemsToShow]);

  useEffect(() => {
    const handleScroll = () => {
      // Exibe o botão quando o usuário rolar além de um certo ponto da página
      const scrollTop = window.scrollY || document.documentElement.scrollTop;
      setUpIsVisible(scrollTop > 1000);
      setDownIsVisible(scrollTop < 1000 && itemsToShow > 20);
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
