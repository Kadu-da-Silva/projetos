import { Card } from '../types/type';
import { renderAttribute } from './utils/renderElements';

import star from '../images/star-level.png'
import rank from '../images/star-rank.png'

import style from './RenderDetails.module.css'

type Props = {
  card: Card
}

export default function RenderDetails({card}:Props) {
    const { name, type, archetype, desc, atk, def, linkval, level, race, attribute, frameType, card_sets, card_images, card_prices } = card;
    // console.log(card);
    

  const renderLevel = () => {
    const stars = [];
    for (let i = 0; i < level; i++) {
      stars.push(<img key={i} src={frameType === 'xyz' ? rank : star} alt='Nível' />)
    }
    return <div className={frameType === 'xyz' ? style.ranks : style.stars}>{stars}</div>
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
          <div key={img.id} className={style.cardImg}>
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

    if (words.length > 2) {
      return (
        <div className={style.containerType}>
          <span>{race} / {words[0]} / {words[1]}</span>
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
    <section className={style.section}>
      <div className={style[frameType]}>
        <div className={style.containerName}>
          <h1>{name}</h1>
          <div>
            <img
              src={renderAttribute(attribute, frameType)}
              alt={attribute ? `Attribute: ${attribute}` : `Attribute: ${frameType}` } />
          </div>
        </div>
        <div className={style.containerLevel}>
        {renderLevel()}
        </div>
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
          <div className={style.containerChild}>
            <h2>How to get it</h2>
            {renderCardSets()}
          </div>
        )}
        {hasPositivePrice && (
          <div className={style.containerChild}>
            <h2>Price List</h2>
            {renderPrices()}
          </div>
        )}
        {archetype && <h2 className={style.archetype}>Archetype: {archetype}</h2>}
        {renderImageCard()}
      </div>
    </section>
  )
}
