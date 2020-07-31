import React, {useState, useEffect} from 'react'
import { Button } from 'react-bootstrap'
import BackendAPIService from './BackendAPIService'

export default function PokemonSheet({name, url, PokeAPIService, token, loggedIn}) {

    const [id, setId] = useState('')
    const [types, setTypes] = useState([])
    const [stats, setStats] = useState([])
    const [loading, setLoading] = useState(false)
    const [buttonVariant, setButtonVariant] = useState('primary')

    useEffect(() => {
        let mounted = true
        PokeAPIService.getSpecifiedURL(url)
          .then(response => {
            if (mounted) {
                setLoading(false)
            }

            var temp_id = String(response.id)
            setId(temp_id.padStart(3, '0'))

            setTypes(response.types)
            setStats(response.stats)
          })

          return function cleanup() {
              mounted = false
          }

      }, [PokeAPIService, url])

    return (
        <div>
            {loading ? <p>loading...</p> : 
        <div>
            <h1>{name}</h1> <div>id: {id}</div>
            { id === '' ? <div/>: <img src={"https://assets.pokemon.com/assets/cms2/img/pokedex/full/" + id + ".png"} height="300" width="300" alt="Pokemon Sprite"/>}
            <h3>types</h3>
            <div className="row justify-content-md-center">
            <div className="col-sm">
            <div className="types">
            {types.map(t => {
                return <div className = "type" key = {t.type.name}><div className={t.type.name}> {t.type.name} </div></div>
            })}
            </div>
            </div>
            </div>

            <h3>stats</h3>
            {stats.map(s => {
                return <div key = {s.stat.name}> {s.stat.name} : {s.base_stat} </div>
            })}
            {loggedIn ? <Button variant = {buttonVariant} onClick = {() => {BackendAPIService.addTeamMember(token, name); setButtonVariant('secondary')}}>Add to my team!</Button> : <div></div>}
        </div>
            }
        </div>
    )
}
