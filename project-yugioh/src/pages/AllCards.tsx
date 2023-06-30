import { SetStateAction, useContext, useEffect, useState } from 'react'
import YugiohContext from '../context/YugiohContext'
import { Card } from '../types/type'
import ListCards from '../components/ListCards'
import { imgAttribute } from '../components/utils/renderElements'
import useHandleSelect from '../hooks/useHandleSelect'
import useHandleRadio from '../hooks/useHandleRadio'
import useHandleCheckbox from '../hooks/useHandleCheckbox'
import useHandleChange from '../hooks/useHandleChange'
import style from './AllCards.module.css'
import { arrayArchetypes, attributes, levels, links, races, spells, traps, types } from '../data/arrays'
import filter from '../components/utils/filter'

export default function AllCards() {
  const { cardList } = useContext(YugiohContext)
  const [cards, setCards] = useState<Card[]>([])
  const [filterError, setFilterError] = useState(false)
  const [loading, setLoading] = useState(true)
  const filterRace = useHandleSelect('')
  const filterType = useHandleSelect('')
  const filterAtr = useHandleRadio('')
  const filterRankOrLevel = useHandleRadio('')
  const filterLevel = useHandleSelect('')
  const filterArchetype = useHandleSelect('')
  const filterSearch = useHandleCheckbox(false)
  const filterName = useHandleChange('')
  const filterLink = useHandleSelect('')
  const filterSpellTrapType = useHandleSelect('')

  useEffect(() => {
    const filters = {
      filterArchetype: filterArchetype.value,
      filterAtr: filterAtr.value,
      filterLevel: filterLevel.value,
      filterLink: filterLink.value,
      filterName: filterName.value,
      filterRace: filterRace.value,
      filterSpellTrapType: filterSpellTrapType.value,
      filterType: filterType.value
    }

    const filteredCards = filter(cardList, filters, filterSearch.value)

    setCards(filteredCards)
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

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <div className={style.containerFilters}>
        <div className={style.containerName}>
          <input 
            type="text"
            value={filterName.value}
            onChange={filterName.handleChange}
            placeholder='Search for Name'
          />
          {/* Procura o input no description */}
          {filterName.value && (
              <label htmlFor="search" id='label-search'>
                <input 
                  type="checkbox" 
                  id="search" 
                  checked={filterSearch.value}
                  onChange={filterSearch.handleChange}
                /> Search for Name in Description
              </label>
          )}
        </div>
        {/* Filtra pelas races */}
        <select title='Filter Races' value={filterRace.value} onChange={filterRace.handleChange}>
          {races.sort().map((race) => (
            <option key={race} value={race}>{race ? race : 'Select Breed'}</option>
          ))}
        </select>
        {/* Filtra pelos types */}
        <select title='Filter Types' value={filterType.value} onChange={filterType.handleChange}>
          {types.map((type) => (
            <option key={type} value={type}>{type ? type : 'Select Type'}</option>
          ))}
        </select>
        {/* Filtra pelos archetypes */}
        <select title='Filter Archetypes' value={filterArchetype.value} onChange={filterArchetype.handleChange}>
          {arrayArchetypes(cardList).map((archetype) => (
            <option key={archetype} value={archetype}>{archetype ? archetype : 'Select Archetype'}</option>
          ))}
        </select>
        {/* Filtros do tipo radio */}
        <div className={style.containerRadios}>
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
        </div>
        {/* Filtra pelo level */}
        {filterType.value && filterType.value !== 'Link' && (
          <select title='Filter Levels' value={filterLevel.value} onChange={filterLevel.handleChange}>
            {levels.map((level, index) => (
              <option key={index} value={level}>{level ? `Level - ${level}` : 'Select Level'}</option>
            ))}
          </select>
        )}
        {/* Filtra pelo link */}
        {filterType.value === 'Link' && (
          <select title='Filter Links' value={filterLink.value} onChange={filterLink.handleChange}>
            {links.map((link, index) => (
              <option key={index} value={link}>{link ? `LINK - ${link}` : 'Select Link'}</option>
            ))}
          </select>
        )}
        {/* Filtra spells */}
        {filterAtr.value === 'spell' && (
          <select title='Filter Spells' value={filterSpellTrapType.value} onChange={filterSpellTrapType.handleChange}>
            {spells.map((type, index) => (
              <option key={index} value={type}>{type ? type : 'Select Type'}</option>
            ))}
          </select>
        )}
        {/* Filtra traps */}
        {filterAtr.value === 'trap' && (
          <select title='Filter Spells' value={filterSpellTrapType.value} onChange={filterSpellTrapType.handleChange}>
            {traps.map((type, index) => (
              <option key={index} value={type}>{type ? type : 'Select Type'}</option>
            ))}
          </select>
        )}
      </div>
      {/* Limpar filtros habilitado ao selecionar os selects de subtipos */}
      {/* Mensagem de erro caso os filtros nao retornem null */}
      {filterName.value || filterLevel.value || filterSpellTrapType.value || filterLink.value ? (
        <button className={style.btnClear} onClick={() => handleClearFilters()}>Clean Filters</button>
      ) : <div/>}
      {filterError && <h2>No cards match your filter</h2>}
      {/* Componente renderiza lista de cards */}
      <ListCards cards={cards}/>
    </>
  )
}
