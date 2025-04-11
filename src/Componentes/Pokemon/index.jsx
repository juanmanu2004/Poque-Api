import { useState, useEffect } from 'react'
import { useParams } from "react-router-dom"; 
import './style.css'

function Pokemon() {
  const { name } = useParams(); 
  const [datapoke, setDatapoke] = useState([]);
  const [favoritos, setFavoritos] = useState([]);
  const esFavorito = favoritos.some(p => p.id === datapoke.id);

  useEffect(() => {
    fetch(`https://pokeapi.co/api/v2/pokemon/${name}`)
      .then(response => response.json())
      .then(responseData => setDatapoke(responseData))
      .catch(error => console.error("Error:", error));
  }, [name]);
  
  const toggleFavorito = () => {
    if (esFavorito) {
      setFavoritos(favoritos.filter(p => p.id !== datapoke.id));
    } else {
      setFavoritos([...favoritos, { id: datapoke.id, nombre: datapoke.name }]);
    }
  };

  return (
    <div>
    <img 
      src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${datapoke.id}.png`} 
      alt={datapoke.name} 
      width="200"
    />

      <p>{datapoke.name}</p>
      <p>{datapoke.id}</p>
      <p>Altura: {datapoke.height/ 10} m / Peso: {datapoke.weight/ 10} kg</p>

      <button onClick={toggleFavorito}>
          {esFavorito ? '❤️' : '🤍'}
        </button>
  
  </div>
  )
}

export default Pokemon
