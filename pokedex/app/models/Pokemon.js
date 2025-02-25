export class Pokemon {
    constructor(data) {
        this.name = data.name
        
    }

    get ListTemplate(){
        return /*html*/ `
        <div class="btn text-start" role="button" onclick="app.WildPokemonController.getActivePokemon('${this.name}')">${this.name}</div>
        `
    }
}

export class SandboxPokemon extends Pokemon {
    constructor(data){
        super(data)
        this.moves = data.moves.map(m=> m.move.name).join(", ")

    }
}