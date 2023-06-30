import { Card } from "../types/type";

  
export  const races = ["", "Aqua", "Beast", "Cyberse", "Dinosaur", "Divine-Beast", "Dragon", "Fairy", "Fiend", "Fish", "Insect", "Machine", "Plant", "Psychic", "Reptile", "Rock", "Sea Serpent", "Spellcaster", "Thunder", "War Machine", "Warrior", "Winged Beast", "Zombie"];
export  const types = ["", "Normal", "Effect", "Fusion", "Ritual", "Synchro", "XYZ", "Pendulum", "Link"]
export  const attributes = ["DIVINE", "DARK", "EARTH", "FIRE", "LIGHT", "WATER", "WIND", "spell", "trap"]
export  const levels = ["", "1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12"]
export  const links = ['', 1,2,3,4,5,6]
export  const spells = ["", "Equip", "Continuous", "Quick-Play", "Field", "Ritual"]
export  const traps = ["", "Continuous", "Counter"]
export const arrayArchetypes = (cards: Card[]) => {
  const archetypes = [""];
  cards.map((card) => {
    if (!archetypes.includes(card.archetype) &&
    card.archetype !== undefined) archetypes.push(card.archetype)
  })
  return archetypes.sort()
}