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
  var allThemes = state.allThemes
  allThemes.map((theme, index)=>{
    if (theme.name === name){
      var selectedTheme = Immutable.set(theme, 'enabled', !enabled)
      allThemes = Immutable.setIn(allThemes, [index], selectedTheme);
    }
  })
  return state.merge({ allThemes })
}


/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {
  [Types.STORE_THEMES]: storeThemes,
  [Types.ADD_TO_SUBSCRIBE]: addToSubscribe,
  [Types.TOGGLE_THEME_NOTIFICATION]: toggleThemeNotification,
})
