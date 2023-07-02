import { Dispatch, SetStateAction } from 'react';
import { State } from '../types/types';
import { createContext } from 'react';

type GlobalContent = {
  state: State[],
  setState: Dispatch<SetStateAction<State[]>>,
};

const Context = createContext<GlobalContent>({
  state: [],
  setState: () => {[]},
});

export default Context;
