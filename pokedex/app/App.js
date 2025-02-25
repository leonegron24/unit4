import { AuthController } from './controllers/AuthController.js';
import { SandboxPokemonController } from './controllers/SandboxPokemonController.js';
import { WildPokemonController } from './controllers/WildPokemonController.js';
import { router } from './router-config.js';
const USE_ROUTER = false

class App {

  AuthController = new AuthController()
  WildPokemonController = new WildPokemonController()
  SandboxPokemonController = new SandboxPokemonController()
  
  constructor() {
    if(USE_ROUTER){
      this.router = router
      this.router.init(this)
    }
  }
}


const app = new App()
// @ts-ignore
window.app = app
