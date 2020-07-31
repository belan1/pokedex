import React from 'react'
import PokemonListElementLarge from './PokemonListElementLarge'
import PokemonSheet from './PokemonSheet'

export default function PokemonList({pokemons, searchterm, setSearchterm, PokeAPIService, token, loggedIn}) {

    var filtered_pokemon = []
    for (var i = 0; i < pokemons.length; i++){

        if (pokemons[i].name.toLowerCase() === (searchterm.toLowerCase())){
            return (
                <PokemonSheet key = {pokemons[i].name} name = {pokemons[i].name} url = {pokemons[i].url} PokeAPIService={PokeAPIService} token={token} loggedIn={loggedIn}/>
            )
        }
        else if (pokemons[i].name.toLowerCase().includes(searchterm.toLowerCase())){
            filtered_pokemon.push(pokemons[i])
        }
    }

    if (filtered_pokemon.length === 0){
        return(
            <div>No Pokemon Found!</div>
        )
    }

    if (filtered_pokemon.length === 1){
        return (
            <PokemonSheet key = {filtered_pokemon[0].name} name = {filtered_pokemon[0].name} url = {filtered_pokemon[0].url} PokeAPIService={PokeAPIService}  token={token} loggedIn={loggedIn}/>
        )
    }


    if (filtered_pokemon.length <= 10){
        return (
            <div>
            {filtered_pokemon.map(p => {
                return <PokemonListElementLarge key={p.name} name = {p.name} url = {p.url} PokeAPIService={PokeAPIService}/>
            })}
        </div>
        )
    }


    return (
        <div>
            <div>To see different pokemon, narrow your search</div>
            {filtered_pokemon.slice(0, 10).map(p => {
                return <PokemonListElementLarge key={p.name} name = {p.name} url = {p.url} PokeAPIService={PokeAPIService}/>
            })}
        </div>
    )
    
}
