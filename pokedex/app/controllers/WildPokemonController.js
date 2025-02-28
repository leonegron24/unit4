import { AppState } from "../AppState.js"
import { wildPokemonService } from "../services/WildPokemonService.js"
import { Pop } from "../utils/Pop.js"
import { setHTML } from "../utils/Writer.js"

export class WildPokemonController {
    constructor(){
        console.log('WildPokemon 🎛️')
        this.getPokemon()
        AppState.on('wildPokemon', this.drawPokemon)
        AppState.on('activePokemon', this.drawActivePokemon)
        AppState.on('account', this.drawPokemon)
    }

    drawPokemon(){
        const pokemon = AppState.wildPokemon
        let pokemonContent = ''
        pokemon.forEach(pokemon => pokemonContent += pokemon.ListTemplate)
        setHTML('pokemon-list', pokemonContent)
    }

    drawActivePokemon(){
        const activePokemon = AppState.activePokemon
        let activeContent = activePokemon.activeTemplate
        setHTML('active-pokemon', activeContent)
        
        
    }

    async getPokemon(){
        try {
            await wildPokemonService.getPokemon()
        } catch (error) {
            Pop.toast("Could not get Pokemon", 'error')
            console.error(error)
        }
    }

    async getActivePokemon(pokemonName){
        try {
            await wildPokemonService.getActivePokemon(pokemonName)
        } catch (error) {
            Pop.toast("Could not get active Pokemon", 'error')
            console.error(error)
        }
    }

    showCatchButton(){
        console.log('showing catch button')
        const buttonElm = document.getElementById("catch-button")
        console.log(buttonElm)
        if (!buttonElm){return}
        buttonElm.classList.remove("d-none")
    }

}