import { Routes, Route } from 'react-router-dom';
import './App.css'
import Home from './pages/Home';
import AllCards from './pages/AllCards';
import Card from './pages/Card';

function App() {

  return (
    <Routes>
      <Route path='/' element={ <Home /> } />
      <Route path='/cards' element={ <AllCards />} />
      <Route path='/card/:id' element={ <Card />} />
    </Routes>
  )
}

export default App
