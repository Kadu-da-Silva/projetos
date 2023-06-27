import { Dispatch, SetStateAction, createContext } from "react";
import { Card } from "../types/type";

type GlobalContent = {
  cardList: Card[],
  setCardList: Dispatch<SetStateAction<Card[]>>,
  loading: boolean,
  error: boolean,
}

const YugiohContext = createContext<GlobalContent>({
  cardList: [],
  setCardList: () => {[]},
  loading: false,
  error: false,
})

export default YugiohContext;
