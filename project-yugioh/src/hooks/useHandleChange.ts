import { ChangeEvent, useState } from 'react';

export default function useHandleChange(initialValue: string) {
  const [value, setValue] = useState(initialValue);

  function handleChange(e: ChangeEvent<HTMLSelectElement>) {
    setValue(e.target.value);
  }

  return { value, setValue, handleChange };
}
