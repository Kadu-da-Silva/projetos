import { Dispatch, SetStateAction, createContext } from "react";
import { Card, User } from "../types/type";

type GlobalContent = {
  cardList: Card[],
  setCardList: Dispatch<SetStateAction<Card[]>>,
  loading: boolean,
  error: boolean,
  user: User[],
  setUser: Dispatch<SetStateAction<User[]>>,
  deck: Card[],
  setDeck: Dispatch<SetStateAction<Card[]>>
}

const YugiohContext = createContext<GlobalContent>({
  cardList: [],
  setCardList: () => {[]},
  loading: false,
  error: false,
  user: [],
  setUser: () => {[]},
  deck: [],
  setDeck: () => {[]},
})

export default YugiohContext;
