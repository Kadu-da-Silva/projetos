import { Link, useLocation } from 'react-router-dom'

import reactLogo from '../assets/react.svg'
import viteLogo from '/vite.svg'
import style from './Header.module.css'

export default function Header() {
  const { pathname } = useLocation()

  return (
    <header className={style.header}>
      <div className={style.containerImages}>
        <a href="https://vitejs.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <code>Protótipo</code>
      <div className={style.containerLinks}>
        {pathname !== '/' && (
          <Link to={'/'}>
            <span>Home</span>
          </Link>
        )}
        {pathname !== '/about' && (
          <Link to={'/about'}>
            <span>About</span>
          </Link>
        )}
      </div>
    </header>
  )
}
