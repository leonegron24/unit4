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
      } catch (error) {
          console.error('Error catching Pokémon:', error);
      }
  }

  async saveCaughtPokemon(){
    try {
      const caughtPokemon = AppState.listedPokemon
      const response = api.save('caughtPokemon', caughtPokemon)
      console.log(response.data)
    } catch (error) {
      Pop.toast("Could not save caught Pokemon List", 'error')
      console.error(error)
    }
  }

  async loadCaughtPokemon(){
    try {
      
    } catch (error) {
      Pop.toast("Could not load caught Pokemon List", 'error')
      console.error(error)
    }
  }
}
export const sandboxPokemonService = new SanboxPokemonService()