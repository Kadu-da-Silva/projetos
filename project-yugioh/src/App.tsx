import { Routes, Route } from 'react-router-dom';
import './App.css'
import Monsters from './pages/Monsters';
import Spells from './pages/Spells';
import Traps from './pages/Traps';
import Home from './pages/Home';
import CardDetail from './components/CardDetail';

function App() {

  return (
    <Routes>
      <Route path='/' element={ <Home /> } />
      <Route path='/monsters' element={ <Monsters />} />
      <Route path='/spells' element={ <Spells />} />
      <Route path='/traps' element={ <Traps />} />
      <Route path='/card/:id' element={ <CardDetail />} />
    </Routes>
  )
}

export default App
