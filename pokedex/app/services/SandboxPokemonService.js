import { AppState } from "../AppState.js"
import { Pokemon, SandboxPokemon } from "../models/Pokemon.js"
import { api } from "./AxiosService.js"

class SanboxPokemonService{

async catchPokemon(pokemonID){
    console.log('almost caught... service working')
    const caughtPokemon = AppState.caughtPokemon
    const response = await api.post('api/pokemon', caughtPokemon)
    console.log("resonse: ", response.data)
    caughtPokemon.push(new SandboxPokemon(response.data))
    
  }

}
export const sandboxPokemonService = new SanboxPokemonService()