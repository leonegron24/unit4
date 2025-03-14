import { AuthController } from './controllers/AuthController.js';
import { MiscController } from './controllers/miscController.js';
import { ToDoController } from './controllers/ToDoController.js';
import { router } from './router-config.js';
const USE_ROUTER = false

class App {

  AuthController = new AuthController()
  MiscController = new MiscController()
  ToDoController = new ToDoController()
  
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
