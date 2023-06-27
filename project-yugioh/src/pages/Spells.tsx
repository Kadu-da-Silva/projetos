import ListCards from '../components/ListCards'
import Header from './../components/Header';

export default function Spells() {
  return (
    <>
      <Header />
      <div>Spells</div>
      <ListCards propType='Spell'/>
    </>
  )
}
