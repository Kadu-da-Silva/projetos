import { ChangeEvent, useState } from 'react';

export default function useHandleChange(initialValue: string) {
  const [value, setValue] = useState(initialValue);

  function handleChange(e: ChangeEvent<HTMLInputElement>) {
    setValue(e.target.value);
  }

  return { value, setValue, handleChange };
}
