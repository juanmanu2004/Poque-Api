import { useState,useEffect, useContext } from 'react'
import { AppContext } from '../../Contexto/Contexto';
import { useNavigate } from "react-router-dom";
import Filtros from '../Filtros';

import './style.css'

function Listas() {
const { data, setData, tipoSeleccionado, setTipoSeleccionado } = useContext(AppContext);

const [busqueda, setBusqueda] = useState('');
const navigate = useNavigate();

const handleTipoChange = (tipo) => {
  setTipoSeleccionado(tipo);
};

let resultados = data;
if (busqueda.length >= 3 && isNaN(busqueda)) {
  resultados = data.filter(pokemon =>
    pokemon.name.toLowerCase().includes(busqueda.toLowerCase())
  );
}

  if (!isNaN(busqueda)) {
    resultados = data.filter(pokemon =>
      pokemon.url.includes('/' + busqueda)
    );
  }
  
  return (
    <>
     <input
        type="text"
        placeholder="Buscar Pokémon"
        value={busqueda}
        onChange={(e) => setBusqueda(e.target.value)}
        className="c-buscador"
      />
    <Filtros onTipoChange={handleTipoChange}/>
     <section className='c-lista'>
      {resultados.map((pokemon, index) => (
        <div className='c-lista-pokemon'onClick={() => navigate(`/Pokemon/${pokemon.name}`)}
        key={index}>
           <p>{pokemon.url.split("/")[6]}</p>
          <img src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokemon.url.split("/")[6]}.png`} 
                alt={`Pokémon ${pokemon.name}`} width='auto' height='60' loading='lazy'
              />
          <p>{pokemon.name}</p>
        </div>
      ))}
    </section>
    </>
  );
}

export default Listas
