import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { BrowserRouter } from 'react-router-dom'
import YugiohProvider from './context/YugiohProvider.tsx'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <BrowserRouter>
      <YugiohProvider>
        <App />
      </YugiohProvider>
    </BrowserRouter>
  </React.StrictMode>,
)
