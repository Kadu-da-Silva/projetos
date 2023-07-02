import { ReactElement, useEffect, useState } from "react";
import { State } from "../types/types";
import { URL } from '../services/fetchApi';
import Context from "./Context";

type Props = {
  children: ReactElement
};

const Provider = ({children}: Props) => {
  const [state, setState] = useState<State[]>([]);

  async function fetchApi(url: string): Promise<void> {
    const result = await fetch(url)
    const jsonResult = await result.json()
    setState(jsonResult.data)
  }

  useEffect(() => {
    fetchApi(URL)
  }, [])

  return (
    <Context.Provider value={{ state, setState }}>
      {children}
    </Context.Provider>
  )
};

export default Provider;