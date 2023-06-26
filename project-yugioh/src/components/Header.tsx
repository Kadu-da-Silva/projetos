import { Link } from 'react-router-dom';

export default function Header() {
  return (
    <>
      <Link to={'/monsters'}>
        <button>
          Monsters
        </button>
      </Link>
      
      <Link to={'/spells'}>
        <button>
          Spells
        </button>
      </Link>

      <Link to={'/traps'}>
        <button>
          Traps
        </button>
      </Link>
    </>
  )
}
