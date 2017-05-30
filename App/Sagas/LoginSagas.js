import { put, call } from 'redux-saga/effects'

import ArticlesActions from '../Redux/ArticlesRedux'
import LoginActions from '../Redux/LoginRedux'
import Toast from 'react-native-root-toast';

// attempts to login
export function * login ({ username, password }) {
  if (password === '') {
    // dispatch failure
    yield put(LoginActions.loginFailure('WRONG'))
  } else {
    // dispatch successful logins
    yield put(LoginActions.loginSuccess(username))
  }
}

export function * createTelegraphAccount (api, action) {
  const createAccountResponse = yield call(api.createAccount)
  if (createAccountResponse.status === 200) {
    if (createAccountResponse.data.ok){
      console.tron.log('success')
      console.tron.log(createAccountResponse)
      yield put(LoginActions.createTelegraphAccountSuccess(
        createAccountResponse.data.result.access_token,
        action.article,
        action.content))
    } else {
      yield call(Toast.show, createAccountResponse.data.error, { duration: 6000 })
    }
  } else {
    yield call(Toast.show, createAccountResponse.data.error, { duration: 6000 })
  }
}

export function * createTelegraphAccountSuccess (api, action) {
  // yield put(ArticlesActions.publishArticle(action.article, action.token))
}
