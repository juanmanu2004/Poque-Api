import { useState } from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { AppProvider } from './Contexto/Contexto';


import Aleatorios from './Componentes/Aleatorios'
import Capturados from './Componentes/Capturados'
import Favoritos from './Componentes/Favoritos'
import Listas from './Componentes/Listas'
import Pokemon from './Componentes/Pokemon'
import Usuario from './Componentes/Usuario'
import Menu from './Componentes/Menu';
import './App.css'

function App() {

  
  return (
 <AppProvider>
    <Router>
      <Menu />

      <Routes>
        <Route path="/" element={<Listas />} />
        <Route path="/usuarios" element={<Usuario />} />
        <Route path="/aleatorios" element={<Aleatorios />} />
        <Route path="/capturados" element={<Capturados />} />
        <Route path="/favoritos" element={<Favoritos />} />
        <Route path="/Pokemon/:name" element={<Pokemon />} />
      </Routes>

    </Router>
    </AppProvider>
  )
}

export default App
