import React, {useEffect, useState} from 'react'

export default function PokemonListElementLarge({name, url, PokeAPIService}) {
    const [sprite, setSprite] = useState('')
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        let mounted = true
        PokeAPIService
          .getSpecifiedURL(url)
          .then(response => {
            if (mounted) {
              setLoading(false)
            }

            setSprite(response.sprites.front_default)

          })

          return function cleanup() {
            mounted = false
          }

      }, [PokeAPIService, url])

    return (
      <div>
      {loading ? <p>loading...</p> : 
        <div key={name}>
            {name} <img src={sprite} height="100" width="100" alt="Pokemon"/>
        </div>}
        </div>
    )
}
