import { Link, useLocation, useNavigate } from 'react-router-dom';

import style from './Header.module.css'
import logo from '../images/logo.png'
import { useContext, useEffect, useState } from 'react';
import YugiohContext from '../context/YugiohContext';

export default function Header() {
  const {pathname} = useLocation()

  const { user } = useContext(YugiohContext)
  const nickname = user[0] && user[0].nickname
  const navigate = useNavigate()
  
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isLoggedIn, setIsLoggedIn] = useState(false)

  useEffect(() => {
    const valueStorage = localStorage.getItem("isLoggedIn");
    if (valueStorage === 'true') setIsLoggedIn(true);

    if(!user[0]) {
      setIsLoggedIn(false)
      localStorage.setItem("isLoggedIn", "false");
    }
  }, [user])

  const handleMenuItemClick = (opt: string) => {
    if (opt === 'Logout') {
      navigate('/')
      localStorage.setItem("isLoggedIn", "false");
      setIsLoggedIn(false)
      setIsMenuOpen(false)
    }
    if (opt === 'Profile') navigate('/profile')
  }
  

  return (
    <header className={style.header}>
      <img src={logo} alt="" />
      <div className={style.containerLinks}>
        {pathname !== '/' && (
          <Link to={'/'}>
            <button className={style.btnHeader}>
              Home
            </button>
          </Link>
        )}
        {pathname !== '/cards' && pathname !== '/login' && (
          <Link to={'/cards'}>
            <button className={style.btnHeader}>
              All Cards
            </button>
          </Link>
        )}
        {pathname === '/' && isLoggedIn && (
          <Link to={'/deck'}>
            <button className={style.btnHeader}>
              Deck
            </button>
          </Link>
        )}
        {pathname !== '/login' && !isLoggedIn && (
          <Link to={'/login'}>
            <button className={style.btnHeader}>
              Login
            </button>
          </Link>
        )}
        {isLoggedIn && (
          <button
            id='menu-login'
            type='button'
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className={isMenuOpen ? style.btnMenu : style.btnHeader}
          >
            👤{nickname}
          </button>
        )}
        {isMenuOpen && (
          <div className={style.menu}>
            <ul>
              <li onClick={() => handleMenuItemClick('Profile')}>Profile</li>
              <li onClick={() => handleMenuItemClick('Logout')}>Logout</li>
            </ul>
        </div>
        )}
      </div>
    </header>
  )
}
