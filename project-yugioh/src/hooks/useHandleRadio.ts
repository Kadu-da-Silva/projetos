import { ChangeEvent, useState } from "react";

export default function useHandleRadio(initialValue: string) {
  const [value, setValue] = useState(initialValue);

  function handleChange(e: ChangeEvent<HTMLInputElement>) {
    if (e.target.checked) {
      setValue(e.target.value);
    }
  }

  return { value, setValue, handleChange };
}