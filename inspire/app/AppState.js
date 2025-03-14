import { ToDo } from './models/ToDo.js'
import { EventEmitter } from './utils/EventEmitter.js'
import { createObservableProxy } from './utils/ObservableProxy.js'

class ObservableAppState extends EventEmitter {

  user = null
  /**@type {import('./models/Account.js').Account | null} */
  account = null

  images = []

  Celcius = 0
  Faren = 0
  weatherDescription = ''
  icon = null
  authors = ''
  quotes = ''

  /**@type {ToDo[]} */
  toDoList = []
}

export const AppState = createObservableProxy(new ObservableAppState())