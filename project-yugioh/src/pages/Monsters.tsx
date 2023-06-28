import { useContext, useEffect, useState } from 'react'
import Header from '../components/Header'
import ListCards from '../components/ListCards'
import YugiohContext from '../context/YugiohContext'
import { Card } from '../types/type'
import { imgAttribute } from '../components/utils/renderElements'
import useHandleChange from '../hooks/useHandleChange'
import useHandleCheckbox from '../hooks/useHandleCheckbox'
import useHandleRadio from '../hooks/useHandleRadio'
// import Button from '../components/Button'

export default function Monsters() {
  const { cardList } = useContext(YugiohContext)
  const [cards, setCards] = useState<Card[]>([])
  const [filterError, setFilterError] = useState(false)
  // const [filters, setFilters] = useState([{}])
  const filterRace = useHandleChange('')
  const filterType = useHandleChange('')
  const filterNormal = useHandleCheckbox(false)
  const filterAtr = useHandleRadio('')

  useEffect(() => {
    const cardsMonsters = cardList.filter((card: Card) => card.type.includes('Monster'))
    
    // A função filteredCards retorna true se a raça corresponder ao filtro
    //Se ambos os filtros não estiverem selecionados, a função retorna true para todas as carta
    const filteredCards = cardsMonsters.filter((card: Card) => {
      const raceMatch = filterRace.value ? card.race === filterRace.value : true
      const typeMatch = filterType.value ? card.type.includes(filterType.value) : true
      const effectMatch = filterNormal.value ? card.type.includes('Normal') : true
      const attributeMatch = filterAtr.value ? card.attribute === filterAtr.value : true
      return raceMatch && typeMatch && effectMatch && attributeMatch
    })

    setCards(filteredCards)

    if (filteredCards.length === 0 && filterType.value && filterRace.value && filterNormal.value && filterAtr.value) {
      setFilterError(true)
    } else {
      setFilterError(false)
    }

  }, [cardList, filterRace.value, filterType.value, filterNormal.value, filterAtr.value])
  

  // const handleFilter = () => {
  //   setFilters([
  //     ...filters,
  //     {
  //       race: filterRace.value,
  //       type: filterType.value,
  //     }
  //   ])
  // }

  const handleRadioClick = (attribute: string) => {
    if (filterAtr.value === attribute.toUpperCase()) {
      // Se o input já estiver selecionado, desmarque-o
      filterAtr.setValue("");
    } else {
      // Caso contrário, marque-o com o valor do atributo
      filterAtr.setValue(attribute.toUpperCase());
    }
  };
  
  const races = ["", "Aqua", "Beast", "Cyberse", "Dinosaur", "Divine-Beast", "Dragon", "Fairy", "Fiend", "Fish", "Insect", "Machine", "Plant", "Psychic", "Reptile", "Rock", "Sea Serpent", "Spellcaster", "Thunder", "War Machine", "Warrior", "Winged Beast", "Zombie"];
  const types = ["", "Effect", "Fusion", "Ritual", "Synchro", "XYZ", "Pendulum", "Link"]
  const attributes = ["dark", "divine", "earth", "fire", "light", "water", "wind"]
  
  return (
    <>
      <Header />
      <div>
        <select
          value={filterRace.value}
          onChange={filterRace.handleChange}
        >
          {races.map((race) => (
            <option key={race} value={race}>{race}</option>
          ))}
        </select>
        <select
          value={filterType.value}
          onChange={filterType.handleChange}
        >
          {types.map((type) => (
            <option key={type} value={type}>{type}</option>
          ))}
        </select>
          <label>
            <input
              type="checkbox"
              checked={filterNormal.value} 
              onChange={filterNormal.handleChange} 
            /> Normal
          </label>
        <div>
          {attributes.map((attribute) => (
            <label htmlFor={attribute} key={attribute}>
              <input
                id={attribute}
                type="radio"
                value={attribute.toLocaleUpperCase()}
                checked={filterAtr.value === attribute}
                onChange={() => console.log('change')}
                onClick={ () => handleRadioClick(attribute) }
              />
              <img src={imgAttribute(attribute.toUpperCase())} alt={attribute} />
            </label>
          ))}
        </div>
      </div>
      {filterError && <div>No cards match your filter</div>}
      {/* <Button 
        classStyle='btn-filter'
        onClick={ handleFilter }
        label='Clear Filters'
      /> */}
      <ListCards cards={cards}/>
    </>
  )
}
