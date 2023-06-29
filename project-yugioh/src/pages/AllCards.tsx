import { SetStateAction, useContext, useEffect, useState } from 'react'
import ListCards from '../components/ListCards'
import YugiohContext from '../context/YugiohContext'
import { Card } from '../types/type'
import { imgAttribute } from '../components/utils/renderElements'
import useHandleSelect from '../hooks/useHandleSelect'
import useHandleRadio from '../hooks/useHandleRadio'

import rankImg from '../images/star-rank.png'
import levelImg from '../images/star-level.png'

import style from './Monster.module.css'

export default function Monsters() {
  const { cardList } = useContext(YugiohContext)
  const [cards, setCards] = useState<Card[]>([])
  const [filterError, setFilterError] = useState(false)
  const [archetypesState, setArchetypes] = useState([''])
  const filterRace = useHandleSelect('')
  const filterType = useHandleSelect('')
  const filterAtr = useHandleRadio('')
  const filterRankOrLevel = useHandleRadio('')
  const filterLevel = useHandleRadio('')
  const filterArchetype = useHandleSelect('')

  useEffect(() => {
    const cards = cardList
    const archetypes: string[] = [""]

    // A função filteredCards retorna true se a raça corresponder ao filtro
    //Se ambos os filtros não estiverem selecionados, a função retorna true para todas as carta
    const filteredCards = cards.filter((card: Card) => {
      const raceMatch = filterRace.value ? card.race === filterRace.value : true
      const typeMatch = filterType.value ? card.type.includes(filterType.value) : true
      const attributeMatch = filterAtr.value ? card.attribute === filterAtr.value || filterAtr.value === card.frameType: true
      const filterMonstersRank = filterRankOrLevel.value === 'rank' ? card.type.includes('XYZ') : true
      const filterMonstersLevel = filterRankOrLevel.value === 'level' ? !card.type.includes('XYZ') : true
      if (!archetypes.includes(card.archetype) && card.archetype !== undefined) archetypes.push(card.archetype)
      const filterLevelMatch = filterLevel.value ? card.level === Number(filterLevel.value) : true
      const archetypeMatch = filterArchetype.value ? card.archetype === filterArchetype.value : true
    return raceMatch && typeMatch && attributeMatch && filterMonstersRank && filterLevelMatch && filterMonstersLevel && archetypeMatch
    })
    setCards(filteredCards)
    setArchetypes(archetypes.sort())

    if (filteredCards.length === 0 && filteredCards) {
      setFilterError(true)
    } else {
      setFilterError(false)
    }
  }, [cardList, filterRace.value, filterType.value, filterAtr.value, filterRankOrLevel.value, filterLevel.value, filterArchetype.value])

  const handleRadioClick = (
      value: string, 
      state: string, 
      setState: { (value: SetStateAction<string>): void; (arg0: string): void }
    ) => {
    if (state === value) {
      // Se o input já estiver selecionado, desmarque-o
      setState("");
    } else {
      // Caso contrário, marque-o com o valor do atributo
      setState(value);
    }
  };

  const handleTwoRadiosClick = (
      value: string, 
      state: string, 
      setState: { (value: SetStateAction<string>): void; (arg0: string): void }, 
      secondSetState: { (value: SetStateAction<string>): void; (arg0: string): void }
    ) => {
    if (state === value) {
      // Se o input já estiver selecionado, desmarque-o
      setState("");
      secondSetState("");
    } else {
      // Caso contrário, marque-o com o valor do atributo
      setState(value);
    }
  };
  
  const races = ["", "Aqua", "Beast", "Cyberse", "Dinosaur", "Divine-Beast", "Dragon", "Fairy", "Fiend", "Fish", "Insect", "Machine", "Plant", "Psychic", "Reptile", "Rock", "Sea Serpent", "Spellcaster", "Thunder", "War Machine", "Warrior", "Winged Beast", "Zombie"];
  const types = ["", "Normal", "Effect", "Fusion", "Ritual", "Synchro", "XYZ", "Pendulum", "Link"]
  const attributes = ["DARK", "DIVINE", "EARTH", "FIRE", "LIGHT", "WATER", "WIND", "spell", "trap"]
  const ranks = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12"]
  const levels = ["12", "11", "10", "9", "8", "7", "6", "5", "4", "3", "2", "1"]
  
  return (
    <>
      <div className={style.containerFilters}>
        <select
          value={filterRace.value}
          onChange={filterRace.handleChange}
          className={style.race}
        >
          {races.map((race) => (
            <option key={race} value={race}>{race ? race : 'select breed'}</option>
          ))}
        </select>
        <select
          value={filterType.value}
          onChange={filterType.handleChange}
          className={style.type}
        >
          {types.map((type) => (
            <option key={type} value={type}>{type ? type : 'select type'}</option>
          ))}
        </select>
        <select
          value={filterArchetype.value}
          onChange={filterArchetype.handleChange}
          className={style.race}
        >
          {archetypesState.map((archetype) => (
            <option key={archetype} value={archetype}>{archetype ? archetype : 'select archetype'}</option>
          ))}
        </select>
        <div className={style.containerAttrs}>
          {filterType.value === 'XYZ' && (
            <label htmlFor="rank" className={style.containerRankLevel}>
              <input
                id='rank'
                type="radio"
                value='rank'
                checked={filterRankOrLevel.value === 'rank'}
                onChange={() => console.log('change for rank')}
                onClick={ () => handleTwoRadiosClick('rank', filterRankOrLevel.value, filterRankOrLevel.setValue, filterLevel.setValue) }
              /> <img src={rankImg} alt="Rank" className={filterRankOrLevel.value === 'rank' ? style.imgLevel : style.imgAll}/>
            </label>
          )}
          {attributes.map((attribute) => (
            <label htmlFor={attribute} key={attribute}>
              <input
                id={attribute}
                type="radio"
                value={attribute}
                checked={filterAtr.value === attribute}
                onChange={() => console.log('change attribute')}
                onClick={ () => handleRadioClick(attribute, filterAtr.value, filterAtr.setValue) }
              />
              <img src={imgAttribute(attribute)} alt={attribute} className={filterAtr.value === attribute ? style.imgAttr : style.imgAll}/>
            </label>
          ))}
          {filterType.value !== 'XYZ' && filterType.value !== 'Link' && filterType.value && (
            <label htmlFor="level" className={style.containerRankLevel}>
              <input
                id='level'
                type="radio"
                value='level'
                checked={filterRankOrLevel.value === 'level'}
                onChange={() => console.log('change for level')}
                onClick={ () => handleTwoRadiosClick('level', filterRankOrLevel.value, filterRankOrLevel.setValue, filterLevel.setValue) }
              /> <img src={levelImg} alt="Level" className={filterRankOrLevel.value === 'level' ? style.imgLevel : style.imgAll}/>
            </label>
          )}
        </div>
        
        {filterRankOrLevel.value === 'rank' && (
          <div className={style.containerRanks}>
            {ranks.map((rank) => (
              <label htmlFor={rank} key={rank}>
                <input
                  id={rank}
                  type="radio"
                  value={rank}
                  checked={filterLevel.value === rank}
                  onChange={() => console.log('change rank')}
                  onClick={ () => handleRadioClick(rank, filterLevel.value, filterLevel.setValue) }
                  /> <img src={rankImg} alt="Level" className={filterLevel.value === rank ? style.imgLevel : style.imgAll}/>
              </label>
            ))}
          </div>
        )}
        {filterRankOrLevel.value === 'level' && (
          <div className={style.containerLevels}>
            {levels.map((level) => (
              <label htmlFor={level} key={level}>
                <input
                  id={level}
                  type="radio"
                  value={level}
                  checked={filterLevel.value === level}
                  onChange={() => console.log('change level')}
                  onClick={ () => handleRadioClick(level, filterLevel.value, filterLevel.setValue) }
                  /> <img src={levelImg} alt="Level" className={filterLevel.value === level ? style.imgLevel : style.imgAll}/>
              </label>
            ))}
          </div>
        )}
      </div>
      {filterError && <div>No cards match your filter</div>}
      <ListCards cards={cards}/>
    </>
  )
}