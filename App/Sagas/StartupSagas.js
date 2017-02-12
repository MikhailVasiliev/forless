import { put, select } from 'redux-saga/effects'
import { is } from 'ramda'

// process STARTUP actions
export function * startup (action) {
  console.tron.log('Hello, I\'m an example of how to log via Reactotron.')
}
