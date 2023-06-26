export type Card = {
  id: number;
  name: string;
  type: string;
  desc: string;
  atk: number;
  def: number;
  level: number;
  race: string;
  attribute: string;
  card_sets: {
    set_name: string;
    set_code: string;
    set_rarity: string;
    set_rarity_code: string;
    set_price: string;
  }[];
  card_images: {
    id: number;
    image_url: string;
    image_url_small: string;
    image_url_cropped: string;
  }[];
};

export type CardDetails = {
  id: number;
  name: string;
  type: string;
  desc: string;
  atk: number;
  def: number;
  linkval: number;
  frameType: string;
  level: number;
  race: string;
  attribute: string;
  card_sets: {
    set_name: string;
    set_code: string;
    set_rarity: string;
    set_rarity_code: string;
    set_price: string;
  }[];
  card_images: {
    id: number;
    image_url: string;
    image_url_small: string;
    image_url_cropped: string;
  }[];
  card_prices: {
    cardmarket_price: string;
    tcgplayer_price: string;
    ebay_price: string;
    amazon_price: string;
    coolstuffinc_price: string;
  }[];
}

export type CardImage = [
  {
    "id": 6983839,
    "image_url": "https://images.ygoprodeck.com/images/cards/6983839.jpg",
    "image_url_small": "https://images.ygoprodeck.com/images/cards_small/6983839.jpg",
    "image_url_cropped": "https://images.ygoprodeck.com/images/cards_cropped/6983839.jpg"
  }
]