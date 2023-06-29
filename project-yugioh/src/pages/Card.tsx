import { useContext, useEffect } from 'react';
import YugiohContext from '../context/YugiohContext';
import { useParams } from 'react-router-dom';
import RenderDetails from '../components/RenderDetails';

export default function Card() {
  const {cardList} = useContext(YugiohContext)
  const {id: idRoute} = useParams()

  const card = cardList.find((card) => card.id === Number(idRoute))
  console.log(card);

  useEffect(() => {
    window.scrollTo(0, 0); // Rolagem para o topo da página
    if (!card) {
      document.title = 'Loading...'
    } else {
      document.title = card.name
    }
  }, [card]);
  
  if (!card) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <section>
        {card && <RenderDetails card={card} />}
      </section>
    </>
  );
}