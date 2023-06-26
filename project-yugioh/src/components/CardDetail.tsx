import { useContext, useEffect } from 'react';
import YugiohContext from '../context/YugiohContext';
import { useParams } from 'react-router-dom';
import { CardDetails } from '../types/type';
import RenderMonster from './RenderMonster';

export default function CardDetail() {
  const {cardList} = useContext(YugiohContext)
  const {id: idRoute} = useParams()

  useEffect(() => {
    window.scrollTo(0, 0); // Rolagem para o topo da página
  }, []);
  
  const card = cardList.find((card:CardDetails) => card.id === Number(idRoute))

  if (!card) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <section>
        {card && <RenderMonster card={card} />}
      </section>
    </>
  );
}