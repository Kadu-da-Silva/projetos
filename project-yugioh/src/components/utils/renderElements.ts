// Attributes
import dark from '../../images/dark.png'
import divine from '../../images/divine.png'
import earth from '../../images/earth.png'
import fire from '../../images/fire.png'
import light from '../../images/light.png'
import water from '../../images/water.png'
import wind from '../../images/wind.png'
import spell from '../../images/spell.png'
import trap from '../../images/trap.png'

export const renderAttribute = (attribute: string, frameType: string) => {
  if (attribute === 'DARK') return dark
  if (attribute === 'DIVINE') return divine
  if (attribute === 'EARTH') return earth
  if (attribute === 'FIRE') return fire
  if (attribute === 'LIGHT') return light
  if (attribute === 'WATER') return water
  if (attribute === 'WIND') return wind
  if (frameType === 'spell') return spell
  if (frameType === 'trap') return trap
}

export const imgAttribute = (attribute: string) => {
  if (attribute === 'DARK') return dark
  if (attribute === 'DIVINE') return divine
  if (attribute === 'EARTH') return earth
  if (attribute === 'FIRE') return fire
  if (attribute === 'LIGHT') return light
  if (attribute === 'WATER') return water
  if (attribute === 'WIND') return wind
  if (attribute === 'Spell') return spell
  if (attribute === 'Trap') return trap
}

// Backgrounds
import normal from '../../images/normal.png'
import effect from '../../images/effect.png'
import fusion from '../../images/fusion.png'
import synchro from '../../images/synchro.png'
// import darkSynchro from '../../images/dark-synchro.png' 
import xyz from '../../images/xyz.png'
import link from '../../images/link.png'
// import obelisk from '../../images/obelisk.png'
import bSpell from '../../images/b-spell.png'
import bTrap from '../../images/b-trap.png'

export const renderBackground = (frameType: string) => {
  if (frameType === 'normal') return normal
  if (frameType === 'effect') return effect
  if (frameType === 'fusion') return fusion
  if (frameType === 'synchro') return synchro
  if (frameType === 'xyz') return xyz
  if (frameType === 'link') return link
  if (frameType === 'spell') return bSpell
  if (frameType === 'trap') return bTrap
}
