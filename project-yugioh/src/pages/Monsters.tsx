import Header from '../components/Header'
import ListCards from '../components/ListCards'

export default function Monsters() {
  return (
    <>
      <Header />
      <div>Monsters</div>
      <ListCards cardType='Monster'/>
    </>
  )
}
