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
      
      {!pathname.includes('/spells') && (
        <Link to={'/spells'}>
          <button>
            Spells
          </button>
        </Link>
      )}

      {!pathname.includes('/trap') && (
        <Link to={'/traps'}>
          <button>
            Traps
          </button>
        </Link>
      )}
    </>
  )
}
