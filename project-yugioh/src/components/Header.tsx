import { Link, useLocation } from 'react-router-dom';

import style from './Header.module.css'
import logo from '../images/logo.png'

export default function Header() {
  const {pathname} = useLocation()

  return (
    <header className={style.header}>
      <img src={logo} alt="" />
      <div className={style.containerLinks}>
        {pathname !== '/' && (
          <Link to={'/'}>
            <button>
              Home
            </button>
          </Link>
        )}
        {pathname !== '/cards' && (
          <Link to={'/cards'}>
            <button>
              All Cards
            </button>
          </Link>
        )}
        {pathname !== '/deck' && (
          <Link to={'/deck'}>
            <button>
              Deck
            </button>
          </Link>
        )}
        {pathname === '/' && (
          <Link to={'/login'}>
            <button>
              Login
            </button>
          </Link>
        )}
      </div>
    </header>
  )
}
