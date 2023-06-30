import { Routes, Route } from 'react-router-dom';
import './App.css'
import Home from './pages/Home';
import AllCards from './pages/AllCards';
import Card from './pages/Card';
import Deck from './pages/Deck';
import Login from './pages/Login';

function App() {

  return (
    <Routes>
      <Route path='/home' element={ <Home /> } />
      <Route path='/cards' element={ <AllCards />} />
      <Route path='/card/:id' element={ <Card />} />
      <Route path='/deck' element={ <Deck />} />
      <Route path='/login' element={ <Login />} />
    </Routes>
  )
}

export default App
