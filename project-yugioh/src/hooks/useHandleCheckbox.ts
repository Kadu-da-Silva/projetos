import { ChangeEvent, useState } from "react";

export default function useHandleCheckbox(initialValue: boolean) {
  const [value, setValue] = useState(initialValue);

  function handleChange(e: ChangeEvent<HTMLInputElement>) {
    setValue(e.target.checked);
  }

  return { value, setValue, handleChange };
}