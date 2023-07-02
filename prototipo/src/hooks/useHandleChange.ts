import { useState } from 'react';

type EventHandler<T> = (value: T) => void;

// Sobrecargas do tipo genérico para lidar com diferentes tipos de entrada
function useHandleChange(initialValue: string): [string, EventHandler<string>];
function useHandleChange(initialValue: number): [number, EventHandler<number>];
function useHandleChange(initialValue: boolean): [boolean, EventHandler<boolean>];

function useHandleChange<T>(initialValue: T): [T, EventHandler<T>] {
  const [value, setValue] = useState<T>(initialValue);

  const handleChange: EventHandler<T> = (event) => {
    setValue(event);
  }

  return [value, handleChange];
}

export default useHandleChange;
