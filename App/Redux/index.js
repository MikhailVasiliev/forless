// @flow

import { combineReducers } from 'redux'
import configureStore from './CreateStore'
import rootSaga from '../Sagas/'

export default () => {
  /* ------------- Assemble The Reducers ------------- */
  const rootReducer = combineReducers({
    login: require('./LoginRedux').reducer,
    articles: require('./ArticlesRedux').reducer,
    notification: require('./NotificationRedux').reducer,
  })

  return configureStore(rootReducer, rootSaga)
}
