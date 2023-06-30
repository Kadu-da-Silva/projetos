import { Card } from "../../types/type";

type Filter = {
  filterArchetype: string
  filterAtr: string
  filterLevel: string
  filterLink: string 
  filterName: string 
  filterRace: string 
  filterSpellTrapType: string
  filterType: string 
}

export default function filter(cards: Card[], filters: Filter, search: boolean) {
  return cards.filter((card) => {
    // Verifica cada filtro e aplica as condições de filtragem
    return Object.entries(filters).every(([filterKey, filterValue]) => {
      // Lógica de filtragem com base nos filtros
      if (filterKey === 'filterName' && filterValue && !search) {
        return card.name.includes(filterValue);
      }
      if (filterKey === 'filterName' && filterValue && search) {
        return card.desc.includes(filterValue);
      }
      if (filterKey === 'filterRace' && filterValue) {
        return card.race === filterValue;
      }
      if (filterKey === 'filterType' && filterValue) {
        return card.type.includes(filterValue);
      }
      if (filterKey === 'filterArchetype' && filterValue) {
        return card.archetype === filterValue;
      }
      if (filterKey === 'filterAtr' && filterValue) {
        return card.attribute === filterValue || card.frameType === filterValue;
      }
      if (filterKey === 'filterLevel' && filterValue) {
        return card.level === Number(filterValue);
      }
      if (filterKey === 'filterLink' && filterValue) {
        return card.linkval === Number(filterValue);
      }
      if (filterKey === 'filterSpellTrapType' && filterValue) {
        return card.race === filterValue;
      }
      // Se nenhum filtro corresponder, retorna true para todas as cartas
      return true
    })
  })
}