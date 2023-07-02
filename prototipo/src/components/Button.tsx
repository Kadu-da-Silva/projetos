import { MouseEvent } from 'react';

import style from './Button.module.css'

type Props = {
  classStyle: string,
  onClick: (event: MouseEvent<HTMLButtonElement>) => void,
  label: string,
}

export default function Button({classStyle, onClick, label}: Props) {
  return (
    <>
      <button
        className={style[classStyle]}
        onClick={onClick}
      >
        {label}
      </button>
    </>
  )
}
