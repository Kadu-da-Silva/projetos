import { Routes, Route } from 'react-router-dom';
import './App.css'
import Monsters from './pages/Monsters';
import SpellsAndTraps from './pages/SpellsAndTraps';
import Home from './pages/Home';
import Card from './pages/Card';

function App() {

  return (
    <Routes>
      <Route path='/' element={ <Home /> } />
      <Route path='/monsters' element={ <Monsters />} />
      <Route path='/spells' element={ <SpellsAndTraps />} />
      <Route path='/card/:id' element={ <Card />} />
    </Routes>
  )
}

export default App
