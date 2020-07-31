import React, {useState} from 'react'
import { Button } from 'react-bootstrap';

export default function RandomButton({setSearchterm, PokeAPIService}) {
    const [isButtonDisabled, setIsButtonDisabled] = useState(false)

    const randomPokemon = () => {
      setIsButtonDisabled(true)
      setTimeout(() => setIsButtonDisabled(false), 5000)

        const randpoke = Math.floor((Math.random() * 893) + 1)
        PokeAPIService.getSpecifiedURL('https://pokeapi.co/api/v2/pokemon/' + String(randpoke))
          .then(response => {
            setSearchterm(response.species.name)
          })
      }

    return (
        <div className="col col-lg-2">

          {isButtonDisabled ? <Button variant="secondary" className="mr-2">Random Pokemon</Button> : <Button variant="primary" className="mr-2" onClick={randomPokemon}>Random Pokemon</Button>}
          
          </div>
    )
}
