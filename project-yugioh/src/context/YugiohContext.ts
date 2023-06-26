import { Dispatch, SetStateAction, createContext } from "react";
import { Card, CardDetails } from "../types/type";

type GlobalContent = {
  cardList: [],
  setCardList: Dispatch<SetStateAction<Card[]>>,
  cardDetails: CardDetails[],
  setCardDetails: Dispatch<SetStateAction<CardDetails[]>>,
}

const YugiohContext = createContext<GlobalContent>({
  cardList: [],
  setCardList: () => {[]},
  cardDetails: [],
  setCardDetails: () => {[]},
})

export default YugiohContext;
