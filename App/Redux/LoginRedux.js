// @flow

import { createReducer, createActions } from 'reduxsauce'
import Immutable from 'seamless-immutable'

/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
  storeUser: ['user'],
  logout: null,
  updateToken: ['telegraphToken'],
  createTelegraphAccount: ['publishArticleResponse', 'article', 'content'],
  createTelegraphAccountSuccess: ['telegraphToken', 'article', 'content'],
})

export const LoginTypes = Types
export default Creators

/* ------------- Initial State ------------- */

export const INITIAL_STATE = Immutable({
  user: null,
  telegraphToken: ''
})

/* ------------- Reducers ------------- */

// we're attempting to login
export const storeUser = (state, { user }) => state.merge({ user })

// we've logged out
export const logout = (state) => INITIAL_STATE

export const updateToken = (state, {telegraphToken}) => state.merge({ telegraphToken })

export const createTelegraphAccount = (state) => state

export const createTelegraphAccountSuccess = (state, {telegraphToken, article, content}) => state.merge({ telegraphToken })

/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {
  [Types.STORE_USER]: storeUser,
  [Types.LOGOUT]: logout,
  [Types.UPDATE_TOKEN]: updateToken,
  [Types.CREATE_TELEGRAPH_ACCOUNT]: createTelegraphAccount,
  [Types.CREATE_TELEGRAPH_ACCOUNT_SUCCESS]: createTelegraphAccountSuccess,
})

/* ------------- Selectors ------------- */

// Is the current user logged in?
export const isLoggedIn = (state) => state.telegraphToken !== ''
