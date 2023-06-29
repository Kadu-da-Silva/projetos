import { SetStateAction, useContext, useEffect, useState } from 'react';
import YugiohContext from '../context/YugiohContext';
import { Card } from '../types/type';

import Header from '../components/Header';
import ListCards from '../components/ListCards'
import useHandleChange from '../hooks/useHandleChange';

import style from './Monster.module.css'
import { imgAttribute } from '../components/utils/renderElements';


export default function Spells() {
  const { cardList } = useContext(YugiohContext)
  const [cards, setCards] = useState<Card[]>([])
  const [filterError, setFilterError] = useState(false)
  const filterRace = useHandleChange('')
  const filterType = useHandleChange('')

  useEffect(() => {
  const cardsSpellsAndTraps = cardList.filter((card: Card) => !card.type.includes('Monster'))

  const filteredCards = cardsSpellsAndTraps.filter((card: Card) => {
    const raceMatch = filterRace.value ? card.race === filterRace.value : true
    const typeMatch = filterType.value ? card.type.includes(filterType.value) : true
    // const attributeMatch = filterAtr.value ? card.attribute === filterAtr.value : true
    // const filterMonstersRank = filterRankOrLevel.value === 'rank' ? card.type.includes('XYZ') : true
    // const filterMonstersLevel = filterRankOrLevel.value === 'level' ? !card.type.includes('XYZ') : true
    // const filterLevelMatch = filterLevel.value ? card.level === Number(filterLevel.value) : true
    return raceMatch && typeMatch
  })
  setCards(filteredCards)

  if (filteredCards.length === 0 && filteredCards) {
    setFilterError(true)
  } else {
    setFilterError(false)
  }
  }, [cardList, filterRace.value, filterType.value])

  if (!cardList) {
    return <div>Loading...</div>
  }

  const handleRadioClick = (value: string, state: string, setState: { (value: SetStateAction<string>): void; (arg0: string): void }) => {
    if (state === value) {
      // Se o input já estiver selecionado, desmarque-o
      setState("");
    } else {
      // Caso contrário, marque-o com o valor do atributo
      setState(value);
    }
  };

  const races = ["", "Normal", "Equip", "Continuous", "Quick-Play", "Field", "Ritual", "Counter"]
  const types = ["", "Trap", "Spell"]

  return (
    <>
      <Header />
      <div className={style.containerFilters}>
        <select
            value={filterRace.value}
            onChange={filterRace.handleChange}
            className={style.race}
          >
            {races.map((race) => (
              <option key={race} value={race}>{race ? race : 'select type'}</option>
            ))}
          </select>
          <div className={style.containerAttrs}>
          {types.map((attribute) => (
            <label htmlFor={attribute} key={attribute}>
              <input
                id={attribute}
                type="radio"
                value={attribute}
                checked={filterType.value === attribute}
                onChange={() => console.log('change attribute')}
                onClick={ () => handleRadioClick(attribute, filterType.value, filterType.setValue) }
              />
              <img src={imgAttribute(attribute)} alt={attribute} className={filterType.value === attribute ? style.imgAttr : style.imgAll}/>
            </label>
          ))}
        </div>
      </div>
      <ListCards cards={cards}/>
      {filterError && <div>No cards match your filter</div>}
    </>
  )
}
