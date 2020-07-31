import React, {useState, useEffect} from 'react';
import PokemonList from './PokemonList'
import RandomButton from './RandomButton'
import PokeAPIService from './PokeAPIService'

export default function Pokedex({token, loggedIn}) {

  const [pokemon, setPokemon] = useState([])
  const [searchterm, setSearchterm] = useState('')
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    let mounted = true
    PokeAPIService.getAll()
      .then(response => {
        if (mounted) {
          setLoading(false)
        }

        setPokemon(response.results)
      })

      return function cleanup() {
        mounted = false
      }
  }, [])

  const handleSearchChange = (event) => {
    setSearchterm(event.target.value)
  }


  return (
    <div> {loading ? <p>loading...</p> : 
    <div className="pokedex">
    <div className="container">
      <div className="row justify-content-md-center">
        <div className="col-sm">Search pokemon <input onChange={handleSearchChange} value={searchterm}></input> </div>
        <RandomButton setSearchterm={setSearchterm} PokeAPIService={PokeAPIService}/>
      </div>
    <PokemonList pokemons={pokemon} searchterm={searchterm} setSearchterm={setSearchterm} PokeAPIService={PokeAPIService} token={token} loggedIn={loggedIn}/>
    </div>
    </div>}
    </div>
  );
}
