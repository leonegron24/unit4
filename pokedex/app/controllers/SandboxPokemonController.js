import { AppState } from "../AppState.js"
import { sandboxPokemonService } from "../services/SandboxPokemonService.js"
import { Pop } from "../utils/Pop.js"
import { setHTML } from "../utils/Writer.js"

export class SandboxPokemonController {
    constructor(){
        console.log('SandboxPokemon 🎛️')
        // SandboxController.js
        AppState.on('listedPokemon', this.drawSandboxList)
        AppState.on('account', this.fetchPokemon)
    }

    async catchPokemon(){
        try {
            console.log('catching pokemon...')
            await sandboxPokemonService.catchPokemon()
        } catch (error) {
            Pop.toast("Could not catch the Pokemon", 'error')
            console.error(error)
        }
    }

    drawSandboxList(){
        console.log('drawing list of caught pokemon!')
        console.log(AppState.listedPokemon)
        const caughtList = AppState.listedPokemon
        let listContent = ''
        caughtList.forEach(pokemon => listContent += pokemon.ListTemplate)
        setHTML('sandbox-list', listContent)
    }
    
    async fetchPokemon(){
        try {
            sandboxPokemonService.fetchCaughtPokemon()
        } catch (error) {
            Pop.toast("Could not fetch the Pokemon", 'error')
            console.error(error)
        }
    }

    async deletePokemon(pokemonName){
        try {
            sandboxPokemonService.deletePokemon(pokemonName)
        } catch (error) {
            Pop.toast("Could not delete that Pokemon", 'error')
            console.error(error)
        }
    }
    
}