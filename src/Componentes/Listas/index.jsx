import { useState, useEffect } from 'react'
import './style.css'

function Listas() {

    useEffect(() => {
        const [data, setData] = useState([]);
        fetch("https://pokeapi.co/api/v2/pokemon/?limit=1025")
          .then(response => response.json())
          .then(responseData => setData(responseData.results))
          .catch(error => console.error("Error:", error));
      }, []); 
  
      return (
        <section className='c-lista'>
          {data.map((pokemon, index) => (
            <div className='c-lista-pokemon'
            key={index}>
              <img src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokemon.url.split("/")[6]}.png`} 
                    alt={`Pokémon ${pokemon.name}`} width='auto' height='60' loading='lazy'
                  />
              <p>{pokemon.name}</p>
            </div>
          ))}
        </section>
      );
}

export default Listas
