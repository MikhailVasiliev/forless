// @flow

import { createReducer, createActions } from 'reduxsauce'
import Immutable from 'seamless-immutable'

/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
  storeThemes: ['themes'],
  addToSubscribe: ['theme'],
  toggleThemeNotification: ['name', 'enabled'],
})

export const NotificationTypes = Types
export default Creators

/* ------------- Initial State ------------- */

export const INITIAL_STATE = Immutable({
  allThemes: [],
  subscribedThemes: [],
})

/* ------------- Reducers ------------- */

export const storeThemes = (state, {themes}) => state.merge({ allThemes: themes })

export const addToSubscribe = (state, { theme }) => {
  let subscribedThemes = state.subscribedThemes
  subscribedThemes = subscribedThemes.concat(theme)
  return state.merge({ subscribedThemes })
}

export const toggleThemeNotification = (state, { name, enabled }) => {
  let allThemes = state.allThemes.asMutable()
  allThemes.map((theme, index)=>{
    console.tron.log('22222222')
    //TODO - find error below and fix it
    console.tron.log(theme.name === name)
    if (theme.name === name){
      console.tron.log(allThemes[index].enabled)
      allThemes[index].enabled = enabled
      console.tron.log(allThemes[index].enabled)
    }
  })
  return state.merge({ allThemes: Immutable(allThemes) })
}


/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {
  [Types.STORE_THEMES]: storeThemes,
  [Types.ADD_TO_SUBSCRIBE]: addToSubscribe,
  [Types.TOGGLE_THEME_NOTIFICATION]: toggleThemeNotification,
})
