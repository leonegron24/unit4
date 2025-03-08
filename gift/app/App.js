import { AuthController } from './controllers/AuthController.js';
import { GiftController } from './controllers/GiftController.js';
import { Gift } from './models/Gift.js';
import { router } from './router-config.js';
const USE_ROUTER = false

class App {

  AuthController = new AuthController()
  GiftController = new GiftController()
  
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
