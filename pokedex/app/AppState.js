import { Pokemon, SandboxPokemon } from './models/Pokemon.js'
import { EventEmitter } from './utils/EventEmitter.js'
import { createObservableProxy } from './utils/ObservableProxy.js'

class ObservableAppState extends EventEmitter {

  /**@type {Pokemon[]} */
  wildPokemon = []

/**@type {SandboxPokemon[]} */
  caughtPokemon = []

/**@type {SandboxPokemon} */
  activePokemon = null
  
  user = null
  /**@type {import('./models/Account.js').Account | null} */
  account = null


}

export const AppState = createObservableProxy(new ObservableAppState())