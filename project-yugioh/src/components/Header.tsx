import { Link } from 'react-router-dom';

export default function Header() {

  return (
    <>
      <Link to={'/cards'}>
        <button>
          All Cards
        </button>
      </Link>
    </>
  )
}
