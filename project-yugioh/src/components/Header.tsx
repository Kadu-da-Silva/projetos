import { Link, useLocation } from 'react-router-dom';

export default function Header() {
  const { pathname } = useLocation()

  return (
    <>
      {!pathname.includes('/monsters') && (
        <Link to={'/monsters'}>
          <button>
            Monsters
          </button>
        </Link>
      )}
      
      {!pathname.includes('/spells&traps') && (
        <Link to={'/spells&traps'}>
          <button>
            Spells / Traps
          </button>
        </Link>
      )}
    </>
  )
}
