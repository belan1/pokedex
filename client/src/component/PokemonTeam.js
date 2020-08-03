import React, {useState, useEffect} from 'react'
import PokemonListElementLarge from './PokemonListElementLarge'
import BackendAPIService from './BackendAPIService'
import PokeAPIService from './PokeAPIService'
import { Button } from 'react-bootstrap'

export default function PokemonTeam({token}) {

    const [pokemons, setPokemons] = useState([])
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        let mounted = true
        BackendAPIService.getTeam(token)
          .then(response => {
            if (mounted) {
              setLoading(false)
            }
    
            setPokemons(response.user.team)
          })
    
          return function cleanup() {
            mounted = false
          }
      }, [token])


      const RemoveTeamMember = (poke) => {
        BackendAPIService.deleteTeamMember(token, poke)
        .then(response => {
            setPokemons(response.user.team)
        })
        .catch(response => {

        })
      }


    return (
      <div className="container">
      <div className="row justify-content-md-center">
        <div> {loading ? <p>loading...</p> :
        <div><h3>Your Team ({pokemons.length}/6)</h3>
            {pokemons.map(p => {
                return (
                    <div key={p.name} style={{display: 'flex'}}>
                <PokemonListElementLarge name = {p.name} url = {'https://pokeapi.co/api/v2/pokemon/' + p.name} PokeAPIService={PokeAPIService}/>
                    <Button variant="danger" style={{height: '40%'}} onClick={() => RemoveTeamMember(p.name)}>Remove</Button>
                    </div>
                )
            })}</div>}
        </div>
        </div>
        </div>
    )
}
