import { SetStateAction, useContext, useEffect, useState } from 'react'
import YugiohContext from '../context/YugiohContext'
import { Card } from '../types/type'
import ListCards from '../components/ListCards'
import { imgAttribute, typeSpellTrap } from '../components/utils/renderElements'
import useHandleSelect from '../hooks/useHandleSelect'
import useHandleRadio from '../hooks/useHandleRadio'
import useHandleCheckbox from '../hooks/useHandleCheckbox'
import useHandleChange from '../hooks/useHandleChange'
import rankImg from '../images/star-rank.png'
import levelImg from '../images/star-level.png'
import style from './AllCards.module.css'

export default function AllCards() {
  const { cardList } = useContext(YugiohContext)
  const [cards, setCards] = useState<Card[]>([])
  const [filterError, setFilterError] = useState(false)
  const [loading, setLoading] = useState(true)
  const [archetypesState, setArchetypes] = useState([''])
  const filterRace = useHandleSelect('')
  const filterType = useHandleSelect('')
  const filterAtr = useHandleRadio('')
  const filterRankOrLevel = useHandleRadio('')
  const filterLevel = useHandleRadio('')
  const filterArchetype = useHandleSelect('')
  const filterSearch = useHandleCheckbox(false)
  const filterName = useHandleChange('')
  const filterLink = useHandleSelect('')
  const filterSpellTrapType = useHandleRadio('')

  useEffect(() => {
    const cards = cardList
    const archetypes: string[] = [""]

    // A função filteredCards retorna true se algum filtro corresponder
    //Se ambos os filtros não estiverem selecionados, a função retorna true para todas as cartas
    const filteredCards = cards.filter((card: Card) => {
      const raceMatch = filterRace.value ? card.race === filterRace.value : true
      const typeMatch = filterType.value ? card.type.includes(filterType.value) : true
      const attributeMatch = filterAtr.value ? card.attribute === filterAtr.value || filterAtr.value === card.frameType: true
      const filterMonstersRank = filterRankOrLevel.value === 'rank' ? card.type.includes('XYZ') : true
      const filterMonstersLevel = filterRankOrLevel.value === 'level' ? !card.type.includes('XYZ') : true
      if (!archetypes.includes(card.archetype) && card.archetype !== undefined) archetypes.push(card.archetype)
      const filterLevelMatch = filterLevel.value ? card.level === Number(filterLevel.value) : true
      const filterArchetypeMatch = filterArchetype.value ? card.archetype === filterArchetype.value : true
      const filterNameMatch = filterName.value && !filterSearch.value ? card.name.includes(filterName.value) : true
      const filterSearchMatch = filterSearch.value ? card.desc.includes(filterName.value) : true
      const filterLinkMatch = filterLink.value ? card.linkval === Number(filterLink.value) : true
      const filterSpellTrapMatch = filterSpellTrapType.value ? card.race === filterSpellTrapType.value : true
    return raceMatch&&typeMatch&&attributeMatch&&filterMonstersRank&&filterLevelMatch&&filterMonstersLevel&&filterArchetypeMatch&&filterSearchMatch&&filterNameMatch&&filterLinkMatch&&filterSpellTrapMatch
    })
    setCards(filteredCards)
    setArchetypes(archetypes)
    if (filteredCards.length) setLoading(false)
    if (filteredCards.length === 0 && filteredCards) {
      setFilterError(true)
    } else {
      setFilterError(false)
    }
    document.title = 'Yu-Gi-Oh Cards'
  }, [cardList,filterRace.value,filterType.value,filterAtr.value,filterRankOrLevel.value,filterLevel.value,filterArchetype.value,filterSearch.value,filterName.value,filterLink.value,filterSpellTrapType.value])

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

  const handleClearFilters = () => {
    filterArchetype.setValue('')
    filterAtr.setValue('')
    filterLevel.setValue('')
    filterLink.setValue('')
    filterName.setValue('')
    filterRace.setValue('')
    filterRankOrLevel.setValue('')
    filterSearch.setValue(false)
    filterType.setValue('')
    filterSpellTrapType.setValue('')
  };
  
  const races = ["", "Aqua", "Beast", "Cyberse", "Dinosaur", "Divine-Beast", "Dragon", "Fairy", "Fiend", "Fish", "Insect", "Machine", "Plant", "Psychic", "Reptile", "Rock", "Sea Serpent", "Spellcaster", "Thunder", "War Machine", "Warrior", "Winged Beast", "Zombie"];
  const types = ["", "Normal", "Effect", "Fusion", "Ritual", "Synchro", "XYZ", "Pendulum", "Link"]
  const attributes = ["DIVINE", "DARK", "EARTH", "FIRE", "LIGHT", "WATER", "WIND", "spell", "trap"]
  const ranks = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12"]
  const levels = ["12", "11", "10", "9", "8", "7", "6", "5", "4", "3", "2", "1"]
  const links = ['', 1,2,3,4,5,6]
  const typeSpellAndTrap = ["Equip", "Continuous", "Quick-Play", "Field", "Ritual", "Counter"]

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <button className={style.btnClear} onClick={() => handleClearFilters()}>Clear</button>
      <div className={style.containerFilters}>
        <div className={style.containerName}>
          <input 
            type="text"
            value={filterName.value}
            onChange={filterName.handleChange}
            placeholder='Search Name'
          />
          {/* Procura o input no description */}
          {filterName.value && (
              <label htmlFor="search" id='label-search'>
                <input 
                  type="checkbox" 
                  id="search" 
                  checked={filterSearch.value}
                  onChange={filterSearch.handleChange}
                /> Search in Description
              </label>
          )}
        </div>
        {/* Filtra pelas races */}
        <select title='Filter Races' value={filterRace.value} onChange={filterRace.handleChange}>
          {races.sort().map((race) => (
            <option key={race} value={race}>{race ? race : 'select breed'}</option>
          ))}
        </select>
        {/* Filtra pelos types */}
        <select title='Filter Types' value={filterType.value} onChange={filterType.handleChange}>
          {types.map((type) => (
            <option key={type} value={type}>{type ? type : 'select type'}</option>
          ))}
        </select>
        {/* Filtra pelos archetypes */}
        <select title='Filter Archetypes' value={filterArchetype.value} onChange={filterArchetype.handleChange}>
          {archetypesState.sort().map((archetype) => (
            <option key={archetype} value={archetype}>{archetype ? archetype : 'select archetype'}</option>
          ))}
        </select>
        {/* Filtros do tipo radio */}
        <div className={style.containerRadios}>
          {/* Habilita o filtro de rank se type for xyz */}
          {filterType.value === 'XYZ' && (
            <label htmlFor="rank" id='label-rank' className={style.containerRank}>
              <input
                id='rank'
                type="radio"
                value='rank'
                checked={filterRankOrLevel.value === 'rank'}
                onChange={() => console.log('change for rank')}
                onClick={ () => handleRadioClick('rank', filterRankOrLevel.value, filterRankOrLevel.setValue) }
              /> <img src={rankImg} alt="Rank" className={filterRankOrLevel.value === 'rank' ? style.imgFocus : style.imgAll}/>
            </label>
          )}
          {/* Filtra pelo attributes incluindo as spells e traps */}
          {attributes.map((attribute) => (
            <label htmlFor={attribute} key={attribute} id={`label-${attribute}`}>
              <input
                id={attribute}
                type="radio"
                value={attribute}
                checked={filterAtr.value === attribute}
                onChange={() => console.log('change attribute')}
                onClick={ () => handleRadioClick(attribute, filterAtr.value, filterAtr.setValue) }
              />
              <img src={imgAttribute(attribute)} alt={attribute} className={filterAtr.value === attribute ? style.imgFocus : style.imgAll}/>
            </label>
          ))}
          {/* Habilita o filtro de level se type for diferente de xyz e link */}
          {filterType.value !== 'XYZ' && filterType.value !== 'Link' && filterType.value && (
            <label htmlFor="level" className={style.containerLevel} id='label-level'>
              <input
                id='level'
                type="radio"
                value='level'
                checked={filterRankOrLevel.value === 'level'}
                onChange={() => console.log('change for level')}
                onClick={ () => handleRadioClick('level', filterRankOrLevel.value, filterRankOrLevel.setValue) }
              /> <img src={levelImg} alt="Level" className={filterRankOrLevel.value === 'level' ? style.imgFocus : style.imgAll}/>
            </label>
          )}
        </div>
        {/* Filtra pelo rank */}
        {filterRankOrLevel.value === 'rank' && (
          <div className={style.containerRanks}>
            {ranks.map((rank) => (
              <label htmlFor={rank} key={rank} id={`label-${rank}`}>
                <input
                  id={rank}
                  type="radio"
                  value={rank}
                  checked={filterLevel.value === rank}
                  onChange={() => console.log('change rank')}
                  onClick={ () => handleRadioClick(rank, filterLevel.value, filterLevel.setValue) }
                  /> <img src={rankImg} alt="Level" className={filterLevel.value === rank ? style.imgFocus : style.imgAll}/>
              </label>
            ))}
          </div>
        )}
        {/* Filtra pelo level */}
        {filterRankOrLevel.value === 'level' && (
          <div className={style.containerLevels}>
            {levels.map((level) => (
              <label htmlFor={level} key={level} id={`label-${level}`}>
                <input
                  id={level}
                  type="radio"
                  value={level}
                  checked={filterLevel.value === level}
                  onChange={() => console.log('change level')}
                  onClick={ () => handleRadioClick(level, filterLevel.value, filterLevel.setValue) }
                  /> <img src={levelImg} alt="Level" className={filterLevel.value === level ? style.imgFocus : style.imgAll}/>
              </label>
            ))}
          </div>
        )}
        {/* Filtra pelo Link */}
        {filterType.value === 'Link' && (
          <select title='Filter Links' value={filterLink.value} onChange={filterLink.handleChange}>
            {links.map((link, index) => (
              <option key={index} value={link}>{link ? `LINK - ${link}` : 'select link value'}</option>
            ))}
        </select>
        )}
        {/* Filtra traps e spells */}
        {filterAtr.value === 'spell' || filterAtr.value === 'trap' ? (
          <div className={style.containerRadios}>
            {typeSpellAndTrap.map((type) => (
              <label htmlFor={type} key={type} id={`label-${type}`}>
                <input 
                  type="radio" 
                  id={type}
                  value={type}
                  checked={filterSpellTrapType.value === type}
                  onChange={() => console.log('Change spell trap type')}
                  onClick={() => handleRadioClick(type, filterSpellTrapType.value, filterSpellTrapType.setValue)}
                /> <img src={typeSpellTrap(type)} alt="type" className={filterSpellTrapType.value === type ? style.imgFocus : style.imgAll} />
              </label>
            ))}
          </div>
        ) : <div/>}
      </div>
      {/* Mensagem de erro caso os filtros nao retornem null */}
      {filterError && <div>No cards match your filter</div>}
      {/* Componente renderiza lista de cards */}
      <ListCards cards={cards}/>
    </>
  )
}
