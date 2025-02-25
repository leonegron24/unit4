import { AppState } from "../AppState.js"
import { Pokemon, SandboxPokemon } from "../models/Pokemon.js"

// @ts-ignore
const pokeApi = new axios.create ({
  baseURL: 'https://pokeapi.co/api/v2/',
  timeout: 8000
})

class WildPokemonService{
    
    
    async getPokemon() {
        const response = await pokeApi.get('pokemon')
        console.log('pokemon response: ', response.data)
        const pokemon = response.data.results.map(pokemonData => new Pokemon(pokemonData))
        AppState.wildPokemon = pokemon
    }
    
    async getActivePokemon(pokemonName) {
        const reponse = await pokeApi.get(`pokemon/${pokemonName}`)
        console.log('active Pokemon: ', reponse.data)
        const pokemon = new SandboxPokemon(reponse.data)
        AppState.activePokemon = pokemon
    }

}
export const wildPokemonService = new WildPokemonService()