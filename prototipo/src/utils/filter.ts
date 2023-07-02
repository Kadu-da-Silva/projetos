type Filter = {
  filterName: string,
  filterValue: string,
}

export default function filter (data: [], filters: Filter) {
  return data.filter((item) => {
    // Verifica cada filtro e aplica as condições de filtragem
    return Object.entries(filters).every(([filterKey, filterValue]) => {
      // Lógica de filtragem com base nos filtros
      if (filterKey === 'filterName') {
        // return item.name === filterValue
      }
      if (filterKey === 'filterValue') {
        // return item.value === filterValue
      }
      // Se nenhum filtro corresponder, retorna true para todos os itens
      return true
    })
  });
}