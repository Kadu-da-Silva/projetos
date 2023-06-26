import { CardDetails } from '../types/type';

import star from '../images/star-level.png'
import dark from '../images/dark.png'
import divine from '../images/divine.png'
import earth from '../images/earth.png'
import fire from '../images/fire.png'
import light from '../images/light.png'
import water from '../images/water.png'
import wind from '../images/wind.png'
import spell from '../images/spell.png'
import trap from '../images/trap.png'

import style from './RenderDetails.module.css'

type Props = {
  card: CardDetails
}

export default function RenderDetails({card}:Props) {
    const { name, type, archetype, desc, atk, def, linkval, level, race, attribute, frameType, card_sets, card_images, card_prices } = card;
    console.log(card);
    

  const renderLevel = () => {
    const stars = [];
    for (let i = 0; i < level; i++) {
      stars.push(<img key={i} src={star} alt='Nível' />)
    }
    return <div>{stars}</div>
  }

  const renderAttribute = () => {
    if (attribute === 'DARK') return <div><img src={dark} alt="" /></div>
    if (attribute === 'DIVINE') return <div><img src={divine} alt="" /></div>
    if (attribute === 'EARTH') return <div><img src={earth} alt="" /></div>
    if (attribute === 'FIRE') return <div><img src={fire} alt="" /></div>
    if (attribute === 'LIGHT') return <div><img src={light} alt="" /></div>
    if (attribute === 'WATER') return <div><img src={water} alt="" /></div>
    if (attribute === 'WIND') return <div><img src={wind} alt="" /></div>
    if (frameType === 'spell') return <div><img src={spell} alt="" /></div>
    if (frameType === 'trap') return <div><img src={trap} alt="" /></div>
  }

  const renderCardSets = () => {
    return (
      <div className={style.containerSet}>
        {card_sets?.map((set, index) => (
          <div key={index} className={style.set}>
            <h3>{set.set_name}</h3>
            <p>Código: {set.set_code}</p>
            <p>Preço: $ {set.set_price}</p>
            <p>Raridade{set.set_rarity} {set.set_rarity_code}</p>
          </div>
        ))}
      </div>
    )
  }

  const renderImageCut = () => {
    return (
      <div className={style.containerImage}>
        {card_images?.map((img) => (
          <div key={img.id}>
            <img src={img.image_url_cropped} alt="Imagem cortada" />
          </div>
        ))}
      </div>
    )
  }

  const renderImageCard = () => {
    return (
      <div className={style.containerImageCard}>
        {card_images?.map((img) => (
          <div key={img.id}>
            <img src={img.image_url} alt="Imagem principal" />
          </div>
        ))}
      </div>
    )
  }

  const renderType = () => {
    const words = type.split(' ')
    console.log(words);

    if (words.length > 2) {
      return (
        <div className={style.containerType}>
          <p>{race} / {words[0]} / {words[1]}</p>
        </div>
      )
    }
    return (
      <div className={style.containerType}>
        <p>{race} / {words[0]}</p>
      </div>
    )
  }

  // Verifica se só tem valores 0 na lista
  const prices = card_prices[0];
  const hasPositivePrice = Object.values(prices).some(value => parseFloat(value) > 0);

  const renderPrices = () => {
    return (
      <div className={style.containerPrices}>
        <table>
          <thead>
            <tr>
              <th>Mercado</th>
              <th>TCG</th>
              <th>Ebay</th>
              <th>Amazon</th>
              <th>CoolStuffinc</th>
            </tr>
          </thead>
          <tbody>
            {card_prices?.map((prices, index) => (
              <tr key={index}>
                <td>$ {prices.cardmarket_price}</td>
                <td>$ {prices.tcgplayer_price}</td>
                <td>$ {prices.ebay_price}</td>
                <td>$ {prices.ebay_price}</td>
                <td>$ {prices.coolstuffinc_price}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    )
  }

  return (
    <div className={style.container}>
      <div className={style.containerName}>
        <h1>{name}</h1>
        {renderAttribute()}
      </div>
      <div className={style.containerLevel}>
      {renderLevel()}
      </div >
      {renderImageCut()}
      <div className={style.containerInfos}>
        {renderType()}
        <div className={style.containerDesc}>
          <p>{desc}</p>
        </div>
        <div className={style.containerAtk}>
          {atk && <span>ATK/{atk}</span>}
          {def >= 0 && <span>DEF/{def}</span>}
          {linkval && <span>LINK-{linkval}</span>}
        </div>
      </div>
      {card_sets && (
        <>
          <h2>How to get it</h2>
          {renderCardSets()}
        </>
      )}
      {hasPositivePrice && (
        <>
          <h2>Price List</h2>
          {renderPrices()}
        </>
      )}
      {archetype && <h2>Archetype: {archetype}</h2>}
      {renderImageCard()}
    </div>
  )
}
