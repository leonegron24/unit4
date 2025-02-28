import { generateId } from "../utils/GenerateId.js"

export class Pokemon {
    constructor(data) {
        this.name = data.name
        
    }

    get ListTemplate(){
        return /*html*/ `
        <div class="btn d-flex" role="button" onclick="app.WildPokemonController.getActivePokemon('${this.name}')">${this.name.charAt(0).toUpperCase()+this.name.slice(1)}</div>
        `
    }

}

export class SandboxPokemon extends Pokemon {
    constructor(data){
        super(data)
        this.abilities = data.abilities.map(a => a.ability.name).join("<br>")
        this.moves = data.moves.map(m => m.move.name).join(" ** ")
        this.img = data.sprites
        this.backImg = data.backImg
        this.weight = data.weight
        this.height = data.height
        this.stats = data.stats.map(s => s.stat.name.charAt(0).toUpperCase() + s.stat.name.slice(1) + ": " + s.base_stat).join("<br> ")
        this.types = data.types.map(t => t.type.name).join(", ")
        this.creatorId = data.creatorId
        this.id = generateId()
    }

    get activeTemplate(){
        return /*html*/ `
        <div class="bg-light shadow p-4 bg-primary sticky-top">  
            <div class=" mb-0 row text-center justify-content-center">
                <h2 class='mb-0'>${this.name.charAt(0).toUpperCase() + this.name.slice(1)}</h2>
                <div id="catch" type="btn" class="button btn btn-warning rounded-pill w-25 mt-4" onclick="app.SandboxPokemonController.catchPokemon()"> Catch! </div>
            </div>

            <div class=" mt-0 row img-fluid fs-1">
                <img class="col-6" src="${this.img.front_shiny}" alt="">
                <img class="col-6" src="${this.img.back_shiny}" alt="">
            </div>
            <div class="row p-4 justify-content-between bg-success">
                <div class="col-5 border shadow bg-light">
                    <h3 class="text-center">Stats</h3>
                    <div>Types: ${this.types}</div>
                    <div>${this.stats}</div>
                    <div>Weight: ${this.weight}</div>
                    <div>Height: ${this.height}</div>
                </div>
                <div class="col-5 border shadow bg-light">
                    <h3 class="text-center">Abilities</h3>
                    <div>${this.abilities}</div>
                </div>
            </div>
            <div class="row border shadow p-4 bg-light">
                <h3 class='text-center'>Moves</h3>
                <div>${this.moves}</div>
            </div>
            <div>
        </div>

        `
    }

}