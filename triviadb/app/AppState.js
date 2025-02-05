import { Question } from './models/Question.js'
import { EventEmitter } from './utils/EventEmitter.js'
import { createObservableProxy } from './utils/ObservableProxy.js'

class ObservableAppState extends EventEmitter {

  /** @type {Question[]} */
  questions = []
  answers = []

  /** @type {Question[]} */
  category = []
}

export const AppState = createObservableProxy(new ObservableAppState())