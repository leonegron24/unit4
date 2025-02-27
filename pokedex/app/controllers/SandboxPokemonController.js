import { AppState } from "../AppState.js"
import { sandboxPokemonService } from "../services/SandboxPokemonService.js"
import { Pop } from "../utils/Pop.js"
import { setHTML } from "../utils/Writer.js"

export class SandboxPokemonController {
    constructor(){
        console.log('SandboxPokemon 🎛️')
        // SandboxController.js
        AppState.on('caughtPokemon', this.drawSandboxList)
        AppState.on('account', this.showCatchButton)
    }

    async catchPokemon(pokemonId){
        try {
            console.log('catching pokemon...')
            await sandboxPokemonService.catchPokemon(pokemonId)
        } catch (error) {
            Pop.toast("Could not catch the Pokemon", 'error')
            console.error(error)
        }
    }

    drawSandboxList(){
        const caughtPokemon = AppState.caughtPokemon
        let listContent = ''
        caughtPokemon.forEach(pokemon => listContent += pokemon.ListTemplate)
        setHTML('sandbox-list', caughtPokemon)
    }
    
    showCatchButton(){
        const buttonElm = document.getElementById('catch-button')
        if (!buttonElm){return}
        buttonElm.classList.remove('d-none')
    }
}