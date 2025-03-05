import { AppState } from "../AppState.js"
import { Pokemon, SandboxPokemon } from "../models/Pokemon.js"
import { Pop } from "../utils/Pop.js";
import { api } from "./AxiosService.js"

class SanboxPokemonService{

  async catchPokemon() {
      console.log('Attempting to catch Pokémon...');

      if (!AppState.activePokemon) {
          console.warn('No active Pokémon selected!');
          return;
      }

      // Convert active Pokemon into the correct format for the API
      const pokemonData = {
          name: AppState.activePokemon.name,  // Required
          img: AppState.activePokemon.img.front_default || "",  // Required
      };

      console.log('Sending Pokemon Data:', pokemonData); // Debugging

      try {
          const response = await api.post('api/pokemon', pokemonData);
          console.log('Response from API:', response.data);
          AppState.listedPokemon.push(new Pokemon(response.data));
          AppState.emit('activePokemon')
      } catch (error) {
          console.error('Error catching Pokémon:', error);
      }
  }

  async fetchCaughtPokemon() {
    const response = await api.get('api/pokemon')
    console.log('response: ',response)
    const pokemon = response.data.map(pokemon => new Pokemon(pokemon))
    AppState.listedPokemon = pokemon
    console.log('pokemon:', pokemon)
    console.log(AppState.listedPokemon)
  }

  async deletePokemon(pokemonId){
    try {
      const response = await api.delete(`api/pokemon/${pokemonId}`)
      console.log('Pokemon was released!', response.data)
      const pokemonToDelete = AppState.listedPokemon.findIndex(pokemon => pokemon.id == pokemonId)
      if(pokemonToDelete === -1){return}
      AppState.listedPokemon.splice(pokemonToDelete,1)
      
    } catch (error) {
      console.error('Error deleting Pokémon:', error);
    }
  }
  
}
export const sandboxPokemonService = new SanboxPokemonService()