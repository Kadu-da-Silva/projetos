import { useContext, useEffect, useState } from 'react'
import YugiohContext from '../context/YugiohContext'
import { Card } from '../types/type'
import ListCards from '../components/ListCards'
import { imgAttribute } from '../components/utils/renderElements'
import useHandleChange from '../hooks/useHandleChange'
import style from './AllCards.module.css'
import { arrayArchetypes, attributes, levels, links, races, spells, traps, types } from '../data/arrays'
import filter from '../components/utils/filter'
import Header from '../components/Header'

export default function AllCards() {
  const { cardList } = useContext(YugiohContext)
  const [cards, setCards] = useState<Card[]>([])
  const [filterError, setFilterError] = useState(false)
  const [loading, setLoading] = useState(true)
  const [filterRace, setFilterRace] = useHandleChange("")
  const [filterType, setFilterType] = useHandleChange("")
  const [filterAtr, setFilterAtr] = useHandleChange("")
  const [filterLevel, setFilterLevel] = useHandleChange("")
  const [filterArch, setFilterArch] = useHandleChange("")
  const [filterName, setFilterName] = useHandleChange("")
  const [filterLink, setFilterLink] = useHandleChange("")
  const [filterSpellTrapType, setFilterST] = useHandleChange("")
  const [filterSearch, setFilterSearch] = useHandleChange(false)

  useEffect(() => {
    const filters = {
      filterArchetype: filterArch,
      filterAtr: filterAtr,
      filterLevel: filterLevel,
      filterLink: filterLink,
      filterName: filterName,
      filterRace: filterRace,
      filterSpellTrapType: filterSpellTrapType,
      filterType: filterType
    }

    const filteredCards = filter(cardList, filters, filterSearch)
    setCards(filteredCards)

    if (filteredCards.length) setLoading(false)

    if (filteredCards.length === 0 && filteredCards) {
      setFilterError(true)
    } else {
      setFilterError(false)
    }

    document.title = 'Yu-Gi-Oh Cards'

  }, [cardList,filterRace,filterType,filterAtr,filterLevel,filterArch,filterSearch,filterName,filterLink,filterSpellTrapType])

  const handleRadioClick = (value: string) => {
    if (filterAtr === value) {
      // Se o input já estiver selecionado, desmarque-o
      setFilterAtr("");
    } else {
      // Caso contrário, marque-o com o valor do atributo
      setFilterAtr(value);
    }
  };

  const handleClearFilters = () => {
    setFilterArch("")
    setFilterAtr("")
    setFilterLevel("")
    setFilterLink("")
    setFilterName("")
    setFilterRace("")
    setFilterSearch(false)
    setFilterType("")
    setFilterST("")
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <Header/>
      <div className={style.containerFilters}>
        <div className={style.containerName}>
          <input 
            type="text"
            value={filterName}
            onChange={(e) => setFilterName(e.target.value)}
            placeholder='Search for Name'
          />
          {/* Procura o input no description */}
          {filterName && (
              <label htmlFor="search" id='label-search'>
                <input 
                  type="checkbox" 
                  id="search" 
                  checked={filterSearch}
                  onChange={(e) => setFilterSearch(e.target.checked)}
                /> Search for Name in Description
              </label>
          )}
        </div>
        {/* Filtra pelas races */}
        <select title='Filter Races' value={filterRace} onChange={(e) => setFilterRace(e.target.value)}>
          {races.sort().map((race) => (
            <option key={race} value={race}>{race ? race : 'Select Breed'}</option>
          ))}
        </select>
        {/* Filtra pelos types */}
        <select title='Filter Types' value={filterType} onChange={(e) => setFilterType(e.target.value)}>
          {types.map((type) => (
            <option key={type} value={type}>{type ? type : 'Select Type'}</option>
          ))}
        </select>
        {/* Filtra pelos archetypes */}
        <select title='Filter Archetypes' value={filterArch} onChange={(e) => setFilterArch(e.target.value)}>
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
                onClick={ () => handleRadioClick(attribute) }
              />
              <img src={imgAttribute(attribute)} alt={attribute} className={filterAtr === attribute ? style.imgFocus : style.imgAll}/>
            </label>
          ))}
        </div>
        {/* Filtra pelo level */}
        {filterType && filterType !== 'Link' && (
          <select title='Filter Levels' value={filterLevel} onChange={(e) => setFilterLevel(e.target.value)}>
            {levels.map((level, index) => (
              <option key={index} value={level}>{level ? `Level - ${level}` : 'Select Level'}</option>
            ))}
          </select>
        )}
        {/* Filtra pelo link */}
        {filterType === 'Link' && (
          <select title='Filter Links' value={filterLink} onChange={(e) => setFilterLink(e.target.value)}>
            {links.map((link, index) => (
              <option key={index} value={link}>{link ? `LINK - ${link}` : 'Select Link'}</option>
            ))}
          </select>
        )}
        {/* Filtra spells */}
        {filterAtr === 'spell' && (
          <select title='Filter Spells' value={filterSpellTrapType} onChange={(e) => setFilterST(e.target.value)}>
            {spells.map((type, index) => (
              <option key={index} value={type}>{type ? type : 'Select Type'}</option>
            ))}
          </select>
        )}
        {/* Filtra traps */}
        {filterAtr === 'trap' && (
          <select title='Filter Spells' value={filterSpellTrapType} onChange={(e) => setFilterST(e.target.value)}>
            {traps.map((type, index) => (
              <option key={index} value={type}>{type ? type : 'Select Type'}</option>
            ))}
          </select>
        )}
      </div>
      {/* Limpar filtros habilitado ao selecionar os selects de subtipos */}
      {filterName !== '' || filterLevel !== '' || filterSpellTrapType !== '' || filterLink !== '' || filterError ? (
        <button className={style.btnClear} onClick={() => handleClearFilters()}>Clean Filters</button>
      ) : <div className={style.pAllCards}/>}
      {/* Mensagem de erro caso os filtros nao retornem null */}
      {filterError && <h2>No cards match your filter</h2>}
      {/* Componente renderiza lista de cards */}
      <ListCards cards={cards}/>
    </>
  )
}
